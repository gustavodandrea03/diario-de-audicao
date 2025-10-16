import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Artist, ArtistService } from '../../core/artists/artist.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArtistFormComponent } from '../../components/artist-form/artist-form.component';

// Imports do Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss'
})
export class ArtistListComponent implements OnInit {
  artists$!: Observable<Artist[]>;
  displayedColumns: string[] = ['name', 'actions'];

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private artistService: ArtistService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.artists$ = this.refresh$.pipe(
      switchMap(() => this.artistService.getArtists())
    );
  }

  openArtistForm(artist?: Artist): void {
    const dialogRef = this.dialog.open(ArtistFormComponent, {
      width: '450px',
      data: artist,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const operation = artist
          ? this.artistService.updateArtist(artist.id, result)
          : this.artistService.createArtist(result);

        operation.subscribe(() => {
          this.refresh$.next();
        });
      }
    });
  }

  deleteArtist(id: string, name: string): void {
    if (confirm(`Tem certeza que deseja deletar o artista "${name}"?`)) {
      this.artistService.deleteArtist(id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }
}