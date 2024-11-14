import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ApplicationAdvisorComponent } from './components/Advisor/application-advisor/application-advisor.component';
import { DashboardFreeComponent } from './components/Student/dashboard-free/dashboard-free.component';
import { CareersComponent } from './components/Student/careers/careers.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Iniciar Sesion',
        component: LoginComponent
      },

      {
        path: 'register',
        title: 'Registrarse',
        component: RegisterComponent
      },

      {
        path: 'application-advisor',
        title: 'Aplicación a asesor',
        component: ApplicationAdvisorComponent
      },
      {
        path: 'dashboard-student',
        title: 'Dashboard Student',
        component: DashboardFreeComponent,
        children:[
          {
            path: '',
            title: 'Dashboard Student',
            component: CareersComponent
          } ]
  },
    {
        path: '**',
        redirectTo: 'home'
      },
      {
        path: 'home',
        title: 'Home',
        component: HomePageComponent
      }
];
