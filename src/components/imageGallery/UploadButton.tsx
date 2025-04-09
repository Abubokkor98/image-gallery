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
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadToImgBB } from "@/lib/imgbb";

interface UploadButtonProps {
  onImageUploaded: () => void;
}

const UploadButton = ({ onImageUploaded }: UploadButtonProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();

  //upload dialog
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // reset form fields
  const resetForm = () => {
    setTitle("");
    setFile(null);
    setError("");
  };

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Upload image to ImgBB and save to DB
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

      // Upload image to ImgBB
      const image = await uploadToImgBB(file);

      // Add title after ImgBB upload
      const imageData = {
        title: title.trim(),
        url: image.url,
        thumbnail: image.thumbnail,
      };

      // Save image data to the database
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
      {/* Upload Button that opens the dialog */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
        className="mb-6"
        sx={{
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        Upload Images
      </Button>

      {/* Upload Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        {/* Dialog Header */}
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
        >
          Upload a New Image
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent>
          <Box className="mt-4">
            {/* Title input */}
            <TextField
              label="Image Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              margin="normal"
              required
              color="secondary"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: theme.palette.secondary.main,
                  },
              }}
            />

            {/* File input */}
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
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  color="secondary"
                >
                  {file ? file.name : "Select Image"}
                </Button>
              </label>
            </Box>

            {/* Error message */}
            {error && (
              <Typography color="error" className="mt-2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={24} color="inherit" /> : null
            }
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadButton;
