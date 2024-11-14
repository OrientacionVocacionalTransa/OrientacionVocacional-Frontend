import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ApplicationAdvisorComponent } from './components/Advisor/application-advisor/application-advisor.component';

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
        path: '**',
        redirectTo: 'home'
      },
      {
        path: 'home',
        title: 'Home',
        component: HomePageComponent
      }
];
