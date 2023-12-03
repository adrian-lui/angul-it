import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageGuardService } from '../../services/stageguard.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-math',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './math.component.html',
  styleUrl: './math.component.scss',
})
export class MathComponent implements OnInit {
  num1!: number;
  num2!: number;
  ans!: number;
  pattern = /^\d{0,4}$/;
  form = new FormGroup({
    ans: new FormControl('', [Validators.pattern(this.pattern)]),
  });
  tries = 3;
  showSpinner = false;

  private router = inject(Router);

  ngOnInit() {
    this.num1 = Math.floor(Math.random() * 100);
    this.num2 = Math.floor(Math.random() * 100);
    this.ans = this.num1 + this.num2;
  }

  onSubmit() {
    if (this.form.controls['ans'].value === this.ans.toString()) {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        localStorage.setItem('angul-it', btoa(StageGuardService.STAGE_2));
        this.router.navigateByUrl('captcha/stage2');
      }, 1000);
    } else {
      this.tries -= 1;
    }
    if (this.tries === 0) {
      this.router.navigateByUrl('/result', { state: { success: false } });
    }
  }
}
