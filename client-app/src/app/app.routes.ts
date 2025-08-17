import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { userAuthGuard } from './guards/user-auth.guard';
import { DashboardProyectosComponent } from './components/dashboard-proyectos/dashboard-proyectos.component';
import { DashboardHerramientasComponent } from './components/dashboard-herramientas/dashboard-herramientas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [userAuthGuard],
      children: [
        { path: '', redirectTo: 'herramientas', pathMatch: 'full' },
        { path: 'herramientas', component: DashboardHerramientasComponent },
        { path: 'proyectos', component: DashboardProyectosComponent },
      ]
     },
];
