export interface ImageItem {
    _id?: string;
    title: string;
    url: string;
    createdAt: string;
    deleteUrl?: string;
  }
  
  export interface ImageGalleryProps {
    initialImages?: ImageItem[];
  }