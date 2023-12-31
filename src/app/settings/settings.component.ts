import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  layout: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    let storedUsername = localStorage.getItem('userName');
    this.layout = localStorage.getItem('layout') === '0' ? false : true;
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';

    if (storedUsername == '') {
      // If no username is found, navigate to the login page
      this.router.navigate(['/login']); // Replace '/login' with the actual route to your login page
    }
  }

  logout() {
    localStorage.setItem('userName', '');
    this.router.navigate(['/login']);
  }
}
