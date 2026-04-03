import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface TagResponse {
  filename: string;
  counts: Record<string, number>;
}

export const uploadImage = async (file: File): Promise<TagResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post<TagResponse>(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const uploadVideo = async (file: File): Promise<TagResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'video'); // Indicate this is a video file

  try {
    const response = await axios.post<TagResponse>(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const getImageUrl = (filename: string): string => {
  return `${API_URL}/result/${filename}`;
};

export const downloadFile = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

export const downloadTags = (tags: string[], filename: string): void => {
  // Create a text file with the tags
  const tagsText = tags.join('\n');
  const blob = new Blob([tagsText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename.split('.')[0]}_tags.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
};