import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';

export interface News {
  id: number;
  title: string;
  url: string;
  content: string;
  createdAt: string;
}

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  currentPage: number = 1
  pageSize: number = 10
  totalPages: number = 0
  indexArray: number[] = [];
  loading: boolean = false;

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.fetchNewsList();
  }

  fetchNewsList() {
    this.loading = true
    this.newsService.getNewsList()
      .subscribe({
        next: res => {
          this.newsList = res.data
          this.totalPages = Math.ceil(this.newsList.length / this.pageSize);
          this.indexArray = Array.from({ length: this.totalPages }, (_, i) => i + 1)
          this.loading = false
        },
        error: err => {
          console.error('获取新闻失败', err)
          this.loading = false
        }
      })
  }

  get currentNewsList() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.newsList.slice(start, start + this.pageSize);
  }

  getPrevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1)
  }

  getNextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages)
  }

  setPage(page: number) {
    this.currentPage = page
  }
}
