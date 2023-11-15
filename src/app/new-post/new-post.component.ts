import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {

  sliderValue: number = 1;

  showSlider: boolean = false;

  buttonBgColor: string = 'transparent';

  previousSliderValue: number = 1; // 用于保存上一个滑块值

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
  }
  onSliderChange() {
    console.log('Slider value:', this.sliderValue);
    this.buttonBgColor = this.getButtonBackgroundColor();
    this.previousSliderValue = this.sliderValue; // 保存当前滑块值为上一个值
  }

  /* backgroundcolor not done */
  getButtonBackgroundColor(): string {
    // 根据滑块的值返回相应的颜色
    switch (this.previousSliderValue) {
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
