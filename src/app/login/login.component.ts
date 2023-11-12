import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  error: Boolean = false;
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
      this.loginForm.value.email.toLowerCase().startsWith('user')
    ) {
      // Perform actions when storedUsername is not equal to a string starting with "user%"
      this.router.navigate(['/dashboard']);
    } else {
      // Perform actions when storedUsername is equal to a string starting with "user%" or null
      this.error = true;
    }
  }

  ngOnInit(): void {}
}
