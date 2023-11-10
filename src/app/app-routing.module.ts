import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAlternativeComponent } from 'src/app/dashboard-alternative/dashboard-alternative.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsAlternativeComponent } from './statistics-alternative/statistics-alternative.component';
import { NewPostComponent } from './new-post/new-post.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardalternative', component: DashboardAlternativeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'statistics-alternative', component: StatisticsAlternativeComponent },
  { path: 'new', component: NewPostComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
