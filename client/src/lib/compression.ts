import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Image compression failed:', error);
    return file;
  }
}

export async function compressVideo(file: File): Promise<File> {
  // For now, we'll just return the original file
  // In a production app, you might want to use FFmpeg.wasm for video compression
  // but it's quite heavy (>20MB) for this simple use case
  return file;
}

export async function compressFile(file: File): Promise<File> {
  if (file.type.startsWith('image/')) {
    return compressImage(file);
  } else if (file.type.startsWith('video/')) {
    return compressVideo(file);
  }
  return file;
}
