// client/src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Colocamos a URL diretamente aqui
  private apiUrl = 'http://localhost:3333/auth';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}