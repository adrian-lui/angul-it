import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { StageGuardService } from '../../services/stageguard.service';

@Component({
  selector: 'app-text',
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
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas!: ElementRef;

  form = new FormGroup({
    ans: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });

  tries = 3;
  possibleCapitalLetters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  possibleSmallLetters = 'abdfghijkmnopqrstuvwxyz';
  ans = '';
  showSpinner = false;

  private router = inject(Router);

  ngAfterViewInit() {
    const ctx: CanvasRenderingContext2D =
      this.canvas.nativeElement.getContext('2d');
    ctx.font = '30px serif';
    const x = 30;
    const y = 55;

    for (let i = 0; i < 8; i++) {
      if (i % 2) {
        this.ans +=
          this.possibleCapitalLetters[
            Math.floor(Math.random() * this.possibleCapitalLetters.length)
          ];
      } else {
        this.ans +=
          this.possibleSmallLetters[
            Math.floor(Math.random() * this.possibleSmallLetters.length)
          ];
      }
    }
    ctx.fillText(this.ans, x, y);
    for (let i = 0; i < 10; i++) {
      ctx.fillRect(x - 5, 25 + 5 * i, 155, 1);
    }
  }

  onSubmit() {
    if (this.form.controls['ans'].value === this.ans.toString()) {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        localStorage.setItem('angul-it', btoa(StageGuardService.STAGE_3));
        this.router.navigateByUrl('captcha/stage3');
      }, 1000);
    } else {
      this.tries -= 1;
    }
    if (this.tries === 0) {
      this.router.navigateByUrl('/result', { state: { success: false } });
    }
  }
  onBack() {
    this.router.navigateByUrl('captcha/stage1');
  }
}
