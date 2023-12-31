import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  layout: boolean = false;

  userName: string | null = null;
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  error: Boolean = false;
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    let storedUsername = localStorage.getItem('userName');
    this.layout = localStorage.getItem('layout') === '0' ? false : true;
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';
    console.log('storedName', storedUsername);
    if (storedUsername == '') {
      // If no username is found, navigate to the login page
      this.router.navigate(['/login']); // Replace '/login' with the actual route to your login page
    }
  }
  constructor(private router: Router) {}

  onSubmit() {
    // To store the username in localStorage
    localStorage.setItem('userName', this.loginForm.value.email);

    // To retrieve the username from localStorage
    const storedUsername = localStorage.getItem('userName');
    // Check if a username is stored
    if (storedUsername) {
      console.log('Stored username: ' + storedUsername);
    } else {
      console.log('No username stored.');
    }
    if (
      this.loginForm.value.email !== null &&
      this.loginForm.value.email.startsWith('user')
    ) {
      // Perform actions when storedUsername is not equal to a string starting with "user%"
      this.router.navigate(['/settings']);
    } else {
      // Perform actions when storedUsername is equal to a string starting with "user%" or null
      this.error = true;
    }
  }
}
