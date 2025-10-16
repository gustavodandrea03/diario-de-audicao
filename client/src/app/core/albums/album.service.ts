import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Album {
  id: string;
  title: string;
  releaseYear: number;
  coverImageUrl?: string;
  artist: {
    id: string;
    name: string;
  };
  tracks: { id: string, number: number, title: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:3333/albums';

  constructor(private http: HttpClient) { }

  getAlbums(filters: { search?: string, artistId?: string }): Observable<Album[]> {
    let params = new HttpParams();
    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.artistId) {
      params = params.set('artistId', filters.artistId);
    }
    return this.http.get<Album[]>(this.apiUrl, { params });
  }

  // NOVO MÉTODO
  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  createAlbum(album: Partial<Album>): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  updateAlbum(id: string, album: Partial<Album>): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${id}`, album);
  }

  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}