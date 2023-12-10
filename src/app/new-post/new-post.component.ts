import { ChangeDetectorRef, Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// Adjust the path as needed

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],

  animations: [
    trigger('buttonClick', [
      state(
        'inactive',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'active',
        style({
          transform: 'scale(1.1)',
        })
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
    ]),
  ],
})
export class NewPostComponent {
  layout: boolean = false;
  resetvalue: boolean = true;
  trickMe: boolean = true;
  confirmation: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

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

  buttonState: { [key: string]: string } = {
    stress: 'inactive',
    love: 'inactive',
    gratitude: 'inactive',
    sports: 'inactive',
    romance: 'inactive',
    work: 'inactive',
    angry: 'inactive',
    happy: 'inactive',
    sad: 'inactive',
    // Add other emotions and their default values here
  };

  setSelectedValue(value: number, emotion: string, event: Event): void {
    // trigger animation
    this.buttonState[emotion] = 'active';
    setTimeout(() => {
      this.buttonState[emotion] = 'inactive';
    }, 100);

    //this.activeButton = emotion;
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

  onClick() {
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
    console.log('workvalue ', workValue);
    console.log('angryValue ', angryValue);

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

  // not finished yet, idea with a confirmation
  reSetConfirmation() {
    this.confirmation = true;
  }

  closeConfirmation() {
    this.confirmation = false;
  }

  reSet() {
    this.sliderValues['stress'] = 0;
    this.sliderValues['love'] = 0;
    this.sliderValues['gratitude'] = 0;
    this.sliderValues['sports'] = 0;
    this.sliderValues['romance'] = 0;
    this.sliderValues['work'] = 0;
    this.sliderValues['angry'] = 0;
    this.sliderValues['happy'] = 0;
    this.sliderValues['sad'] = 0;
    this.buttonColor['stress'] = 'transparent';
    this.buttonColor['love'] = 'transparent';
    this.buttonColor['gratitude'] = 'transparent';
    this.buttonColor['sports'] = 'transparent';
    this.buttonColor['romance'] = 'transparent';
    this.buttonColor['work'] = 'transparent';
    this.buttonColor['angry'] = 'transparent';
    this.buttonColor['happy'] = 'transparent';
    this.buttonColor['sad'] = 'transparent';
    this.resetvalue = false;
    this.trickMe = false;
    this.changeDetector.detectChanges();
    this.trickMe = true;
    this.showSlider['stress'] = false;
    this.showSlider['love'] = false;
    this.showSlider['gratitude'] = false;
    this.showSlider['sports'] = false;
    this.showSlider['romance'] = false;
    this.showSlider['work'] = false;
    this.showSlider['angry'] = false;
    this.showSlider['happy'] = false;
    this.showSlider['sad'] = false;
    this.confirmation = false;
  }
}
