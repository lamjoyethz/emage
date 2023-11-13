import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {

  constructor(private cdRef: ChangeDetectorRef) {}
  

  sliderValue: number = 1;
  
  showSlider: boolean = false;

  /* I guess value is also not stored */
  setSelectedValue(value: number, option: string): void {
    switch (option) {
      case 'stress':
        this.sliderValue = value;
        break;
      case 'hungry':
        this.sliderValue = value;
        break;
      case 'tiredness':
        this.sliderValue = value;
        break;
      default:
        break;
    }
    this.showSlider = true;
    this.cdRef.detectChanges();
  }

  /* backgroundcolor not done */
  getButtonBackgroundColor(): string {
    let value = this.sliderValue;
    if (value === 1) {
      return 'transparent';
    } else if (value === 2) {
      return 'cyan';
    } else if (value === 3) {
      return 'green';
    } else if (value === 4) {
      return 'yellow';
    } else if (value === 5) {
      return 'pink';
    } else {
      return 'transparent';
    }
  }

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

