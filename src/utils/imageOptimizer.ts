export const getOptimizedImageUrl = (url: string, width: number = 600) => {
  if (!url) return "";
  
  // If it's a local path or already optimized, return as is
  if (url.startsWith('/') || url.includes('wsrv.nl')) return url;

  // Utilize wsrv.nl (an open source image proxy) to:
  // 1. Convert to WebP (output=webp)
  // 2. Resize to specific width (w=...)
  // 3. Compress quality to 80% (q=80)
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;
};
