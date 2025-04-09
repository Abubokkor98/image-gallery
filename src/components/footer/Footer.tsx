"use client";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Image Gallery App © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
