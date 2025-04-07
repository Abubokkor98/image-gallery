'use client';

import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export default function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <PhotoLibraryIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            IMAGE GALLERY
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}