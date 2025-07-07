import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { News } from "../pages/news/news.component";

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiUrl = 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  getNewsList() {
    return this.http.get<{ data: News[], message: string }>(`${this.apiUrl}/api/news-list`);
  }

  getNewsById(id: number) {
    return this.http.get<{ data: News }>(`${this.apiUrl}/api/news/${id}`);
  }

  loadNews(news: News) {
    this.http.post<{ content: string }>(`${this.apiUrl}/api/scrape`, { url: news.url })
      .subscribe(res => {
        news.content = res.content
      })
  }
}