'use client';

import { useState } from 'react';
import UploadButton from '@/components/imageGallery/UploadButton';
import SearchBar from '@/components/imageGallery/SearchBar';
import ImageGrid from '@/components/imageGallery/ImageGrid';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleImageUploaded = () => {
    // Force refresh of the image grid by changing the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-4">
      <div className="items-start md:items-center mb-6">
        <UploadButton onImageUploaded={handleImageUploaded} />
      </div>

      <SearchBar onSearch={handleSearch} />

      <ImageGrid key={refreshKey} searchQuery={searchQuery} />
    </div>
  );
}
