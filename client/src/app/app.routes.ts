// client/src/app/app.routes.ts

import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth/auth-guard';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { AlbumListComponent } from './pages/album-list/album-list.component'; 
import { AlbumDetailComponent } from './pages/album-detail/album-detail.component'; 

export const routes: Routes = [
  // Rota para a página de login (sem o layout principal)
  {
    path: 'login',
    component: LoginComponent
  },

  // Rotas que usam o layout principal
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // guarda de autenticação
    children: [
      // Redireciona a rota raiz para o dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Rota do dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Rota da lista de artistas
      { path: 'artists', component: ArtistListComponent }, 
      // Rota da lista de álbuns
      { path: 'albums', component: AlbumListComponent }, 
      // Rota do detalhe do álbum
      { path: 'albums/:id', component: AlbumDetailComponent }, 


    ]
  },

  // Rota para redirecionar qualquer rota desconhecida para a página inicial
  { path: '**', redirectTo: '' }
];