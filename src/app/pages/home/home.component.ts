import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TourismService } from '../../services/tourism.service';
import { ThemeService } from '../../services/theme.service';
import { YoutubeSafeUrlPipe, extractYouTubeId } from '../../pipes/youtube-safe-url.pipe';
import {
  TourismData,
  AlternativeDestination,
  HeritageAudio,
  SuburbDestination,
  SurroundingDestination,
  HourlyData,
  Tab1LocationData,
  FlycamLocation
} from '../../models/tourism.model';

export interface LocationOption {
  id: string;
  name: string;
  shortName: string;
  district: string;
  icon: string;
  videoUrl?: string;
  coordinates?: [number, number];
}

export interface VideoOption {
  id: string;
  title: string;
  label: string;
  tag: string;
}

export interface RealtimeCrowdStatus {
  day: string;
  timeString: string;
  density: number;
  level: string;
  statusType: 'danger' | 'warning' | 'success';
  statusBadge: string;
  headline: string;
  recommendation: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, YoutubeSafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  tourismService = inject(TourismService);
  themeService = inject(ThemeService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  // YouTube IFrame Player API state
  private ytPlayer: any = null;
  private isYouTubeApiLoaded = false;
  private isAutoAdvancing = false;

  // Hero Video state - Ba Vì as initial default
  activeVideoId = signal<string>('https://www.youtube.com/watch?v=b5apHzIybjE');
  videoOptions: VideoOption[] = [
    {
      id: 'https://www.youtube.com/watch?v=b5apHzIybjE',
      title: 'Flycam 4K Vườn Quốc Gia Ba Vì - Núi Tản Săn Mây',
      label: 'Flycam Ba Vì',
      tag: 'Vùng ven 4K'
    },
    {
      id: 'https://www.youtube.com/watch?v=TdHbEbpIA5o',
      title: 'Flycam 4K Hồ Đại Lải & Quần Thể Nghỉ Dưỡng Flamingo',
      label: 'Flycam Đại Lải',
      tag: 'Hồ nước 4K'
    },
    {
      id: 'https://www.youtube.com/watch?v=KPwNA0PidEY',
      title: 'Flycam 4K Toàn Cảnh Hồ Tây & Bán Đảo Quảng An',
      label: 'Flycam Hồ Tây',
      tag: 'Hồ Tây 4K'
    },
    {
      id: 'https://www.youtube.com/watch?v=T0xxOYuWKsQ',
      title: 'Flycam 4K Toàn Cảnh Hà Nội & Hồ Gươm',
      label: 'Flycam Hồ Gươm',
      tag: 'Nội đô 4K'
    },
    {
      id: 'https://www.youtube.com/watch?v=8_ADNBqH7KE',
      title: 'Nhịp Sống & Cảnh Sắc Hoàng Thành Thăng Long 4K',
      label: 'Hoàng Thành Thăng Long',
      tag: 'Di sản 4K'
    },
    {
      id: 'https://www.youtube.com/watch?v=uPHK-wj6wIo',
      title: 'Lễ Thượng Cờ & Không Khí Trang Nghiêm Tại Lăng Bác (TikTok 4K)',
      label: 'Lăng Bác TikTok',
      tag: 'TikTok Video'
    }
  ];

  // Tab 1 state: 6 Flycam Locations - Unified Order: 1. Ba Vì, 2. Đại Lải, 3. Hồ Tây, then Hồ Gươm, Hoàng Thành, Lăng Bác
  locationOptions: LocationOption[] = [
    {
      id: 'ba-vi',
      name: 'Vườn Quốc gia Ba Vì',
      shortName: 'Ba Vì',
      district: 'Huyện Ba Vì',
      icon: 'fa-mountain-sun',
      videoUrl: 'https://www.youtube.com/watch?v=b5apHzIybjE',
      coordinates: [21.0833, 105.3667]
    },
    {
      id: 'dai-lai',
      name: 'Hồ Đại Lải & Flamingo',
      shortName: 'Đại Lải',
      district: 'Phúc Yên - Vĩnh Phúc',
      icon: 'fa-water',
      videoUrl: 'https://www.youtube.com/watch?v=TdHbEbpIA5o',
      coordinates: [21.3250, 105.7167]
    },
    {
      id: 'ho-tay',
      name: 'Hồ Tây & Trúc Bạch',
      shortName: 'Hồ Tây',
      district: 'Tây Hồ - Ba Đình',
      icon: 'fa-water',
      videoUrl: 'https://www.youtube.com/watch?v=KPwNA0PidEY',
      coordinates: [21.0583, 105.8242]
    },
    {
      id: 'ho-guom',
      name: 'Hồ Gươm & Phố Cổ',
      shortName: 'Hồ Gươm',
      district: 'Quận Hoàn Kiếm',
      icon: 'fa-landmark',
      videoUrl: 'https://www.youtube.com/watch?v=T0xxOYuWKsQ',
      coordinates: [21.0285, 105.8542]
    },
    {
      id: 'ba-dinh',
      name: 'Hoàng Thành Thăng Long',
      shortName: 'Hoàng Thành',
      district: 'Quận Ba Đình',
      icon: 'fa-monument',
      videoUrl: 'https://www.youtube.com/watch?v=8_ADNBqH7KE',
      coordinates: [21.0336, 105.8407]
    },
    {
      id: 'lang-bac',
      name: 'Lăng Chủ tịch Hồ Chí Minh',
      shortName: 'Lăng Bác',
      district: 'Quận Ba Đình',
      icon: 'fa-star',
      videoUrl: 'https://www.youtube.com/watch?v=uPHK-wj6wIo',
      coordinates: [21.0369, 105.8347]
    }
  ];
  selectedLocation = signal<string>('ba-vi');
  selectedDay = signal<string>('Thứ Bảy');
  selectedHour = signal<string>('20:00');
  selectedDestinationModal = signal<AlternativeDestination | null>(null);

  // Tab 2 state
  selectedRegion = signal<'all' | 'west' | 'north' | 'east'>('all');
  selectedSurroundingModal = signal<SurroundingDestination | null>(null);
  activeMapLocation = signal<string>('Hanoi+Ba+Vi+Tam+Dao+Ecopark');
  activeMapTitle = signal<string>('Toàn cảnh Vành đai Thủ Đô (Hà Nội, Ba Vì, Tam Đảo, Ecopark)');
  isMapLoading = signal<boolean>(true);
  safeGoogleMapsEmbedUrl = signal<SafeResourceUrl>(
    this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://maps.google.com/maps?q=Hanoi+Ba+Vi+Tam+Dao+Ecopark&t=&z=10&ie=UTF8&iwloc=&output=embed'
    )
  );
  selectedSuburb = signal<SuburbDestination | null>(null);
  activeCheckInIndex = signal<number>(0);
  mapMode = signal<'interactive' | 'embed'>('embed');
  customEmbedUrl = signal<string>('https://www.google.com/maps/d/embed?mid=1_mock_hanoi_tourism_suburbs');

