import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageType } from "@/types";
import DeleteConfirmation from "./DeleteConfirmation";

interface ImageModalProps {
  image: ImageType | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ImageModal = ({ image, open, onClose, onDelete }: ImageModalProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!image) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent className="relative p-0">
          <IconButton
            className="absolute top-2 right-2 bg-white bg-opacity-75 z-10"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          <Box className="flex flex-col md:flex-row">
            <Box className="md:w-2/3 p-4">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-contain max-h-96"
              />
            </Box>

            <Box className="md:w-1/3 p-4 bg-gray-50">
              <Typography variant="h5" component="h2" className="mb-2">
                {image.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-4"
              >
                Uploaded on {new Date(image.createdAt).toLocaleDateString()}
              </Typography>

              <Button
                startIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                fullWidth
                className="mt-4"
              >
                Delete Image
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(image._id);
          setDeleteDialogOpen(false);
          onClose();
        }}
      />
    </>
  );
};

export default ImageModal;
