import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Album, AlbumService } from '../../core/albums/album.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../core/reviews/review.service';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatListModule, MatIconModule,
    MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit {
  album$!: Observable<Album>;
  reviewForm!: FormGroup;
  albumId!: string;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Cria o formulário de avaliação
    this.reviewForm = this.fb.group({
      overallRating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      reviewText: [''],
    });

    // Com base na rota, pega o ID do álbum e busca os detalhes
    this.album$ = this.route.paramMap.pipe(
      tap(params => {
        this.albumId = params.get('id')!;
      }),
      switchMap(params => this.albumService.getAlbumById(this.albumId))
    );
  }

  onSubmitReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    this.reviewService.saveReview(this.albumId, this.reviewForm.value).subscribe({
      next: () => {
        alert('Avaliação salva com sucesso!');
        // Futuramente, podemos recarregar as avaliações do álbum aqui
      },
      error: (err) => {
        console.error('Erro ao salvar avaliação', err);
        alert('Ocorreu um erro ao salvar sua avaliação.');
      }
    });
  }
}