  // Scroll-driven tabs observer & touch swipe state
  private scrollObserver?: IntersectionObserver;
  private isUserClickScrolling = false;
  private scrollTimeout?: any;
  private touchStartX = 0;
  private touchStartY = 0;

  // Tab 3 state
  selectedHeritageForModal = signal<HeritageAudio | null>(null);
  activeTranscriptId = signal<string | null>(null);

  // Mobile Simulator state for Desktop users / judges
  showMobileSimulator = signal<boolean>(false);
  simulatedSlug = signal<string>('bat-trang');

  // Real-time Hanoi time clock & System Date
  hanoiTime = signal<string>('');
  currentTime = signal<Date>(new Date());
  simulationScenario = signal<'realtime' | 'weekend-peak' | 'weekday-low'>('realtime');

  ngOnInit(): void {
    this.tourismService.loadData().subscribe(data => {
      if (data?.flycam_locations && data.flycam_locations.length > 0) {
        this.locationOptions = data.flycam_locations;
      }
      if (data && data.tab2_suburbs.destinations.length > 0) {
        this.selectedSuburb.set(data.tab2_suburbs.destinations[0]);
      }
    });

    this.loadYouTubeIframeApi();

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Initialize chart with real-time day and closest schedule hour
    this.selectedDay.set(this.currentRealtimeDay);
    this.selectedHour.set(this.getClosestChartHour(this.currentTime().getHours()));
  }

  updateClock(): void {
    const now = new Date();
    this.currentTime.set(now);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    this.hanoiTime.set(new Intl.DateTimeFormat('vi-VN', options).format(now));
  }

  // Real-time Day & Time helpers
  get currentRealtimeDay(): string {
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return dayNames[this.currentTime().getDay()];
  }

