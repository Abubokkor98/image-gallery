import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  useTheme
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
  const theme = useTheme();

  // return null if no image is selected
  if (!image) return null;

  return (
    <>
      {/* Dialog acts as a modal container */}
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: theme.palette.secondary.main,
          }
        }}
      >
        {/* DialogContent holds the content inside the modal */}
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {/* Close icon */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              zIndex: 10,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          {/* Layout split between image and details */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
          }}>
            {/* Left: image preview */}
            <Box sx={{ 
              width: { xs: '100%', md: '66.666667%' }, 
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.1)'
            }}>
              <img
                src={image.url}
                alt={image.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxHeight: '24rem',
                  borderRadius: '8px'
                }}
              />
            </Box>

            {/* Right: image metadata and actions */}
            <Box sx={{ 
              width: { xs: '100%', md: '33.333333%' }, 
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  mb: 1, 
                  color: theme.palette.secondary.contrastText,
                  fontWeight: 600
                }}
              >
                {image.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ 
                  mb: 2, 
                  color: theme.palette.secondary.contrastText,
                  opacity: 0.8
                }}
              >
                Uploaded on {new Date(image.createdAt).toLocaleDateString()}
              </Typography>

              {/* Delete button */}
              <Box sx={{ mt: 'auto' }}>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Delete Image
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
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
