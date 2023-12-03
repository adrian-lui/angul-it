import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'captcha',
    loadChildren: () =>
      import('./captcha/captcha.routes').then((m) => m.CaptchaRoutes),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
