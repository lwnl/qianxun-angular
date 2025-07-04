import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { newsList } from './mockData';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
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


  constructor() {
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
}
