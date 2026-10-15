import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { ThemeService } from '../../services/theme.service';
import { HeritageAudio, TourismData } from '../../models/tourism.model';

@Component({
  selector: 'app-heritage-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heritage-detail.component.html',
  styleUrls: ['./heritage-detail.component.css']
})
export class HeritageDetailComponent implements OnInit {
  tourismService = inject(TourismService);
  themeService = inject(ThemeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @Input() slug?: string;

  heritage = signal<HeritageAudio | null>(null);
  allAudios = signal<HeritageAudio[]>([]);
  copiedShareLink = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const routeSlug = params.get('slug') || this.slug || 'bat-trang';
      this.loadHeritage(routeSlug);
    });
  }

  private loadHeritage(slug: string): void {
    this.tourismService.loadData().subscribe(data => {
      if (data) {
        this.allAudios.set(data.tab3_heritage.audios);
        const item = data.tab3_heritage.audios.find(a => a.slug === slug || a.id === slug);
        if (item) {
          this.heritage.set(item);
        } else if (data.tab3_heritage.audios.length > 0) {
          this.heritage.set(data.tab3_heritage.audios[0]);
        }
      }
    });
  }

  get isCurrentPlaying(): boolean {
    const item = this.heritage();
    return !!item && this.tourismService.currentPlayingId() === item.id && this.tourismService.isPlaying();
  }

  toggleAudio(): void {
    const item = this.heritage();
    if (item) {
      this.tourismService.playAudio(item);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  goBackHome(tab: 'tab1' | 'tab2' | 'tab3' = 'tab3'): void {
    this.tourismService.setActiveTab(tab);
    this.router.navigate(['/']);
  }

  switchHeritage(nextSlug: string): void {
    this.router.navigate(['/heritage', nextSlug]);
  }

  copyLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.copiedShareLink.set(true);
      setTimeout(() => this.copiedShareLink.set(false), 2500);
    }
  }
}
