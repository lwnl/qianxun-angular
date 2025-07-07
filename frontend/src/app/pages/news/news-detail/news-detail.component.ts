import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../news.component';
import { NewsService } from '../../../services/news.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent implements OnInit {
  news?: News;
  loading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    if (!id) {
      console.error("无效新闻id")
    }

    this.loading = true
    this.newsService.getNewsById(id)
    .subscribe({
      next: (res) => {
        this.news = res.data
        this.loading = false
        this.newsService.loadNews(this.news);
      },
      error: err => {
        console.error('获取新闻失败', err)
        this.loading = false
      }
    })
  }
}
