import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [HttpClientModule],
  templateUrl: './news.component.html',
})
export class NewsComponent {
  newsContent = '要闻内容'
  constructor(private http: HttpClient) { }

  loadNews() {
    const apiUrl = 'http://localhost:3000/api/scrape';
    const articleUrl = 'https://www.epochtimes.com/gb/25/6/3/n14523409.htm';

    this.http.get<{content:string}>(apiUrl, {
      params: {url:articleUrl}
    }).subscribe(res => {
      this.newsContent = res.content
    })
  }
}
