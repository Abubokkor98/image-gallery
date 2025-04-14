import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  useTheme,
} from "@mui/material";
import { ImageType } from "@/types";

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const theme = useTheme();

  return (
    // Card is the main container for the image tile
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 16px rgba(0,0,0,0.08)", // soft shadow for depth
      }}
    >
      {/* CardActionArea makes the entire card clickable */}
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Image container */}
        <Box sx={{ position: "relative", width: "100%" }}>
          {/* CardMedia is used to render images or media content */}
          <CardMedia
            component="img"
            image={image.thumbnail}
            alt={image.title}
            sx={{
              height: 220,
              objectFit: "cover",
            }}
          />

          {/* Gradient overlay*/}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "40%",
              background: `linear-gradient(to top, ${theme.palette.secondary.main}40, transparent)`,
              display: "flex",
              alignItems: "flex-end",
            }}
          />
        </Box>

        {/* CardContent holds the title and other text info */}
        <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            px: 2,
            py: 2,
            backgroundColor: theme.palette.secondary.light,
            "&:last-child": { pb: 2 }, // removes extra padding MUI applies by default
          }}
        >
          {/* Typography for text rendering */}
          <Typography
            variant="h6"
            component="div"
            noWrap // ensures the title doesn't wrap onto multiple lines
            sx={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: theme.palette.getContrastText(
                theme.palette.secondary.light
              ),
            }}
          >
            {image.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
