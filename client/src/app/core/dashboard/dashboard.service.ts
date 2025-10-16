// client/src/app/core/dashboard/dashboard.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardStats {
  topArtists: { artistName: string; albumCount: number }[];
  predominantDecade: number | null;
  topRatedAlbums: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // URL base da API do dashboard
  private apiUrl = `http://localhost:3333/dashboard`;

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
  }
}