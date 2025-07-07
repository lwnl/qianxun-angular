import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { News } from '../news.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-detail',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent implements OnInit {
  news?: News;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    const news = this.newsService.getSelectedNews()

    if (!news) {
      console.error('未传入新闻对象');
      return;
    }

    this.news = news
    this.loadNews(news)
  }

  loadNews(news: News) {
    const apiUrl = 'http://localhost:3000/api/scrape';

    this.http.post<{ content: string }>(apiUrl, { url: news.url })
      .subscribe(res => {
        if (this.news) {
          this.news.content = res.content
        }
      })
  }
}
