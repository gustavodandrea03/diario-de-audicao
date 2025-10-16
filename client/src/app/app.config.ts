// client/src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
// Importa o interceptor de autenticação
import { authInterceptor } from './core/auth/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // Registra o interceptor de autenticação com o cliente HTTP
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};