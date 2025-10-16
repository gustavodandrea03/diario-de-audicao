import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Módulo de Formulários
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Artist } from '../../core/artists/artist.service';

// Imports do Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // <-- Adicione aqui
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.scss'
})
export class ArtistFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ArtistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artist | null
  ) {
    this.isEditMode = !!this.data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.name || '', [Validators.required]],
      imageUrl: [this.data?.imageUrl || ''],
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