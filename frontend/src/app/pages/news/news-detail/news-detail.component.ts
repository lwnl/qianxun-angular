import { Component, OnInit } from '@angular/core';
import { News, newsList } from '../mockData';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    const news = newsList.find(news => news.id === id);
    if (!news) {
      console.error(`未找到 id 为 ${id} 的新闻`);
      return;
    }
    this.news = newsList.find(news => news.id === id)
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
