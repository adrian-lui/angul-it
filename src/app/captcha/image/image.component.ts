import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  choices = [
    { label: 'Here?', icon: '' },
    { label: 'Or here?', icon: '' },
    { label: 'Maybe here?', icon: '' },
  ];
  ans!: string;
  revealingChoice?: number = undefined;
  selectedChoice = '';
  possibleAnswers = ['home', 'heart', 'bolt'];
  showSpinner = false;

  private router = inject(Router);

  reveal(index: number, choice: any) {
    if (this.revealingChoice === index) {
      this.revealingChoice = undefined;
    } else {
      this.revealingChoice = index;
      this.selectedChoice = choice.icon;
    }
  }

  ngOnInit() {
    this.ans =
      this.possibleAnswers[
        Math.floor(Math.random() * this.possibleAnswers.length)
      ];

    const possibleAnswers = this.possibleAnswers.slice();
    this.choices.forEach((choice) => {
      const randomIconIndex = Math.floor(
        Math.random() * possibleAnswers.length
      );
      choice.icon = `assets/images/${possibleAnswers.splice(
        randomIconIndex,
        1
      )}.svg`;
    });
  }

  onSubmit() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      if (this.revealingChoice !== undefined) {
        this.router.navigateByUrl('/result', {
          state: { success: this.selectedChoice.includes(this.ans) },
        });
      }
    }, 1000);
  }

  onBack() {
    this.router.navigateByUrl('captcha/stage2');
  }
}
