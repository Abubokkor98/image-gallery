"use client";

import { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ImageType, PaginatedResponse } from '@/types';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

interface ImageGridProps {
  searchQuery: string;
}

const ImageGrid = ({ searchQuery }: ImageGridProps) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchImages = async (pageNumber: number, query: string = '') => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `/api/images?page=${pageNumber}&limit=12${query ? `&search=${encodeURIComponent(query)}` : ''}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data: PaginatedResponse = await response.json();
      
      if (pageNumber === 1) {
        setImages(data.images);
      } else {
        setImages(prev => [...prev, ...data.images]);
      }
      
      setHasMore(data.hasMore);
      setError('');
    } catch (err) {
      setError('Failed to load images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial images
  useEffect(() => {
    setPage(1);
    fetchImages(1, searchQuery);
  }, [searchQuery]);

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, searchQuery);
  };

  const handleOpenModal = (image: ImageType) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Remove the deleted image from the state
      setImages(images.filter(image => image._id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  if (loading && images.length === 0) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (error && images.length === 0) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Typography variant="h6" color="text.secondary">
          No images found. Upload some images to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={
          <Box className="flex justify-center my-4">
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Typography 
            align="center" 
            color="text.secondary" 
            className="my-4"
          >
            You've seen all images!
          </Typography>
        }
      >
        <Grid container spacing={3}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image._id}>
              <ImageCard 
                image={image} 
                onClick={() => handleOpenModal(image)} 
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <ImageModal
        image={selectedImage}
        open={modalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteImage}
      />
    </>
  );
};

export default ImageGrid;

