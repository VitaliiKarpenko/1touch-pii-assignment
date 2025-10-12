import { Routes } from '@angular/router';
import { PersonDashboard } from './components/person-dashboard/person-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PersonDashboard },
  { path: '**', redirectTo: '/dashboard' },
];
