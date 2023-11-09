import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userName: string | null = null;
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }
}
