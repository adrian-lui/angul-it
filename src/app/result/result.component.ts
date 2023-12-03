import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { StageGuardService } from '../services/stageguard.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  success!: boolean;

  public stageGuard = inject(StageGuardService);
  private router = inject(Router);

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (!state) {
      this.router.navigateByUrl('/home');
    } else {
      this.success = state['success'];
    }
  }
}
