import { Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';
import { VideosComponent } from './pages/videos/videos.component';


export const routes: Routes = [
  {path:'', redirectTo: 'news/',pathMatch: 'full'},
  {path:'news', component: NewsComponent},
  {path:'news/:id', component: NewsDetailComponent},
  {path:'videos', component: VideosComponent},
];
