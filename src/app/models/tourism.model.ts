export interface HourlyData {
  hour: string;
  density: number;
  label: string;
}

export interface OffPeakRecommendation {
  timeRange: string;
  description: string;
  avgDensity: number;
  badge: string;
}

export interface AlternativeDestination {
  id: string;
  name: string;
  category: string;
  badge: string;
  density: number;
  distance: string;
  image: string;
  description: string;
  highlights: string[];
  mapUrl: string;
}

export interface SuburbDestination {
  id: string;
  name: string;
  district: string;
  distance: string;
  coords: { lat: number; lng: number };
  image: string;
  summary: string;
  busRoute: string;
  cost: string;
  travelTime: string;
}

export interface SurroundingDestination {
  id: string;
  name: string;
  region: 'all' | 'west' | 'north' | 'east';
  regionLabel: string;
  location: string;
  distance: string;
  shortDistance: string;
  description: string;
  tags: string[];
  image: string;
  watermark: string;
  mapQuery: string;
  busRoute: string;
  bestTime: string;
  highlights?: string[];
}


export interface BusGuide {
  routeNumber: string;
  routeTitle: string;
  ticketPrice: string;
  studentPrice: string;
  frequency: string;
  operatingHours: string;
  pickUpPoint: string;
  dropOffPoint: string;
  totalStops: number;
  keyStops: string[];
  proTips: string[];
}

export interface ItineraryStep {
  phase: string;
  time: string;
  title: string;
  detail: string;
  tag: string;
}

export interface CheckInPhoto {
  title: string;
  desc: string;
  tip: string;
  image: string;
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface HeritageArticle {
  lead: string;
  sections: ArticleSection[];
}

export interface HeritageAudio {
  id: string;
  slug: string;
  title: string;
  heritageSite: string;
  narrator: string;
  durationFormatted: string;
  durationSeconds: number;
  audioUrl: string;
  coverImage: string;
  qrCodeLabel: string;
  summary: string;
  article: HeritageArticle;
  qrCodeDataUrl?: string;
}

export interface Tab1LocationData {
  id: 'ho-guom' | 'ho-tay' | 'ba-dinh';
  warningArea: string;
  shortName?: string;
  district: string;
  peakStatus: {
    day: string;
    timeRange: string;
    density: number;
    level: string;
    message: string;
    statusBadge?: string;
    statusType?: 'danger' | 'warning' | 'success';
  };
  offPeakRecommendations: OffPeakRecommendation[];
  weeklySchedule: Record<string, HourlyData[]>;
  alternativeDestinations: AlternativeDestination[];
}

export interface TourismData {
  system: {
    title: string;
    subtitle: string;
    theme: {
      primary: string;
      primaryDark: string;
      accent: string;
      accentDark: string;
      danger: string;
      success: string;
      warning: string;
    };
  };
  tab1_crowd: Tab1LocationData;
  tab1_locations?: Record<string, Tab1LocationData>;
  tab2_suburbs: {
    title: string;
    description: string;
    destinations: SuburbDestination[];
    surroundingDestinations?: SurroundingDestination[];
    busGuide: BusGuide;
    itinerary1Day: {
      destination: string;
      targetAudience: string;
      budget: string;
      timeline: ItineraryStep[];
      checkInGallery: CheckInPhoto[];
    };
  };
  tab3_heritage: {
    title: string;
    description: string;
    forJudgesNotice: string;
    audios: HeritageAudio[];
  };
}
