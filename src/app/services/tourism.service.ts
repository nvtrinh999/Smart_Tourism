import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of } from 'rxjs';
import QRCode from 'qrcode';
import { TourismData, HeritageAudio } from '../models/tourism.model';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  private http = inject(HttpClient);

  // Signals for reactive state
  tourismData = signal<TourismData | null>(null);
  activeTab = signal<'tab1' | 'tab2' | 'tab3'>('tab1');
  
  // Audio playback signal state
  currentPlayingId = signal<string | null>(null);
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  playbackRate = signal<number>(1);

  // Global HTML5 Audio instance for coordinated playback
  private audioElement: HTMLAudioElement = new Audio();

  constructor() {
    this.setupAudioListeners();
  }

  private setupAudioListeners(): void {
    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime.set(this.audioElement.currentTime);
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audioElement.duration);
    });

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying.set(false);
      this.currentTime.set(0);
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying.set(false);
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying.set(true);
    });
  }

  /**
   * Load mock data and generate scannable QR codes for each heritage item
   */
  loadData(): Observable<TourismData> {
    const existing = this.tourismData();
    if (existing) {
      return of(existing);
    }

    return this.http.get<TourismData>('assets/mock-data.json').pipe(
      tap(async (data) => {
        // Generate scannable QR code data URLs for each heritage item
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hanoismarttourism.vn';
        for (const audio of data.tab3_heritage.audios) {
          const targetUrl = `${origin}/heritage/${audio.slug}`;
          try {
            const qrDataUrl = await QRCode.toDataURL(targetUrl, {
              width: 320,
              margin: 2,
              color: {
                dark: '#0B131F',
                light: '#FFFFFF'
              },
              errorCorrectionLevel: 'H'
            });
            audio.qrCodeDataUrl = qrDataUrl;
          } catch (err) {
            console.error('Failed to generate QR for ' + audio.slug, err);
          }
        }
        this.tourismData.set(data);
      })
    );
  }

  getHeritageBySlug(slug: string): HeritageAudio | undefined {
    const data = this.tourismData();
    if (!data) return undefined;
    return data.tab3_heritage.audios.find(a => a.slug === slug || a.id === slug);
  }

  playAudio(audio: HeritageAudio): void {
    if (this.currentPlayingId() === audio.id) {
      if (this.isPlaying()) {
        this.audioElement.pause();
      } else {
        this.audioElement.play().catch(e => console.warn('Audio play prevented', e));
      }
      return;
    }

    // New audio track
    this.currentPlayingId.set(audio.id);
    this.audioElement.src = audio.audioUrl;
    this.audioElement.playbackRate = this.playbackRate();
    this.audioElement.play().catch(e => console.warn('Audio play prevented', e));
  }

  pauseAudio(): void {
    this.audioElement.pause();
  }

  seekAudio(seconds: number): void {
    this.audioElement.currentTime = seconds;
    this.currentTime.set(seconds);
  }

  setPlaybackRate(rate: number): void {
    this.playbackRate.set(rate);
    this.audioElement.playbackRate = rate;
  }

  setActiveTab(tab: 'tab1' | 'tab2' | 'tab3'): void {
    this.activeTab.set(tab);
  }
}
