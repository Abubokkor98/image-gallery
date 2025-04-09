export interface ImageType {
  _id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse {
  images: ImageType[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
