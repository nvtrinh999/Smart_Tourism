import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Helper to extract 11-character YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Direct 11-character video ID
 */
export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const clean = urlOrId.trim();

  // Direct 11-character alphanumeric with _ or -
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // https://youtu.be/VIDEO_ID
  const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = clean.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // General fallback
  const genMatch = clean.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
  if (genMatch) return genMatch[1];

  return null;
}

@Pipe({
  name: 'youtubeSafeUrl',
  standalone: true
})
export class YoutubeSafeUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(videoInput: string): SafeResourceUrl {
    if (!videoInput) return '';
    const clean = videoInput.trim();

    // 1. TikTok: recognize tiktok.com URLs or numeric video IDs
    if (clean.includes('tiktok.com') || /^\d{15,}$/.test(clean)) {
      const match = clean.match(/video\/(\d+)/) || clean.match(/player\/v1\/(\d+)/) || clean.match(/^(\d{15,})$/);
      const videoId = match ? match[1] : clean.split('/').pop()?.split('?')[0] || '';
      if (!videoId) return '';
      const tiktokEmbedUrl = `https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(tiktokEmbedUrl);
    }

    // 2. Facebook Video Embed
    if (clean.includes('facebook.com') || clean.includes('fb.watch')) {
      const fbEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(clean)}&show_text=false&autoplay=true`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(fbEmbedUrl);
    }

    // 3. YouTube Embed
    const ytId = extractYouTubeId(clean);
    if (!ytId) {
      return '';
    }

    // Standardized YouTube Embed URL: hide all UI elements, autoplay muted, loop
    const ytUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${ytId}&playsinline=1&enablejsapi=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(ytUrl);
  }
}
