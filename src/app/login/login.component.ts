import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  layoutName: string | null = '';
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
      //Set data in localstorage
      const jsonData = [
        {
          date: '06.12.2023',
          data: {
            feeling: { stressed: '3', hungry: '5' },
            activities: { sport: '2', romance: '5', work: '4' },
            state: { happy: '3', angry: '4' },
          },
        },
        {
          date: '07.12.2023',
          data: {
            feeling: { stressed: '2', hungry: '4' },
            activities: { sport: '1', romance: '3', work: '5' },
            state: { happy: '3', angry: '4' },
          },
        },
        {
          date: '08.12.2023',
          data: {
            feeling: { stressed: '0', hungry: '3' },
            activities: { sport: '2', romance: '5', work: '2' },
            state: { happy: '3', angry: '4' },
          },
        },
        {
          date: '09.12.2023',
          data: {
            feeling: { stressed: '4', hungry: '2' },
            activities: { sport: '4', romance: '2', work: '1' },
            state: { happy: '3', angry: '4' },
          },
        },
        {
          date: '10.12.2023',
          data: {
            feeling: { stressed: '2', hungry: '1' },
            activities: { sport: '1', romance: '3', work: '3' },
            state: { happy: '1', angry: '2' },
          },
        },
        {
          date: '11.12.2023',
          data: {
            feeling: { stressed: '2', hungry: '0' },
            activities: { sport: '2', romance: '1', work: '4' },
            state: { happy: '3', angry: '4' },
          },
        },
        {
          date: '12.12.2023',
          data: {
            feeling: { stressed: '1', hungry: '5' },
            activities: { sport: '1', romance: '3', work: '4' },
            state: { happy: '3', angry: '4' },
          },
        },
      ];

      localStorage.setItem(
        'jsonData' + storedUsername,
        JSON.stringify(jsonData)
      );

      // Perform actions when storedUsername is not equal to a string starting with "user%"
      this.router.navigate(['/dashboard']);
    } else {
      // Perform actions when storedUsername is equal to a string starting with "user%" or null
      this.error = true;
    }
  }

  ngOnInit(): void {
    this.layoutName = localStorage.getItem('layout');
  }

  switchLayout() {
    // To store the username in localStorage

    // To retrieve the username from localStorage
    let storedLayout = localStorage.getItem('layout');
    storedLayout = storedLayout == '0' ? '1' : '0';

    localStorage.setItem('layout', storedLayout);
    this.layoutName = storedLayout;
    const newStoredLayout = localStorage.getItem('layout');

    // Check if a username is stored
    if (newStoredLayout) {
      console.log('Stored storedLayout: ' + newStoredLayout);
    } else {
      console.log('No storedLayout stored.');
    }
  }
}
