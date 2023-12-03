import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StageGuardService {
  static STAGE_1 = 'angul-it:stage1';
  static STAGE_2 = 'angul-it:stage2';
  static STAGE_3 = 'angul-it:stage3';

  constructor(private router: Router, private route: ActivatedRoute) {}

  canActivate(stage: string[]) {
    try {
      const savedStage = localStorage.getItem('angul-it');
      if (savedStage && stage.includes(atob(savedStage))) {
        return true;
      }
      throw new Error('invalid stage info');
    } catch {
      alert('cannot retrieve stage info, redirecting to home');
      this.restart();
      return false;
    }
  }

  restart() {
    localStorage.removeItem('angul-it');
    this.router.navigateByUrl('/');
  }
}
