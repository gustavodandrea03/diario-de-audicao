import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Usa o serviço de autenticação para obter o token
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Se o token existir, clona a requisição e adiciona o header de Authorization
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    // Envia a requisição clonada e modificada
    return next(authReq);
  }

  // Se não houver token, apenas envia a requisição original
  return next(req);
};