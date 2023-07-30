import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import { authguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authguardGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redirect all other routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
