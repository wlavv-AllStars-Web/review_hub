import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if storage bucket exists and try to create it via server
export async function initializeStorage() {
  try {
    // Check if Supabase client is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase configuration missing - URL or anon key not set');
      return false;
    }

    console.log('Checking Supabase storage buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.warn('Could not list buckets:', error.message, error);
      return false;
    }
    
    console.log('Available buckets:', buckets?.map(b => b.name) || []);
    const bucketExists = buckets?.some(bucket => bucket.name === 'review-files');
    
    if (!bucketExists) {
      console.log('Storage bucket "review-files" does not exist. Attempting to create via server...');
      
      // Try to create the bucket via server endpoint
      try {
        const response = await fetch('/api/storage/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log('✅ Storage bucket "review-files" created successfully via server');
          return true;
        } else {
          console.warn('Server could not create storage bucket:', result.error);
          if (result.suggestion) {
            console.warn('Suggestion:', result.suggestion);
          }
          return false;
        }
      } catch (fetchError) {
        console.warn('Could not reach server to create bucket:', fetchError);
        return false;
      }
    } else {
      console.log('✅ Storage bucket "review-files" is available');
    }
    
    return true;
  } catch (error) {
    console.warn('Storage initialization failed:', error);
    return false;
  }
}

export async function uploadFile(file: File, path: string): Promise<string> {
  // First check if the bucket exists
  const storageReady = await initializeStorage();
  if (!storageReady) {
    throw new Error('File storage is not properly configured. The storage bucket needs to be created. Please contact your administrator to set up the "review-files" bucket in Supabase Storage.');
  }

  const { data, error } = await supabase.storage
    .from('review-files')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    if (error.message.includes('not found') || error.message.includes('Bucket not found')) {
      throw new Error('File storage is not properly configured. Please contact support.');
    }
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: publicUrl } = supabase.storage
    .from('review-files')
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}
