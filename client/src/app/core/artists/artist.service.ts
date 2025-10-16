import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Artist {
  id: string;
  name: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:3333/artists';

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  //  Nova função para buscar um artista por ID
  getArtistById(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }
// Cria um novo artista
  createArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  // Nova função para atualizar um artista existente
  updateArtist(id: string, artist: Partial<Artist>): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }
// Nova função para excluir um artista
  deleteArtist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}