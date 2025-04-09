"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadButtonProps {
  onImageUploaded: () => void;
}

const UploadButton = ({ onImageUploaded }: UploadButtonProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create form data for ImgBB
      const formData = new FormData();
      formData.append("image", file);

      // Upload img to ImgBB
      const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to ImgBB");
      }

      const imgbbData = await response.json();

      if (!imgbbData.success) {
        throw new Error(imgbbData.error?.message || "Image upload failed");
      }

      // Save image data to MongoDB
      const imageData = {
        title: title.trim(),
        url: imgbbData.data.display_url,
        thumbnail: imgbbData.data.thumb.url,
      };

      const dbResponse = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
      });

      if (!dbResponse.ok) {
        throw new Error("Failed to save image data");
      }

      onImageUploaded();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
        className="mb-6"
      >
        Upload Images
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload a New Image</DialogTitle>
        <DialogContent>
          <Box className="mt-4">
            <TextField
              label="Image Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />

            <Box className="mt-6">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" component="span" fullWidth>
                  {file ? file.name : "Select Image"}
                </Button>
              </label>
            </Box>

            {error && (
              <Typography color="error" className="mt-2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : null}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadButton;
