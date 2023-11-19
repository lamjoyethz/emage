import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  animations: [
    trigger('buttonClick', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class NewPostComponent{

  sliderValues: { [key: string]: number } = {
    stress: 0,
    hungry: 0,
    tiredness: 0,
    sports: 0,
    romance: 0,
    work: 0,
    angry: 0,
    happy: 0,
    sad: 0,
    // Add other emotions and their default values here
  };

  buttonColor: { [key: string]: string } = {
    stress: 'transparent',
    hungry: 'transparent',
    tiredness: 'transparent',
    sports: 'transparent',
    romance: 'transparent',
    work: 'transparent',
    angry: 'transparent',
    happy: 'transparent',
    sad: 'transparent',
    // Add other emotions and their default values here
  };

  buttonState: { [key: string]: string } = {
    stress: 'inactive',
    hungry: 'inactive',
    tiredness: 'inactive',
    sports: 'inactive',
    romance: 'inactive',
    work: 'inactive',
    angry: 'inactive',
    happy: 'inactive',
    sad: 'inactive',
    // Add other emotions and their default values here
  };

  activeButton: string | null = null;

  setSelectedValue(value: number, emotion: string): void {

    // trigger animation
    this.buttonState[emotion] = 'active';
    setTimeout(() => {
      this.buttonState[emotion] = 'inactive';
    }, 100);

       this.activeButton = emotion;
       // Set the value of the selected slider
       this.sliderValues[emotion] = value;
    }

  isSliderVisible(emotion: string): boolean {
     return this.activeButton === emotion;
  }

  updateButtonColor(emotion: string) {
    if (this.sliderValues[emotion] == 0) {
      this.buttonColor[emotion] = 'transparent';
    } else if (this.sliderValues[emotion] == 1) {
      this.buttonColor[emotion] = 'cyan';
    } else if (this.sliderValues[emotion] == 2){
      this.buttonColor[emotion] = 'lightgreen';
    } else if (this.sliderValues[emotion] == 3){
      this.buttonColor[emotion] = 'yellow';
    } else if (this.sliderValues[emotion] == 4){
      this.buttonColor[emotion] = 'orange';
    } else {
      this.buttonColor[emotion] = 'pink';
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
