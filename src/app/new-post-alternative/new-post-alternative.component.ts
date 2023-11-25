import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-post-alternative',
  templateUrl: './new-post-alternative.component.html',
  styleUrls: ['./new-post-alternative.component.scss'],
})
export class NewPostAlternativeComponent {
  currentStep = 1;
  activeButton: string | null = null;

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

  constructor(private snackBar: MatSnackBar) {}

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
    let storedUsername = localStorage.getItem('userName');
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';

    const jsonData = JSON.parse(
      localStorage.getItem('jsonData' + storedUsername) || '[]'
    );

    const stressValue = this.sliderValues['stress'];
    const hungry = this.sliderValues['hungry'];
    const tirednessValue = this.sliderValues['tiredness'];
    const sportValue = this.sliderValues['sports'];
    const romanceValue = this.sliderValues['romance'];
    const workValue = this.sliderValues['work'];
    const angryValue = this.sliderValues['angry'];
    const happyValue = this.sliderValues['happy'];
    const sadValue = this.sliderValues['sad'];

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;

    const currData = {
      date: formattedDate,
      data: {
        feeling: {
          stressed: stressValue,
          hungry: hungry,
          tiredness: tirednessValue,
        },
        activities: {
          sport: sportValue,
          romance: romanceValue,
          work: workValue,
        },
        state: { happy: happyValue, angry: angryValue, sad: sadValue },
      },
    };

    jsonData.push(currData);

    localStorage.setItem('jsonData' + storedUsername, JSON.stringify(jsonData));

    console.log(jsonData);

    this.snackBar.open('Successful', 'Close', {
      duration: 2000, // Auto close after 2000ms
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  triggerButton(emotion: string) {
    this.showSlider['stress'] = false;
    this.showSlider['hungry'] = false;
    this.showSlider['tiredness'] = false;
    this.showSlider['sports'] = false;
    this.showSlider['romance'] = false;
    this.showSlider['work'] = false;
    this.showSlider['angry'] = false;
    this.showSlider['happy'] = false;
    this.showSlider['sad'] = false;
    this.showSlider[emotion] = !this.showSlider[emotion];
  }

  setSelectedValue(value: number, emotion: string, event: Event): void {
    // problem when adding the active class to the button is that I also need to remove the active class from previous buttons
    this.activeButton = emotion;
    // Set the value of the selected slider
    this.sliderValues[emotion] = value;
    this.triggerButton(emotion);

    const buttons = document.querySelectorAll('.custom-button');

    buttons.forEach((button) => {
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
      this.buttonColor[emotion] = '#E55B3C';
    } else if (this.sliderValues[emotion] == 2) {
      this.buttonColor[emotion] = '#F3980F';
    } else if (this.sliderValues[emotion] == 3) {
      this.buttonColor[emotion] = '#F0DE2B';
    } else if (this.sliderValues[emotion] == 4) {
      this.buttonColor[emotion] = '#46c8c8';
    } else {
      this.buttonColor[emotion] = '#4ECF92';
    }
  }
}
