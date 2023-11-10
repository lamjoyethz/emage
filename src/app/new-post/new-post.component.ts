import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  onClick() {
    // read username
    const storedUsername = localStorage.getItem('userName');

    // acc username work on json
    const pathStatistic =
      'assets/Backend/' +
      storedUsername +
      '/' +
      storedUsername +
      '-profile.json';

    console.log(pathStatistic);

    fetch(pathStatistic)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
