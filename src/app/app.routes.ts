import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'expired',
    loadComponent: () =>
      import('./shared/pages/wedding-expired-page/wedding-expired-page.component').then(
        (m) => m.WeddingExpiredPageComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/model-page/model-page.component').then(
            (m) => m.ModelPageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
