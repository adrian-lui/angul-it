import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StageGuardService } from '../services/stageguard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    localStorage.removeItem('angul-it');
  }

  onStart() {
    localStorage.setItem('angul-it', btoa(StageGuardService.STAGE_1));
    this.router.navigateByUrl('captcha/stage1');
  }
}
