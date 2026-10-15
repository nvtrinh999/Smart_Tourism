import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeSafeUrl',
  standalone: true
})
export class YoutubeSafeUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(videoId: string): SafeResourceUrl {
    if (!videoId) return '';
    const cleanId = videoId.trim();
    // YouTube background embed URL: completely hide controls, logo, annotations, autoplay & loop seamlessly
    const url = `https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
