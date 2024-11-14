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
import { CreateAdvisoryAdvisorComponent } from './components/Advisor/create-advisory-advisor/create-advisory-advisor.component';
import { ListAdvisoryAdvisorComponent } from './components/Advisor/list-advisory-advisor/list-advisory-advisor.component';
import { ListStudentsComponent } from './components/Advisor/list-students/list-students.component';
import { ProfileAdvisorComponent } from './components/Advisor/profile-advisor/profile-advisor.component';
import { authenticatedGuard } from './Authentication/guards/authenticated.guard';
import { studentGuardGuard } from './Authentication/guards/student-guard.guard';
import { advisorGuardGuard } from './Authentication/guards/advisor-guard.guard';

export const routes: Routes = [
  // Rutas sin autenticación
  {
    path: 'login',
    title: 'Iniciar Sesion',
    component: LoginComponent,
    canActivate: [authenticatedGuard]
  },
  {
    path: 'register',
    title: 'Registrarse',
    component: RegisterComponent,
    canActivate: [authenticatedGuard]
  },
  
  
  {
    path: 'application-advisor',
    title: 'Aplicación a asesor',
    component: ApplicationAdvisorComponent,
    canActivate: [authenticatedGuard]
  },

  // Rutas para el rol de estudiante

  
  {
    path: 'dashboard-student',
    title: 'Dashboard Student',
    component: DashboardFreeComponent,
    children:[
      {
        path: '',
        title: 'Dashboard Student',
        component: CareersComponent,
        canActivate: [studentGuardGuard]
      },
      
      {
        path: 'profile-student',
        title: 'Profile Student',
        component: ProfileStudentComponent,
        canActivate: [studentGuardGuard]
      },
      {
        path: 'list-advisories',
        title: 'Asesorias',
        component: ListAdvisoryStudentComponent,
        canActivate: [studentGuardGuard]
      },
      {
        path: 'advisors',
        title: 'Asesores',
        component: ListAdvisorsComponent,
        canActivate: [studentGuardGuard]
      },

      {
        path: 'adviser-profile/:id',
        title: 'Perfil Asesor',
        component: ShowProfileAdviserComponent,
        canActivate: [studentGuardGuard]
      }
    ],
    canActivate: [studentGuardGuard] 
  },
  
  

  {
    path: 'dashboard',
    title: 'Dashboard Advisor',
    component: PagePrincipalComponent,
    children: [
      {
        path: 'advisor',
        title: 'Dashboard Advisor',
        component: DashboardAdvisorComponent,
        canActivate: [advisorGuardGuard]
      },
      {
        path: 'list-student',
        title: 'Students',
        component: ListStudentsComponent,
        canActivate: [advisorGuardGuard]
      },
      {
        path: 'create-advisory-student',
        title: 'Create Advisory',
        component: CreateAdvisoryAdvisorComponent,
        canActivate: [advisorGuardGuard]  
      },
      {
        path: 'list-advisories',
        title: 'Advisories',
        component: ListAdvisoryAdvisorComponent,
        canActivate: [advisorGuardGuard]
      },
      {
        path: 'profile-advisor',
        title: 'Profile Advisor',
        component: ProfileAdvisorComponent,
        canActivate: [advisorGuardGuard]
      },
      
    ],
    canActivate: [advisorGuardGuard]  
  },

  // Ruta por defecto y redireccionamiento
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
    canActivate: [authenticatedGuard]
  }
];