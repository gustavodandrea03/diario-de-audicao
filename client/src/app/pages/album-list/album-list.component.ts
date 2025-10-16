import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, switchMap, debounceTime, startWith } from 'rxjs';
import { Album, AlbumService } from '../../core/albums/album.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlbumFormComponent } from '../../components/album-form/album-form.component';
import { Artist, ArtistService } from '../../core/artists/artist.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 

// Imports do Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent implements OnInit {
  // Lista de álbuns e colunas da tabela
  albums$!: Observable<Album[]>;
  displayedColumns: string[] = ['cover', 'title', 'artist', 'releaseYear', 'actions'];
  
  filterForm!: FormGroup;
  artistsForFilter$!: Observable<Artist[]>;

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      artistId: [''],
    });

    this.artistsForFilter$ = this.artistService.getArtists();

    this.albums$ = this.refresh$.pipe(
      switchMap(() => this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))),
      debounceTime(300),
      switchMap(filters => this.albumService.getAlbums(filters))
    );
  }

  openAlbumForm(album?: Album): void {
    const dialogRef = this.dialog.open(AlbumFormComponent, {
      width: '500px',
      data: album,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const operation = album
          ? this.albumService.updateAlbum(album.id, result)
          : this.albumService.createAlbum(result);

        operation.subscribe(() => {
          this.refresh$.next();
        });
      }
    });
  }

  deleteAlbum(id: string, title: string): void {
    if (confirm(`Tem certeza que deseja deletar o álbum "${title}"?`)) {
      this.albumService.deleteAlbum(id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }
}