import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  layout: string = '0';
  error: Boolean = false;
  switchLayout() {
    // To store the username in localStorage

    // To retrieve the username from localStorage
    const storedLayout = localStorage.getItem('layout');

    localStorage.setItem('layout', storedLayout == '0' ? '1' : '0');

    const newStoredLayout = localStorage.getItem('layout');

    // Check if a username is stored
    if (newStoredLayout) {
      console.log('Stored storedLayout: ' + newStoredLayout);
    } else {
      console.log('No storedLayout stored.');
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
