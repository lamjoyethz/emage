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
import { StatisticsAlternativeComponent } from './statistics-alternative/statistics-alternative.component';
import { NewPostComponent } from './new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

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
    StatisticsAlternativeComponent,
    NewPostComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    SlickCarouselModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

