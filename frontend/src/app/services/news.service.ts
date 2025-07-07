import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { News } from "../pages/news/news.component";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private selectedNews?: News
  private apiUrl = 'http://localhost:3000/api/news';

  constructor(private http: HttpClient) { }

  getNewsById(id: number) {
    return this.http.get<{ data: News }>(`${this.apiUrl}/${id}`);
  }
}