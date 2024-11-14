import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';

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
        path: '**',
        redirectTo: 'home'
      },
      {
        path: 'home',
        title: 'Home',
        component: HomePageComponent
      }
];
