import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post-overview',
  templateUrl: './new-post-overview.component.html',
  styleUrls: ['./new-post-overview.component.scss'],
})
export class NewPostOverviewComponent {
  layout: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.layout = localStorage.getItem('layout') === '0' ? false : true;

    let storedUsername = localStorage.getItem('userName');
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';

    if (storedUsername == '') {
      // If no username is found, navigate to the login page
      this.router.navigate(['/login']); // Replace '/login' with the actual route to your login page
    }
  }
}
