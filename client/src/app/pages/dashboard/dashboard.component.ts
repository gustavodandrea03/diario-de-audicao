// client/src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../core/dashboard/dashboard.service';
import { Observable } from 'rxjs';

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html', 
  styleUrl: './dashboard.scss'    
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<DashboardStats>;

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.stats$ = this.dashboardService.getStatistics();
  }
}