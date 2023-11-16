import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {

  sliderValues: { [key: string]: number } = {
    stress: 1,
    hungry: 1,
    tiredness: 1,
    sports: 1,
    romance: 1,
    work: 1,
    angry: 1,
    happy: 1,
    sad: 1,
    // Add other emotions and their default values here
  };

  activeButton: string | null = null;

  setSelectedValue(value: number, emotion: string): void {
    this.activeButton = emotion;
    // Set the value of the selected slider
    this.sliderValues[emotion] = value;
  }

  isSliderVisible(emotion: string): boolean {
    return this.activeButton === emotion;
  }

  onSliderChange(emotion: string) {
    console.log(`Slider value for ${emotion}: ${this.sliderValues[emotion]}`);
    console.log('Slider value:', this.sliderValues[emotion]);
    this.buttonBgColor = this.getButtonBackgroundColor(emotion);
  }

  sliderValue: number = 1;

  showSlider: boolean = false;

  buttonBgColor: string = 'transparent';

  previousSliderValue: number = 1; // 用于保存上一个滑块值

  /* I guess value is also not stored 
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
  }
  */

  

  /* backgroundcolor not done */
  getButtonBackgroundColor(emotion: string): string {
    // 根据滑块的值返回相应的颜色
    switch (this.sliderValues[emotion]) {
      case 1:
        return 'cyan';
      case 2:
        return 'cyan';
      case 3:
        return 'green';
      case 4:
        return 'yellow';
      case 5:
        return 'pink';
      // 添加更多滑块值和对应颜色
      default:
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
