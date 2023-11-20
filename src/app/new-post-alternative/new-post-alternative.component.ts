import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-new-post-alternative',
  templateUrl: './new-post-alternative.component.html',
  styleUrls: ['./new-post-alternative.component.scss']
})
export class NewPostAlternativeComponent {
  currentStep= 1;

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    console.log("submit");
    this.onClick();
    // process data here
  }

  showSlider: { [key: string]: boolean } = {
    stress: false,
    hungry: false,
    tiredness: false,
    sports: false,
    romance: false,
    work: false,
    angry: false,
    happy: false,
    sad: false,
    // Add other emotions and their default values here
  };

  triggerButton(emotion: string) {
    this.showSlider['stress']=false;
    this.showSlider['hungry']=false;
    this.showSlider['tiredness']=false;
    this.showSlider['sports']=false;
    this.showSlider['romance']=false;
    this.showSlider['work']=false;
    this.showSlider['angry']=false;
    this.showSlider['happy']=false;
    this.showSlider['sad']=false;
    this.showSlider[emotion]=!this.showSlider[emotion];
  }

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

  activeButton: string | null = null;

  setSelectedValue(value: number, emotion: string, event:Event): void { // problem when adding the active class to the button is that I also need to remove the active class from previous buttons
      this.activeButton = emotion;
       // Set the value of the selected slider
      this.sliderValues[emotion] = value;
      this.triggerButton(emotion);
      
      const buttons = document.querySelectorAll('.custom-button');

      buttons.forEach(button => {
        button.classList.remove('active');
      });

      const clickedButton = event.target as HTMLButtonElement;
      clickedButton.classList.add('active');
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
