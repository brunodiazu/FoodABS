import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Componentes usados en routes, usadas como "Componentes" */
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { Page404Component } from './page404/page404.component';

/* GUARD */
import { AuthGuard } from './guards/auth.guard';

/* Rutas agregadas
*/
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
