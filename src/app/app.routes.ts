import { Routes } from '@angular/router';
import { TaskListComponent } from './task/task-list/task-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { TaskFormComponent } from './task/task-form/task-form.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [ authGuard ]
  },
  {
    path: 'tasks/new',
    component: TaskFormComponent,
    canActivate: [ authGuard ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
