import { Routes } from '@angular/router';
import { OrganizationComponent } from './pages/organization/organization.component';
import { DivisionListComponent } from './components/divisions/divisions.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
export const routes: Routes = [
  {
    path: 'organizacion', component: OrganizationComponent,
    children: [
      { path: 'divisiones', component: DivisionListComponent },
      { path: 'colaboradores', component: CollaboratorsComponent },
      { path: '', redirectTo: 'divisiones', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'organizacion/divisiones', pathMatch: 'full' },
];