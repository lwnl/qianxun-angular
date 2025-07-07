import { Injectable } from "@angular/core";
import { News } from "../pages/news/news.component";

@Injectable({ providedIn: 'root' })
export class NewsService {
  private selectedNews?: News

  setSelectedNews(news: News){
    this.selectedNews = news
  }

  getSelectedNews():News | undefined {
    return this.selectedNews
  }
}