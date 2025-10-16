import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Review {
  id: string;
  overallRating: number;
  reviewText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // URL base da API de álbuns
  private apiUrl = 'http://localhost:3333/albums';

  constructor(private http: HttpClient) { }

  saveReview(albumId: string, reviewData: Partial<Review>): Observable<Review> {
    // Envia a avaliação para o álbum específico
    return this.http.post<Review>(`${this.apiUrl}/${albumId}/reviews`, reviewData);
  }
}