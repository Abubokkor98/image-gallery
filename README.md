# Image Gallery App

A responsive image gallery application built with Next.js, TypeScript, and Material UI. Users can upload, view, search, and delete images with a modern UI and infinite scrolling functionality.

## Features

- **Image Upload**: Upload single or multiple images via a user-friendly interface
- **Image Grid Display**: View all uploaded images in a responsive grid layout
- **Image Preview**: Click on any image to view a larger preview in a modal
- **Delete Functionality**: Remove images with a confirmation dialog
- **Infinite Scroll**: Load more images as you scroll down the page
- **Search Functionality**: Filter images by title
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Clean interface built with Material UI components

## Tech Stack

- **Frontend**: Next.js, TypeScript, Material UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB for image metadata storage
- **Image Storage**: ImgBB API for cloud image hosting
- **Styling**: Tailwind CSS with custom configurations

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abubokkor98/image-gallery.git
   cd image-gallery
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   The repository includes the `.env` file with necessary configuration.

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

- `GET /api/images`: Retrieve all images with pagination
- `POST /api/images`: Upload new image(s)
- `DELETE /api/images/[id]`: Delete a specific image

## Environment Variables

The application uses the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_db_name
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

```

## Future Improvements

- Add user authentication
- Implement image categorization/tagging
- Add image editing capabilities
- Implement drag-and-drop for image uploads
- Add social sharing functionality

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [ImgBB API](https://api.imgbb.com/)
- [MongoDB](https://www.mongodb.com/)
