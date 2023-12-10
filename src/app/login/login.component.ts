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
  buttonShow: boolean = false;
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
          date: '06.10.2023',
          data: {
            negative: { angry: '5', stress: '4', sad: '2' },
            activities: { sport: '2', romance: '5', work: '4' },
            positive: { happy: '3', love: '3', gratitude: '4' },
          },
        },
        {
          date: '07.10.2023',
          data: {
            negative: { angry: '2', stress: '3', sad: '1' },
            activities: { sport: '4', romance: '2', work: '2' },
            positive: { happy: '1', love: '2', gratitude: '2' },
          },
        },
        {
          date: '08.10.2023',
          data: {
            negative: { angry: '3', stress: '1', sad: '2' },
            activities: { sport: '4', romance: '2', work: '1' },
            positive: { happy: '3', love: '1', gratitude: '5' },
          },
        },
        {
          date: '09.10.2023',
          data: {
            negative: { angry: '4', stress: '1', sad: '5' },
            activities: { sport: '5', romance: '2', work: '3' },
            positive: { happy: '3', love: '3', gratitude: '3' },
          },
        },
        {
          date: '10.10.2023',
          data: {
            negative: { angry: '2', stress: '2', sad: '2' },
            activities: { sport: '4', romance: '3', work: '2' },
            positive: { happy: '2', love: '3', gratitude: '3' },
          },
        },
        {
          date: '11.10.2023',
          data: {
            negative: { angry: '4', stress: '3', sad: '1' },
            activities: { sport: '4', romance: '1', work: '2' },
            positive: { happy: '0', love: '0', gratitude: '0' },
          },
        },
        {
          date: '12.10.2023',
          data: {
            negative: { angry: '2', stress: '5', sad: '2' },
            activities: { sport: '5', romance: '5', work: '2' },
            positive: { happy: '2', love: '3', gratitude: '2' },
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
    this.buttonShow = this.layoutName == '1' ? false : true;
  }

  switchLayout() {
    // To store the username in localStorage

    // To retrieve the username from localStorage
    let storedLayout = localStorage.getItem('layout');
    storedLayout = storedLayout == '0' ? '1' : '0';
    this.buttonShow = this.buttonShow ? false : true;

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