  get currentRealtimeTimeString(): string {
    const d = this.currentTime();
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  getClosestChartHour(hour: number): string {
    const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    let closest = hours[0];
    let minDiff = Math.abs(hour - closest);
    for (const h of hours) {
      const diff = Math.abs(hour - h);
      if (diff < minDiff) {
        minDiff = diff;
        closest = h;
      }
    }
    return `${closest.toString().padStart(2, '0')}:00`;
  }

  getEffectiveDate(): Date {
    const scenario = this.simulationScenario();
    if (scenario === 'weekend-peak') {
      // Create date representing Saturday 20:00
      const d = new Date();
      const day = d.getDay();
      const diff = 6 - day;
      d.setDate(d.getDate() + diff);
      d.setHours(20, 0, 0, 0);
      return d;
    } else if (scenario === 'weekday-low') {
      // Create date representing Monday 10:00
      const d = new Date();
      const day = d.getDay();
      const diff = 1 - day;
      d.setDate(d.getDate() + diff);
      d.setHours(10, 0, 0, 0);
      return d;
    }
    return this.currentTime();
  }

  get realtimeCrowdStatus(): RealtimeCrowdStatus {
    return this.calculateDynamicCrowd(this.selectedLocation(), this.getEffectiveDate());
  }

  setSimulationScenario(scenario: 'realtime' | 'weekend-peak' | 'weekday-low'): void {
    this.simulationScenario.set(scenario);
    if (scenario === 'weekend-peak') {
      this.selectedDay.set('Thứ Bảy');
      this.selectedHour.set('20:00');
    } else if (scenario === 'weekday-low') {
      this.selectedDay.set('Thứ Hai');
      this.selectedHour.set('10:00');
    } else {
      this.selectedDay.set(this.currentRealtimeDay);
      this.selectedHour.set(this.getClosestChartHour(this.currentTime().getHours()));
    }
  }

  calculateDynamicCrowd(locId: string, date: Date): RealtimeCrowdStatus {
    const dayIndex = date.getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const day = dayNames[dayIndex];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const isWeekend = (dayIndex === 0 || dayIndex === 6);
    const isEveningPeak = (hour >= 18 && hour < 22);

    if (locId === 'ba-vi') {
      // Vườn Quốc gia Ba Vì
      if (isWeekend && hour >= 8 && hour < 16) {
        const density = 62;
        return {
          day,
          timeString,
          density,
          level: 'Lưu lượng ổn định (Mức xanh an toàn)',
          statusType: 'success',
          statusBadge: 'Vùng ven thoáng mát',
          headline: `Ba Vì: Mật độ ổn định (${density}%) — Rừng nguyên sinh bạt ngàn, thoáng đãng`,
          recommendation: 'Không gian núi rừng Ba Vì trong lành, nhiệt độ dịu mát hơn nội đô 3-5°C. Rất lý tưởng cắm trại, dã ngoại, tham quan Nhà thờ Pháp cổ và Vườn xương rồng.'
        };
      } else if (!isWeekend && hour >= 7 && hour < 17) {
        const density = 25;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Ba Vì: Rất thông thoáng (${density}%) — Thời điểm vàng săn mây`,
          recommendation: 'Đường đèo thông thoáng, không khí mát lành như Đà Lạt, thời điểm lý tưởng để săn mây đỉnh Vua và tham quan Đền Thượng.'
        };
      } else {
        const density = 12;
        return {
          day,
          timeString,
          density,
          level: 'Thanh bình núi rừng',
          statusType: 'success',
          statusBadge: 'Tuyệt đối thông thoáng',
          headline: `Ba Vì: Yên tĩnh (${density}%) — Cảnh sắc núi rừng tĩnh mịch`,
          recommendation: 'Khu vực rừng thông yên ả, nhiệt độ se lạnh về đêm, hoàn toàn không có khói bụi.'
        };
      }
    } else if (locId === 'dai-lai') {
      // Hồ Đại Lải & Flamingo
      if (isWeekend && hour >= 14 && hour < 19) {
        const density = 55;
        return {
          day,
          timeString,
          density,
          level: 'Lưu lượng ổn định (Mức xanh an toàn)',
          statusType: 'success',
          statusBadge: 'Thư thái ven hồ',
          headline: `Đại Lải: Mật độ ổn định (${density}%) — Mặt hồ lộng gió 525ha, nhiều hoạt động giải trí`,
          recommendation: 'Mặt hồ phẳng lặng, cảnh sắc thơ mộng. Rất thích hợp cho hoạt động chèo kayak, đạp xe quanh rừng thông và tham quan bảo tàng ngoài trời Art in the Forest.'
        };
      } else if (!isWeekend && hour >= 8 && hour < 17) {
        const density = 22;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Đại Lải: Rất thông thoáng (${density}%) — Không gian trong lành`,
          recommendation: 'Khuôn viên ven hồ thoáng đãng, thư thái dạo bước dưới tán thông reo và thưởng ngoạn nghệ thuật.'
        };
      } else {
        const density = 10;
        return {
          day,
          timeString,
          density,
          level: 'Thanh bình ven hồ',
          statusType: 'success',
          statusBadge: 'Tuyệt đối thông thoáng',
          headline: `Đại Lải: Thanh bình (${density}%) — Gió hồ dịu mát`,
          recommendation: 'Không gian tĩnh lặng, thích hợp nghỉ ngơi thư giãn.'
        };
      }
    } else if (locId === 'ho-guom') {
      // 1. Hồ Gươm & Phố Cổ Hà Nội
      if (isWeekend && isEveningPeak) {
        // Cuối tuần giờ cao điểm tối: 90% - 95%, Đỏ, Cực đại - Nên tránh / Quá tải nghiêm trọng
        const density = dayIndex === 6 ? 95 : 92;
        return {
          day,
          timeString,
          density,
          level: 'Quá tải nghiêm trọng (Báo động đỏ)',
          statusType: 'danger',
          statusBadge: 'Cực đại - Nên tránh!',
          headline: `Hồ Gươm & Phố Cổ: Quá tải nghiêm trọng (${density}%) — Cực đại cuối tuần, nên tránh!`,
          recommendation: 'Không gian đi bộ và quanh hồ Hoàn Kiếm đang tập trung lượng du khách cực lớn. Khuyến cáo lựa chọn các không gian mở thoáng đãng quanh hồ Tây hoặc các làng di sản ngoại thành.'
        };
      } else if (isWeekend && hour >= 8 && hour < 18) {
        // Cuối tuần ban ngày: 68% - 75%
        const density = 72;
        return {
          day,
          timeString,
          density,
          level: 'Lưu lượng cao (Cảnh báo vàng)',
          statusType: 'warning',
          statusBadge: 'Đông đúc',
          headline: `Hồ Gươm & Phố Cổ: Lưu lượng khá đông (${density}%) — Cân nhắc lộ trình tham quan`,
          recommendation: 'Mật độ khách tham quan và mua sắm tại phố cổ tăng cao. Khuyến nghị gửi xe từ xa và tuân thủ phân luồng giao thông phố đi bộ.'
        };
      } else if (!isWeekend && hour >= 18 && hour < 22) {
        // Ngày thường buổi tối: 55% - 62%
        const density = 58;
        return {
          day,
          timeString,
          density,
          level: 'Lưu lượng trung bình (Ổn định)',
          statusType: 'warning',
          statusBadge: 'Đông nhẹ - Ổn định',
          headline: `Hồ Gươm & Phố Cổ: Mật độ ổn định (${density}%) — Thuận lợi đi dạo & ẩm thực`,
          recommendation: 'Thời tiết buổi tối mát mẻ, các tuyến phố ẩm thực Tạ Hiện, Hàng Buồm nhộn nhịp vừa phải, di chuyển tương đối thuận lợi.'
        };
      } else if (!isWeekend && hour >= 7 && hour < 18) {
        // Ngày thường ban ngày: 32% - 40% (Thông thoáng, nhãn xanh)
        const density = 36;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng',
          headline: `Hồ Gươm & Phố Cổ: Rất thông thoáng (${density}%) — Thời điểm lý tưởng tham quan`,
          recommendation: 'Khu vực hồ Gươm và các hội quán di tích phố cổ thưa thoáng, thuận lợi chụp ảnh check-in và trải nghiệm văn hóa truyền thống.'
        };
      } else {
        // Đêm muộn & sáng sớm (off-peak): 15% - 22%
        const density = 18;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn (Thanh bình)',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Hồ Gươm & Phố Cổ: Yên tĩnh & Thoáng đãng (${density}%) — Tuyệt đối không ùn ứ`,
          recommendation: 'Thời điểm đêm muộn và sáng sớm, không gian phố cổ tĩnh lặng, không khí trong lành, hoàn toàn thông thoáng và an toàn.'
        };
      }
    } else if (locId === 'ho-tay') {
      // 2. Hồ Tây & Bán đảo Trúc Bạch
      if (isWeekend && hour >= 16 && hour < 21) {
        // Cuối tuần hoàng hôn & tối
        const density = 86;
        return {
          day,
          timeString,
          density,
          level: 'Đông đúc ven hồ (Cảnh báo cam)',
          statusType: 'warning',
          statusBadge: 'Giờ cao điểm hoàng hôn',
          headline: `Hồ Tây & Trúc Bạch: Đông đúc giờ hoàng hôn (${density}%) — Trục Thanh Niên & Trích Sài ùn ứ nhẹ`,
          recommendation: 'Lượng khách ngắm hoàng hôn và cà phê ven hồ đông đúc. Khuyến nghị di chuyển sang mạn Quảng An hoặc đường dạo Nguyễn Đình Thi.'
        };
      } else if (isWeekend && hour >= 7 && hour < 16) {
        // Cuối tuần ban ngày
        const density = 48;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng',
          headline: `Hồ Tây & Trúc Bạch: Không gian thoáng đãng (${density}%) — Lý tưởng thư giãn`,
          recommendation: 'Mặt hồ lộng gió, thời tiết dễ chịu, rất thích hợp cho hoạt động đạp xe quanh hồ, tản bộ và cà phê ngắm cảnh.'
        };
      } else if (!isWeekend && hour >= 17 && hour < 22) {
        // Ngày thường buổi tối
        const density = 52;
        return {
          day,
          timeString,
          density,
          level: 'Lưu lượng trung bình',
          statusType: 'warning',
          statusBadge: 'Đông nhẹ ven hồ',
          headline: `Hồ Tây & Trúc Bạch: Mật độ vừa phải (${density}%) — Dạo mát ven hồ thuận tiện`,
          recommendation: 'Các quán cà phê ven hồ có lượng khách ổn định, lưu thông trên các trục đường ven hồ diễn ra bình thường.'
        };
      } else if (!isWeekend && hour >= 7 && hour < 17) {
        // Ngày thường ban ngày: 30%
        const density = 30;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng',
          headline: `Hồ Tây & Trúc Bạch: Rất thông thoáng (${density}%) — Yên bình & trong lành`,
          recommendation: 'Lưu lượng phương tiện thấp, không khí trong lành, cực kỳ lý tưởng để thưởng trà sen và làm việc tĩnh lặng.'
        };
      } else {
        // Đêm muộn & sáng sớm
        const density = 15;
        return {
          day,
          timeString,
          density,
          level: 'Cực kỳ lý tưởng (Mức xanh)',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Hồ Tây & Trúc Bạch: Thanh bình tĩnh lặng (${density}%) — Không khí trong lành`,
          recommendation: 'Cung đường dạo bộ sát mép nước tĩnh lặng, gió hồ mát mẻ, hoàn hảo cho chạy bộ sáng sớm hoặc ngắm cảnh đêm.'
        };
      }
    } else if (locId === 'ba-dinh') {
      // 3. Hoàng Thành Thăng Long & Quảng trường Ba Đình
      if (isWeekend && hour >= 8 && hour < 12) {
        // Cuối tuần buổi sáng cao điểm tham quan Hoàng Thành
        const density = 82;
        return {
          day,
          timeString,
          density,
          level: 'Cao điểm tham quan di sản (Cảnh báo vàng)',
          statusType: 'warning',
          statusBadge: 'Cao điểm tham quan di sản',
          headline: `Hoàng Thành & Ba Đình: Cao điểm tham quan (${density}%) — Lượng đoàn khách viếng đông`,
          recommendation: 'Quảng trường Ba Đình và cổng Hoàng Thành đang đón nhiều đoàn tham quan di sản. Khuyến nghị gửi xe đúng nơi quy định và chuẩn bị vé tham quan trước.'
        };
      } else if (isWeekend && hour >= 12 && hour < 21) {
        // Cuối tuần chiều / tối
        const density = 45;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng - An toàn',
          headline: `Hoàng Thành & Ba Đình: Lưu lượng ổn định (${density}%) — Không gian di sản xanh mát`,
          recommendation: 'Khuôn viên bãi cỏ và các tuyến đường Hoàng Diệu, Điện Biên Phủ rợp bóng mát xà cừ, không gian khoáng đạt và di chuyển thuận lợi.'
        };
      } else if (!isWeekend && hour >= 7 && hour < 17) {
        // Ngày thường ban ngày: 32%
        const density = 32;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng',
          headline: `Hoàng Thành & Ba Đình: Rất thông thoáng (${density}%) — Trải nghiệm di sản lý tưởng`,
          recommendation: 'Lưu lượng khách tham quan di tích ở mức thấp, không phải xếp hàng chờ đợi, thuận tiện tìm hiểu lịch sử và chụp ảnh lưu niệm.'
        };
      } else {
        // Đêm muộn & sáng sớm
        const density = 14;
        return {
          day,
          timeString,
          density,
          level: 'Thanh bình - Trang nghiêm',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Hoàng Thành & Ba Đình: Tuyệt đối thông thoáng (${density}%) — Không gian trang nghiêm`,
          recommendation: 'Quảng trường Ba Đình thoáng đãng, lộng gió. Thích hợp theo dõi nghi lễ thượng cờ (06:00) hoặc hạ cờ (21:00) trang trọng.'
        };
      }
    } else {
      // 4. Lăng Chủ tịch Hồ Chí Minh (Lăng Bác)
      if (isWeekend && hour >= 7 && hour < 12) {
        // Cuối tuần sáng cao điểm viếng Lăng Bác
        const density = 88;
        return {
          day,
          timeString,
          density,
          level: 'Cao điểm viếng Lăng (Cảnh báo vàng)',
          statusType: 'warning',
          statusBadge: 'Cao điểm viếng Lăng',
          headline: `Lăng Bác: Cao điểm viếng Lăng (${density}%) — Lượng đoàn khách thập phương đông`,
          recommendation: 'Quảng trường Ba Đình và dòng người viếng Lăng Bác đang rất đông. Khuyến nghị xếp hàng theo hướng dẫn của tiêu binh, giữ trật tự và trang nghiêm.'
        };
      } else if (isWeekend && hour >= 12 && hour < 21) {
        // Cuối tuần chiều / tối
        const density = 45;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Thông thoáng',
          headline: `Lăng Bác: Lưu lượng ổn định (${density}%) — Thư thái tham quan Nhà sàn & Ao cá`,
          recommendation: 'Khuôn viên Phủ Chủ tịch và Nhà sàn Bác Hồ rợp bóng mát, không khí trong lành, rất thích hợp cho gia đình và đoàn tham quan.'
        };
      } else if (!isWeekend && hour >= 7 && hour < 17) {
        // Ngày thường ban ngày
        const density = 30;
        return {
          day,
          timeString,
          density,
          level: 'Mức xanh an toàn',
          statusType: 'success',
          statusBadge: 'Rất thông thoáng',
          headline: `Lăng Bác: Rất thông thoáng (${density}%) — Thuận tiện vào viếng`,
          recommendation: 'Lưu lượng khách ngày thường ở mức thấp, không phải xếp hàng chờ lâu, thuận tiện tham quan Lăng và Bảo tàng Hồ Chí Minh.'
        };
      } else {
        // Đêm muộn & sáng sớm
        const density = 18;
        return {
          day,
          timeString,
          density,
          level: 'Trang nghiêm - Thanh tịnh',
          statusType: 'success',
          statusBadge: 'Tuyệt đối thông thoáng',
          headline: `Lăng Bác: Trang nghiêm & Thanh bình (${density}%) — Thời khắc thiêng liêng`,
          recommendation: 'Quảng trường Ba Đình tĩnh lặng, trang trọng. Khuyến nghị có mặt lúc 06:00 xem Thượng cờ hoặc 21:00 xem Hạ cờ của đội tiêu binh danh dự.'
        };
      }
    }
  }

  // Helper getters
  get data(): TourismData | null {
    return this.tourismService.tourismData();
  }

  get activeTab(): 'tab1' | 'tab2' | 'tab3' {
    return this.tourismService.activeTab();
  }

  get currentCrowdData(): Tab1LocationData {
    const d = this.data;
    if (d?.tab1_locations && d.tab1_locations[this.selectedLocation()]) {
      return d.tab1_locations[this.selectedLocation()];
    }
    return d?.tab1_crowd || {
      id: 'ho-guom',
      warningArea: 'Hồ Gươm & Phố Cổ Hà Nội',
      district: 'Quận Hoàn Kiếm',
      peakStatus: {
        day: 'Thứ Bảy',
        timeRange: '19:00 - 21:00',
        density: 95,
        level: 'Quá tải nghiêm trọng (Báo động đỏ)',
        statusType: 'danger',
        statusBadge: 'Cực đại - Nên tránh!',
        message: 'Hồ Gươm & Phố Cổ: Đang quá tải (95%) — Khuyến nghị đổi khung giờ hoặc chọn điểm đến thay thế'
      },
      offPeakRecommendations: [],
      weeklySchedule: {},
      alternativeDestinations: []
    };
  }

  get currentDaySchedule(): HourlyData[] {
    const crowd = this.currentCrowdData;
    return crowd.weeklySchedule[this.selectedDay()] || [];
  }

  get currentSelectedHourData(): HourlyData | undefined {
    return this.currentDaySchedule.find(h => h.hour === this.selectedHour());
  }

  get isCurrentHourCrowded(): boolean {
    const hourData = this.currentSelectedHourData;
    return !!hourData && hourData.density >= 85;
  }

  get currentDensityColor(): string {
    const density = this.currentSelectedHourData?.density || 0;
    if (density >= 85) return 'var(--danger)';
    if (density >= 65) return 'var(--warning)';
    if (density >= 45) return 'var(--text-muted)';
    return 'var(--success)';
  }

  get safeEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.customEmbedUrl());
  }

  get surroundingDestinations(): SurroundingDestination[] {
    return this.data?.tab2_suburbs.surroundingDestinations || [];
  }

  get filteredSurroundingDestinations(): SurroundingDestination[] {
    const reg = this.selectedRegion();
    if (reg === 'all') return this.surroundingDestinations;
    return this.surroundingDestinations.filter(d => d.region === reg);
  }

  get topWideDestinations(): SurroundingDestination[] {
    return this.surroundingDestinations.slice(0, 2);
  }

  get standingDestinations(): SurroundingDestination[] {
    return this.surroundingDestinations.slice(2);
  }

  get googleMapsExternalUrl(): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.activeMapLocation())}`;
  }

  get currentActiveVideo(): VideoOption {
    return this.videoOptions.find(v => v.id === this.activeVideoId()) || this.videoOptions[0];
  }

  // Lifecycle
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupScrollDrivenTabs();
      this.setupTouchSwipe();
      this.initOrUpdatePlayer();
      this.centerActivePillTab(this.selectedLocation());
    }, 250);
  }

  private playbackMonitorInterval?: any;

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
    clearTimeout(this.scrollTimeout);
    if (this.playbackMonitorInterval) {
      clearInterval(this.playbackMonitorInterval);
    }
    if (this.ytPlayer) {
      try {
        this.ytPlayer.destroy();
      } catch (e) { }
      this.ytPlayer = null;
    }
  }

  loadYouTubeIframeApi(): void {
    if (typeof window === 'undefined') return;

    if ((window as any).YT && (window as any).YT.Player) {
      this.isYouTubeApiLoaded = true;
      this.initOrUpdatePlayer();
      return;
    }

    const prevCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === 'function') {
        try { prevCallback(); } catch (e) { }
      }
      this.isYouTubeApiLoaded = true;
      this.initOrUpdatePlayer();
    };

    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncPlayerDimensions();
  }

  syncPlayerDimensions(): void {
    if (typeof window === 'undefined' || this.isVideoTikTok()) return;

    const container = document.querySelector('.video-iframe-wrapper') as HTMLElement;
    const iframe = document.getElementById('yt-hero-player') as HTMLElement;
    if (!container || !iframe) return;

    // Eliminate fixed 640x360 inline styles and attributes injected by YouTube API
    iframe.removeAttribute('width');
    iframe.removeAttribute('height');

    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    if (!cWidth || !cHeight) return;

    const isMobile = window.innerWidth <= 768 || cWidth < 600;
    if (isMobile) {
      iframe.style.position = 'absolute';
      iframe.style.top = '50%';
      iframe.style.left = '50%';
      iframe.style.transform = 'translate(-50%, -50%)';
      iframe.style.width = '300%';
      iframe.style.height = '300%';
      iframe.style.minWidth = '100%';
      iframe.style.minHeight = '100%';
      iframe.style.border = '0';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.display = 'block';
      return;
    }

    const containerRatio = cWidth / cHeight;
    const targetRatio = 16 / 9;

    let finalWidth: number;
    let finalHeight: number;

    // Scale-to-fill: make the iframe LARGER than the container
    // so video covers 100% with overflow hidden clipping the excess
    if (containerRatio > targetRatio) {
      // Container is wider than 16:9 → match width, grow height
      finalWidth = cWidth;
      finalHeight = Math.ceil(cWidth / targetRatio);
    } else {
      // Container is taller than 16:9 → match height, grow width
      finalHeight = cHeight;
      finalWidth = Math.ceil(cHeight * targetRatio);
    }

    // Apply 8% overscan margin to eliminate any thin black edges
    finalWidth = Math.ceil(finalWidth * 1.08);
    finalHeight = Math.ceil(finalHeight * 1.08);

    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.width = `${finalWidth}px`;
    iframe.style.height = `${finalHeight}px`;
    iframe.style.minWidth = `${cWidth}px`;
    iframe.style.minHeight = `${cHeight}px`;
    iframe.style.border = '0';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.display = 'block';

    if (this.ytPlayer && typeof this.ytPlayer.setSize === 'function') {
      try {
        this.ytPlayer.setSize(finalWidth, finalHeight);
      } catch (e) {}
    }
  }

  private startPlaybackMonitor(): void {
    if (this.playbackMonitorInterval) clearInterval(this.playbackMonitorInterval);
    this.playbackMonitorInterval = setInterval(() => {
      if (this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function' && typeof this.ytPlayer.getDuration === 'function') {
        try {
          const current = this.ytPlayer.getCurrentTime();
          const duration = this.ytPlayer.getDuration();
          if (duration > 5 && current >= duration - 0.7) {
            this.handleVideoEnded();
          }
        } catch (e) {}
      }
    }, 500);
  }

  initOrUpdatePlayer(): void {
    if (typeof window === 'undefined') return;
    if (this.isVideoTikTok()) return;

    const currentUrl = this.activeVideoId();
    const ytId = extractYouTubeId(currentUrl);
    if (!ytId) return;

    if (!this.isYouTubeApiLoaded || !(window as any).YT || !(window as any).YT.Player) {
      // API not yet ready; will be invoked when onYouTubeIframeAPIReady triggers
      return;
    }

    // If player already exists, smoothly load the new video ID without tearing down DOM
    if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
      try {
        this.ytPlayer.loadVideoById(ytId);
        this.ytPlayer.mute();
        this.ytPlayer.playVideo();
        setTimeout(() => this.syncPlayerDimensions(), 100);
        return;
      } catch (err) {
        console.warn('Error loading video on existing YouTube player:', err);
        try { this.ytPlayer.destroy(); } catch (e) { }
        this.ytPlayer = null;
      }
    }

    const container = document.getElementById('yt-hero-player');
    if (!container) {
      setTimeout(() => this.initOrUpdatePlayer(), 120);
      return;
    }

    try {
      this.ytPlayer = new (window as any).YT.Player('yt-hero-player', {
        width: '100%',
        height: '100%',
        videoId: ytId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          disablekb: 1,
          loop: 1,
          playlist: ytId,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          enablejsapi: 1
        },
        events: {
          onReady: (event: any) => {
            try {
              event.target.mute();
              event.target.playVideo();
              this.syncPlayerDimensions();
              this.startPlaybackMonitor();
            } catch (e) { }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.ENDED is 0
            if (event.data === 0) {
              this.handleVideoEnded();
            } else if (event.data === 1) {
              this.syncPlayerDimensions();
            }
          },
          onError: (event: any) => {
            console.warn('YouTube Player error event:', event.data);
          }
        }
      });
    } catch (err) {
      console.warn('Error instantiating YouTube Player:', err);
    }
  }

  handleVideoEnded(): void {
    if (this.isAutoAdvancing) return;
    this.isAutoAdvancing = true;
    setTimeout(() => {
      this.isAutoAdvancing = false;
    }, 1500);

    const currentId = this.selectedLocation();
    const currentIndex = this.locationOptions.findIndex(loc => loc.id === currentId);
    const nextIndex = (currentIndex + 1) % this.locationOptions.length;
    const nextLoc = this.locationOptions[nextIndex];
    if (nextLoc) {
      // Auto-advance to next location without scrolling the user away
      this.selectLocation(nextLoc.id, false);
    }
  }

  setupScrollDrivenTabs(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0, 0.1, 0.25]
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      if (this.isUserClickScrolling) return;

      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        intersecting.sort((a, b) => {
          return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
        });
        const top = intersecting[0];
        const id = top.target.id;
        const targetTab: 'tab1' | 'tab2' | 'tab3' = id === 'pane-tab1' ? 'tab1' : id === 'pane-tab2' ? 'tab2' : 'tab3';
        if (this.activeTab !== targetTab) {
          this.tourismService.activeTab.set(targetTab);
        }
      }
    }, options);

    ['pane-tab1', 'pane-tab2', 'pane-tab3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) this.scrollObserver?.observe(el);
    });
  }

  setupTouchSwipe(): void {
    if (typeof window === 'undefined') return;
    const content = document.getElementById('core-tabs-section');
    if (!content) return;

    content.addEventListener('touchstart', (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      // Do not trigger tab switch when interacting with horizontal scroll bars, buttons, or charts
      if (target && target.closest('.days-button-group, .merc-region-switcher, .location-pill-container, .suburb-quick-selector, .chart-visualizer, input, button, a')) {
        this.touchStartX = 0;
        this.touchStartY = 0;
        return;
      }
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    content.addEventListener('touchend', (e: TouchEvent) => {
      if (this.touchStartX === 0) return;
      const diffX = e.changedTouches[0].screenX - this.touchStartX;
      const diffY = e.changedTouches[0].screenY - this.touchStartY;

      // Reset coordinates
      this.touchStartX = 0;
      this.touchStartY = 0;

      if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY) * 1.8) {
        const cur = this.activeTab;
        if (diffX < 0) {
          // Swipe left -> Next tab
          if (cur === 'tab1') this.switchTab('tab2');
          else if (cur === 'tab2') this.switchTab('tab3');
        } else {
          // Swipe right -> Prev tab
          if (cur === 'tab3') this.switchTab('tab2');
          else if (cur === 'tab2') this.switchTab('tab1');
        }
      }
    }, { passive: true });
  }

  // Actions
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  selectVideo(id: string): void {
    this.activeVideoId.set(id);
  }

  scrollToTabs(): void {
    const section = document.getElementById('core-tabs-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  switchTab(tab: 'tab1' | 'tab2' | 'tab3'): void {
    this.tourismService.setActiveTab(tab);
    this.isUserClickScrolling = true;
    clearTimeout(this.scrollTimeout);

    const element = document.getElementById(`pane-${tab}`);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    this.scrollTimeout = setTimeout(() => {
      this.isUserClickScrolling = false;
    }, 850);
  }

  /**
   * Unified Location Selector:
   * Used for both manual tab clicks and auto-advance when video ends.
   */
  selectLocation(locId: string, shouldScroll = false): void {
    this.selectedLocation.set(locId);

    const loc = this.locationOptions.find(l => l.id === locId);
    const videoUrl = loc?.videoUrl || '';
    this.activeVideoId.set(videoUrl);

    // Auto-center active location pill tab in horizontal scrollable container
    this.centerActivePillTab(locId);

    if (this.isVideoTikTok()) {
      if (this.ytPlayer) {
        try {
          this.ytPlayer.destroy();
        } catch (e) { }
        this.ytPlayer = null;
      }
    } else {
      this.initOrUpdatePlayer();
      setTimeout(() => this.syncPlayerDimensions(), 120);
    }

    if (shouldScroll) {
      setTimeout(() => {
        const hero = document.querySelector('.hero-video-section');
        if (hero) {
          hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }

  /**
   * Auto-center active location pill tab in horizontal scrollable container (Mobile & Desktop)
   * Uses scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
   */
  centerActivePillTab(locId: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    setTimeout(() => {
      const pillBtn = document.getElementById('hero-loc-pill-' + locId);
      if (pillBtn) {
        pillBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }, 60);
  }

  selectLocationAndScroll(locId: string): void {
    this.selectLocation(locId, true);

    // Switch to Tab 1 if currently in another tab
    if (this.activeTab !== 'tab1') {
      this.tourismService.setActiveTab('tab1');
    }

    // Synchronize Google Maps focus for Control Fit
    if (locId === 'ba-vi') {
      this.selectMapLocation('Vuon+Quoc+Gia+Ba+Vi+Ha+Noi', 'Vườn Quốc gia Ba Vì (Huyện Ba Vì)');
    } else if (locId === 'dai-lai') {
      this.selectMapLocation('Ho+Dai+Lai+Flamingo+Vinh+Phuc', 'Hồ Đại Lải & Flamingo (Phúc Yên)');
    } else if (locId === 'lang-bac') {
      this.selectMapLocation('Lang+Chu+tich+Ho+Chi+Minh+Ha+Noi', 'Lăng Chủ tịch Hồ Chí Minh (Quận Ba Đình)');
    } else if (locId === 'ho-guom') {
      this.selectMapLocation('Ho+Guom+Hoan+Kiem+Ha+Noi', 'Hồ Gươm & Phố Cổ (Quận Hoàn Kiếm)');
    } else if (locId === 'ho-tay') {
      this.selectMapLocation('Ho+Tay+Tay+Ho+Ha+Noi', 'Hồ Tây & Trúc Bạch (Quận Tây Hồ)');
    } else if (locId === 'ba-dinh') {
      this.selectMapLocation('Hoang+Thanh+Thang+Long+Ba+Dinh', 'Hoàng Thành Thăng Long (Quận Ba Đình)');
    }
  }

  isVideoTikTok(): boolean {
    const id = this.activeVideoId();
    return !!id && (id.includes('tiktok.com') || /^\d{15,}$/.test(id));
  }

  selectDay(day: string): void {
    this.selectedDay.set(day);
  }

  selectHour(hour: string): void {
    this.selectedHour.set(hour);
  }

  openDestinationModal(dest: AlternativeDestination): void {
    this.selectedDestinationModal.set(dest);
  }

  closeDestinationModal(): void {
    this.selectedDestinationModal.set(null);
  }

  selectSuburb(suburb: SuburbDestination): void {
    this.selectedSuburb.set(suburb);
  }

  selectRegion(reg: 'all' | 'west' | 'north' | 'east'): void {
    this.selectedRegion.set(reg);
  }

  onMapLoaded(): void {
    this.isMapLoading.set(false);
  }

  selectMapLocation(query: string, title: string): void {
    if (this.activeMapLocation() === query) return;
    this.isMapLoading.set(true);
    this.activeMapLocation.set(query);
    this.activeMapTitle.set(title);
    const encoded = encodeURIComponent(query);
    const url = `https://maps.google.com/maps?q=${encoded}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
    this.safeGoogleMapsEmbedUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  selectMapForDestination(dest: SurroundingDestination): void {
    this.selectMapLocation(dest.mapQuery, dest.name);
    setTimeout(() => {
      const mapEl = document.getElementById('google-maps-view');
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  openSurroundingModal(dest: SurroundingDestination): void {
    this.selectedSurroundingModal.set(dest);
  }

  closeSurroundingModal(): void {
    this.selectedSurroundingModal.set(null);
  }

  nextCheckInPhoto(): void {
    const total = this.data?.tab2_suburbs.itinerary1Day.checkInGallery.length || 1;
    this.activeCheckInIndex.update(idx => (idx + 1) % total);
  }

  prevCheckInPhoto(): void {
    const total = this.data?.tab2_suburbs.itinerary1Day.checkInGallery.length || 1;
    this.activeCheckInIndex.update(idx => (idx - 1 + total) % total);
  }

  toggleAudio(audio: HeritageAudio): void {
    this.tourismService.playAudio(audio);
  }

  toggleTranscript(id: string): void {
    if (this.activeTranscriptId() === id) {
      this.activeTranscriptId.set(null);
    } else {
      this.activeTranscriptId.set(id);
    }
  }

  openMobileSimulator(slug: string): void {
    this.simulatedSlug.set(slug);
    this.showMobileSimulator.set(true);
  }

  closeMobileSimulator(): void {
    this.showMobileSimulator.set(false);
  }

  navigateToHeritage(slug: string): void {
    this.router.navigate(['/heritage', slug]);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getDensityBadgeClass(density: number): string {
    if (density >= 85) return 'danger';
    if (density >= 65) return 'warning';
    if (density >= 45) return 'primary';
    return 'success';
  }
}
