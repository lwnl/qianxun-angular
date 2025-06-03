import { Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { VideosComponent } from './pages/videos/videos.component';

export const routes: Routes = [
  {path:'', redirectTo: 'news/',pathMatch: 'full'},
  {path:'news', component: NewsComponent},
  {path:'videos', component: VideosComponent},
];
