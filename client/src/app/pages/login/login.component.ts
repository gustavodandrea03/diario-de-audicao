import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cria o formulário com seus campos e validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // Interrompe se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    // Chama o serviço de autenticação
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Navega para o dashboard após o login
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Falha no login', err);
        alert('Email ou senha inválidos.');
      }
    });
  }
}