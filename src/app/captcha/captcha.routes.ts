import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { StageGuardService } from '../services/stageguard.service';
import { ImageComponent } from './image/image.component';
import { MathComponent } from './math/math.component';
import { TextComponent } from './text/text.component';

export const CaptchaRoutes: Routes = [
  {
    path: 'stage1',
    component: MathComponent,
    canActivate: [
      () =>
        inject(StageGuardService).canActivate([
          StageGuardService.STAGE_1,
          StageGuardService.STAGE_2,
          StageGuardService.STAGE_3,
        ]),
    ],
  },
  {
    path: 'stage2',
    component: TextComponent,
    canActivate: [
      () =>
        inject(StageGuardService).canActivate([
          StageGuardService.STAGE_2,
          StageGuardService.STAGE_3,
        ]),
    ],
  },
  {
    path: 'stage3',
    component: ImageComponent,
    canActivate: [
      () => inject(StageGuardService).canActivate([StageGuardService.STAGE_3]),
    ],
  },
  {
    path: '**',
    redirectTo: 'stage1',
    pathMatch: 'full',
  },
];
