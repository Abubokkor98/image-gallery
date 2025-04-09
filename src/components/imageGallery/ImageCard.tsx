import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { ImageType } from "@/types";

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <Card
      className="h-full flex flex-col cursor-pointer"
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
      </CardContent>
    </Card>
  );
};

export default ImageCard;
