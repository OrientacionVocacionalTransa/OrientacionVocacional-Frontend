import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ApplicationAdvisorComponent } from './components/Advisor/application-advisor/application-advisor.component';
import { DashboardFreeComponent } from './components/Student/dashboard-free/dashboard-free.component';
import { CareersComponent } from './components/Student/careers/careers.component';
import { ProfileStudentComponent } from './components/Student/profile-student/profile-student.component';
import { ListAdvisoryStudentComponent } from './components/Student/list-advisory-student/list-advisory-student.component';
import { ListAdvisorsComponent } from './components/Student/list-advisors/list-advisors.component';
import { ShowProfileAdviserComponent } from './components/Student/show-profile-adviser/show-profile-adviser.component';
import { PagePrincipalComponent } from './components/Advisor/page-principal/page-principal.component';
import { DashboardAdvisorComponent } from './components/Advisor/dashboard-advisor/dashboard-advisor.component';

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
          } 
          ,

          {
            path: 'profile-student',
            title: 'Profile Student',
            component: ProfileStudentComponent
          },  
          
          {
            path: 'list-advisories',
            title: 'Asesorias',
            component: ListAdvisoryStudentComponent
          },
          {
            path: 'advisors',
            title: 'Asesores',
            component: ListAdvisorsComponent
          },

         {
          path: 'adviser-profile/:id',
          title: 'Perfil Asesor',
          component: ShowProfileAdviserComponent
        }

        ]
  },

  {
    path: 'dashboard',
    title: 'Dashboard Advisor',
    component: PagePrincipalComponent,
    children: [
      {
        path: 'advisor',
        title: 'Dashboard Advisor',
        component: DashboardAdvisorComponent
      },
]
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
