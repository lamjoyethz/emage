import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userName: string | null = null;
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  error: Boolean = false;
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }
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
      const nextURL = '/dashboard'; // Replace with the desired URL
      window.location.href = nextURL;
    } else {
      // Perform actions when storedUsername is equal to a string starting with "user%" or null
      this.error = true;
    }
  }
}
