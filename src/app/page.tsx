"use client";

import { useState } from "react";
import UploadButton from "@/components/imageGallery/UploadButton";
import SearchBar from "@/components/imageGallery/SearchBar";
import ImageGallery from "@/components/imageGallery/ImageGallery";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleImageUploaded = () => {
    // Force refresh of the image grid by changing the key
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <div className=" flex flex-col md:flex-row justify-center items-start md:items-center gap-4 mb-6">
        <UploadButton onImageUploaded={handleImageUploaded} />
        <div className="max-w-64">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <ImageGallery key={refreshKey} searchQuery={searchQuery} />
    </div>
  );
}
