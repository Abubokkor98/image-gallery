export interface ImgBBResponse {
    title: string;
    url: string;
    thumbnail: string;
  }
  
  export const uploadToImgBB = async (file: File): Promise<ImgBBResponse> => {
    const formData = new FormData();
    formData.append("image", file);
  
    const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
    if (!API_KEY) {
      throw new Error("ImgBB API key is not configured.");
    }
  
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
  
    if (!response.ok || !data.success) {
      throw new Error(data?.error?.message || "Failed to upload to ImgBB.");
    }
  
    return {
      title: "",
      url: data.data.display_url,
      thumbnail: data.data.thumb.url,
    };
  };