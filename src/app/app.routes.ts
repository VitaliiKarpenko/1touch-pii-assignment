import { Routes } from '@angular/router';
import { PersonDashboard } from './components/person/person-dashboard/person-dashboard';
import { PersonDetail } from './components/person/person-detail/person-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  {
    path: 'persons',
    component: PersonDashboard,
    children: [
      { path: ':id', component: PersonDetail },
    ],
  },
  { path: '**', redirectTo: '/persons' },
];
