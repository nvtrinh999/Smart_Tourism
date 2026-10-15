import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeritageDetailComponent } from './pages/heritage-detail/heritage-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Hà Nội Smart Tourism — Điều Tiết Du Khách & Di Sản Số'
  },
  {
    path: 'heritage/:slug',
    component: HeritageDetailComponent,
    title: 'Thuyết Minh Di Sản — Hà Nội Smart Tourism'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
