import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    love: false,
    gratitude: false,
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
    love: 0,
    gratitude: 0,
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
    love: 'transparent',
    gratitude: 'transparent',
    sports: 'transparent',
    romance: 'transparent',
    work: 'transparent',
    angry: 'transparent',
    happy: 'transparent',
    sad: 'transparent',
    // Add other emotions and their default values here
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {}

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
    const loveValue = this.sliderValues['love'];
    const gratitudeValue = this.sliderValues['gratitude'];
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
        positive: {
          happy: happyValue,
          love: loveValue,
          gratitude: gratitudeValue,
        },
        negative: { stress: stressValue, angry: angryValue, sad: sadValue },

        activities: {
          sport: sportValue,
          romance: romanceValue,
          work: workValue,
        },
      },
    };

    jsonData.push(currData);

    localStorage.setItem('jsonData' + storedUsername, JSON.stringify(jsonData));

    console.log('AFTER PUSH DATA : ', jsonData);

    this.snackBar.open('Successful', 'Close', {
      duration: 2000, // Auto close after 2000ms
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });

    this.router.navigate(['/dashboard']); // Replace '/login' with the actual route to your login page
  }

  triggerButton(emotion: string) {
    this.showSlider['stress'] = false;
    this.showSlider['love'] = false;
    this.showSlider['gratitude'] = false;
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

  updateButtonColorPositive(emotion: string) {
    if (this.sliderValues[emotion] == 0) {
      this.buttonColor[emotion] = 'transparent';
    } else if (this.sliderValues[emotion] == 1) {
      this.buttonColor[emotion] = '#F0E46E';
    } else if (this.sliderValues[emotion] == 2) {
      this.buttonColor[emotion] = '#F0DE2B';
    } else if (this.sliderValues[emotion] == 3) {
      this.buttonColor[emotion] = '#F3980F';
    } else if (this.sliderValues[emotion] == 4) {
      this.buttonColor[emotion] = '#46c8c8';
    } else {
      this.buttonColor[emotion] = '#4ECF92';
    }
  }

  updateButtonColor(emotion: string) {
    if (this.sliderValues[emotion] == 0) {
      this.buttonColor[emotion] = 'transparent';
    } else if (this.sliderValues[emotion] == 1) {
      this.buttonColor[emotion] = '#F0E46E';
    } else if (this.sliderValues[emotion] == 2) {
      this.buttonColor[emotion] = '#F0DE2B';
    } else if (this.sliderValues[emotion] == 3) {
      this.buttonColor[emotion] = '#F3980F';
    } else if (this.sliderValues[emotion] == 4) {
      this.buttonColor[emotion] = '#FB8166';
    } else {
      this.buttonColor[emotion] = '#E55B3C';
    }
  }

  updateButtonColorActivity(emotion: string) {
    if (this.sliderValues[emotion] == 0) {
      this.buttonColor[emotion] = 'transparent';
    } else if (this.sliderValues[emotion] == 1) {
      this.buttonColor[emotion] = '#AEE2E2';
    } else if (this.sliderValues[emotion] == 2) {
      this.buttonColor[emotion] = '#7BE0E0';
    } else if (this.sliderValues[emotion] == 3) {
      this.buttonColor[emotion] = '#46C8C8';
    } else if (this.sliderValues[emotion] == 4) {
      this.buttonColor[emotion] = '#26CFCF';
    } else {
      this.buttonColor[emotion] = '#0FE1E1';
    }
  }
}
