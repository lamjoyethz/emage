import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from 'src/header/header.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { DashboardAlternativeComponent } from 'src/app/dashboard-alternative/dashboard-alternative.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NewPostComponent } from './new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { NewPostAlternativeComponent } from './new-post-alternative/new-post-alternative.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPostOverviewComponent } from './new-post-overview/new-post-overview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardAlternativeComponent,
    UserProfileComponent,
    SettingsComponent,
    StatisticsComponent,
    NewPostComponent,
    LoginComponent,
    NewPostAlternativeComponent,
    NewPostOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    SlickCarouselModule,
    MatSnackBarModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
