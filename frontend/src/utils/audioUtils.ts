/**
 * Utility functions for audio file operations
 */

/**
 * Get the duration of an audio file without playing it
 * @param audioUrl - The URL of the audio file
 * @returns Promise that resolves to the duration in seconds
 */
export const getAudioDuration = (audioUrl: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    const handleLoadedMetadata = () => {
      const duration = audio.duration;
      cleanup();
      resolve(duration);
    };
    
    const handleError = (error: Event) => {
      cleanup();
      reject(new Error(`Failed to load audio metadata: ${error}`));
    };
    
    const cleanup = () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    
    // Set preload to metadata only to avoid downloading the entire file
    audio.preload = 'metadata';
    audio.src = audioUrl;
  });
};

/**
 * Format time in seconds to MM:SS format
 * @param timeInSeconds - Time in seconds
 * @returns Formatted time string
 */
export const formatDuration = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Get durations for multiple audio files
 * @param audioUrls - Array of audio file URLs
 * @returns Promise that resolves to an array of durations in seconds
 */
export const getMultipleAudioDurations = async (audioUrls: string[]): Promise<number[]> => {
  const promises = audioUrls.map(url => getAudioDuration(url));
  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error loading audio durations:', error);
    throw error;
  }
};
