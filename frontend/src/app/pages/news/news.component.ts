import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { newsList } from './mockData';

@Component({
  selector: 'app-news',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  newsContent: string = '新闻内容'
  currentPage: number = 1
  pageSize: number = 5
  totalPages: number = Math.ceil(newsList.length / this.pageSize)
  indexArray: number[] = [];

  get currentNewsList() {
    const start = (this.currentPage - 1) * this.pageSize;
    return newsList.slice(start, start + this.pageSize);
  }


  constructor(private http: HttpClient) {
    this.indexArray = Array.from({ length: this.totalPages }, (_, i) => i);
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

  loadNews() {
    const apiUrl = 'http://localhost:3000/api/scrape';
    const articleUrl = 'https://www.epochtimes.com/gb/25/6/3/n14523409.htm';

    this.http.get<{ content: string }>(apiUrl, {
      params: { url: articleUrl }
    }).subscribe(res => {
      this.newsContent = res.content
    })

    console.log('新闻内容：', this.newsContent)
  }
}
