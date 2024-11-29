import { Routes } from '@angular/router';
import { DashboardFreeComponent } from './components/Student/dashboard-free/dashboard-free.component';
import { authenticatedGuard } from './Authentication/guards/authenticated.guard';
import { studentGuardGuard } from './Authentication/guards/student-guard.guard';
import { advisorGuardGuard } from './Authentication/guards/advisor-guard.guard';
import { RestPasswordComponent } from './components/Auth/rest-password/rest-password.component';
import { ForgotPasswordComponent } from './components/Auth/forgot-password/forgot-password.component';
import { ChangePasswordAdminComponent } from './components/Admin/change-password-admin/change-password-admin.component';
import { adminGuard } from './Authentication/guards/admin.guard';
import { studentFreeGuard } from './Authentication/guards/student-free.guard';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { DashboardPremiumComponent } from './components/Student/dashboard-premium/dashboard-premium.component';

export const routes: Routes = [
  // Rutas sin autenticación
  {
    path: 'login',
    title: 'Iniciar Sesion',
    canActivate: [authenticatedGuard],
    loadComponent: () => import('./components/Auth/login/login.component').then(m => m.LoginComponent),

  },
  {
    path: 'register',
    title: 'Registrarse',
    canActivate: [authenticatedGuard],
    loadComponent: () => import('./components/Auth/register/register.component').then(m => m.RegisterComponent),

  },
  {
    path: 'forgot-password',
    title: 'Recuperar contraseña',
    component: ForgotPasswordComponent,
    canActivate: [authenticatedGuard]
  },
  {
    path: 'reset-password',
    title: 'Cambiar Contraseña',
    component: RestPasswordComponent,
    canActivate: [authenticatedGuard]
  },
  {
    path: 'application-advisor',
    title: 'Aplicación a asesor',
    loadComponent: () => import('./components/Advisor/application-advisor/application-advisor.component').then(m => m.ApplicationAdvisorComponent),
    canActivate: [authenticatedGuard]
  },

  
  
  {
    path: 'dashboard-student',
    title: 'Dashboard Student',
    component: DashboardPremiumComponent,
    canActivate: [studentGuardGuard] ,
    children:[
      {
        path: '',
        title: 'Dashboard Student',
        loadComponent: () => import('./components/Student/careers/careers.component').then(m => m.CareersComponent)
      },
      {
        path: 'articles',
        title: 'Artículos',
        loadComponent: () => import('./components/Student/articles-premium/articles-premium.component').then(m => m.ArticlesPremiumComponent)
      },
      {
        path: 'profile-student',
        title: 'Profile Student',
        loadComponent: () => import('./components/Student/profile-student-premium/profile-student-premium.component').then(m => m.ProfileStudentPremiumComponent),
      },
      {
        path: 'list-advisories',
        title: 'Asesorias',
         loadComponent: () => import('./components/Student/list-advisory-student/list-advisory-student.component').then(m => m.ListAdvisoryStudentComponent),
      },
      {
        path: 'advisors',
        title: 'Asesores',
         loadComponent: () => import('./components/Student/list-advisors/list-advisors.component').then(m => m.ListAdvisorsComponent),
      },
      {
        path: 'my-advisors',
        title: 'Mis Asesores',
        loadComponent: () => import('./components/Student/my-advisors/my-advisors.component').then(m => m.MyAdvisorsComponent)
      },
      {
        path: 'adviser-profile/:id',
        title: 'Perfil Asesor',
        loadComponent: () => import('./components/Student/show-profile-adviser/show-profile-adviser.component').then(m => m.ShowProfileAdviserComponent)
      },

      {
        path: 'chat/:userId',
        title: 'Chat',
        loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)
      },
    ]
  },


  {
    path: 'dashboard-student-free',
    title: 'Dashboard Student',
    component: DashboardFreeComponent,
    canActivate: [studentFreeGuard],
    children:[
      {
        path: '',
        title: 'Dashboard Student',
        loadComponent: () => import('./components/Student/careers/careers.component').then(m => m.CareersComponent)
      },
      {
        path: 'plans',
        title: 'Planes',
        loadComponent: () => import('./components/Student/plans/plans.component').then(m => m.PlansComponent)
      },
      {
        path: 'articles',
        title: 'Artículos',
        loadComponent: () => import('./components/Student/articles/articles.component').then(m => m.ArticlesComponent)
      },
      {
        path: 'profile-student',
        title: 'Profile Student',
        loadComponent: () => import('./components/Student/profile-student/profile-student.component').then(m => m.ProfileStudentComponent)
      },
      {
        path: 'advisors',
        title: 'Asesores',
        loadComponent: () => import('./components/Student/list-advisors-free/list-advisors-free.component').then(m => m.ListAdvisorsFreeComponent)
      },

      {
        path: 'adviser-profile/:id',
        title: 'Perfil Asesor',
        loadComponent: () => import('./components/Student/show-profile-adviser/show-profile-adviser.component').then(m => m.ShowProfileAdviserComponent)
      },
    ]
  },


  {
    path: 'success',
    title: 'Payment Succes',
    component: PaymentSuccessComponent,
    canActivate: [studentFreeGuard]
  },
  
  {
    path: 'test-vocationalp',
    title: 'Test Vocacional',
    loadComponent: () => import('./components/vocational-test/vocational-test.component').then(m => m.VocationalTestComponent),
    canActivate: [studentGuardGuard]
  },

  {
    path: 'test-vocationalf',
    title: 'Test Vocacional',
    loadComponent: () => import('./components/vocational-test/vocational-test.component').then(m => m.VocationalTestComponent),
    canActivate: [studentFreeGuard]
  },

  

  {
    path: 'dashboard',
    title: 'Dashboard Advisor',

    loadComponent: () => import('./components/Advisor/page-principal/page-principal.component').then(m => m.PagePrincipalComponent),
    canActivate: [advisorGuardGuard],
    children: [
      {
        path: 'advisor',
        title: 'Dashboard Advisor',

        loadComponent: () => import('./components/Advisor/dashboard-advisor/dashboard-advisor.component').then(m => m.DashboardAdvisorComponent)
      },
      {
        path: 'change-password',
        loadComponent: () => import('./components/change-password-firstlogin/change-password-firstlogin.component').then(m => m.ChangePasswordFirstloginComponent)
      },
      {
        path: 'list-student',
        title: 'Students',
        loadComponent: () => import('./components/Advisor/list-students/list-students.component').then(m => m.ListStudentsComponent)
      },
      {
        path: 'all-students',
        title: 'Estudiantes',
        loadComponent: () => import('./components/Advisor/all-students/all-students.component').then(m => m.AllStudentsComponent)
      },
      {
        path: 'create-advisory-student',
        title: 'Create Advisory',
        loadComponent: () => import('./components/Advisor/create-advisory-advisor/create-advisory-advisor.component').then(m => m.CreateAdvisoryAdvisorComponent)
      },
      {
        path: 'list-advisories',
        title: 'Advisories',
        loadComponent: () => import('./components/Advisor/list-advisory-advisor/list-advisory-advisor.component').then(m => m.ListAdvisoryAdvisorComponent)
      },
      {
        path: 'profile-advisor',
        title: 'Profile Advisor',
        loadComponent: () => import('./components/Advisor/profile-advisor/profile-advisor.component').then(m => m.ProfileAdvisorComponent)
      },
      {
        path: 'student-profile/:id',
        title: 'Perfil Estudiante',
        loadComponent: () => import('./components/Advisor/show-profile-student/show-profile-student.component').then(m => m.ShowProfileStudentComponent)
      },
      {
        path: 'chat/:userId',
        title: 'Chat',
        loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)
      }
      
    ]
  },


  {
    path: 'dashboard-admin',
    title: 'Dashboard Admin',
    loadComponent: () => import('./components/Admin/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: 'register-advisor',
        title: 'Register Advisor',
        loadComponent: () => import('./components/Admin/register-advisor/register-advisor.component').then(m => m.RegisterAdvisorComponent)
      },
      {
        path: 'change-password',
        component: ChangePasswordAdminComponent,
      },
      {
        path: 'all-advisors',
        title: 'Asesores',
         loadComponent: () => import('./components/Admin/all-advisors/all-advisors.component').then(m => m.AllAdvisorsComponent)
      },
      {
        path: 'all-students',
        title: 'Estudiantes',
        loadComponent: () => import('./components/Admin/all-students/all-students.component').then(m => m.AllStudentsComponent)
      },
      {
        path: 'adviser-profile/:id',
        title: 'Perfil Asesor',
        loadComponent: () => import('./components/Student/show-profile-adviser/show-profile-adviser.component').then(m => m.ShowProfileAdviserComponent)
      },
      {
        path: 'student-profile/:id',
        title: 'Perfil Estudiante',
        loadComponent: () => import('./components/Advisor/show-profile-student/show-profile-student.component').then(m => m.ShowProfileStudentComponent)
      },
      {
        path: 'profile-admin',
        title: 'Profile Advisor',
        loadComponent: () => import('./components/Admin/profile-admin/profile-admin.component').then(m => m.ProfileAdminComponent)
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
    loadComponent: () => import('./components/home-page/home-page.component').then(m => m.HomePageComponent),
    canActivate: [authenticatedGuard]
  }
];