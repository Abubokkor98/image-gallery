"use client";

import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { ImageType } from '@/types';

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <Card 
      className="h-full flex flex-col cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={image.thumbnail}
        alt={image.title}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {image.title}
        </Typography>
        <Box className="flex flex-wrap gap-1 mt-2">
          {image.tags?.slice(0, 3).map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              className="bg-blue-100"
            />
          ))}
          {image.tags && image.tags.length > 3 && (
            <Chip 
              label={`+${image.tags.length - 3}`} 
              size="small" 
              className="bg-gray-100"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageCard;