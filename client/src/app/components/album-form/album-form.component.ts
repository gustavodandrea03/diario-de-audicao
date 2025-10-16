import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Artist, ArtistService } from '../../core/artists/artist.service';
import { Album } from '../../core/albums/album.service';

// Imports do Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.scss'
})
export class AlbumFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean;
  artists$!: Observable<Artist[]>;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService, 
    public dialogRef: MatDialogRef<AlbumFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Album | null
  ) {
    this.isEditMode = !!this.data;
  }

  ngOnInit(): void {
    // Busca a lista de artistas para popular o dropdown
    this.artists$ = this.artistService.getArtists();

    this.form = this.fb.group({
      title: [this.data?.title || '', [Validators.required]],
      artistId: [this.data?.artist.id || '', [Validators.required]],
      releaseYear: [this.data?.releaseYear || '', [Validators.required, Validators.min(1000)]],
      coverImageUrl: [this.data?.coverImageUrl || ''],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}