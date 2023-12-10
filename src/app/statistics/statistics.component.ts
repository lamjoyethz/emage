import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  chartStatisticDaily: any;
  chartStatisticWeekly: any;
  chartStatisticYearly: any;
  chartStatisticMonthly: any;
  chartStatisticWeekly1: any;
  chartStatisticMonthly1: any;
  chartStatisticYearly1: any;

  relationshipPoint: number[] = [];
  workPoint: number[] = [];
  sportPoint: number[] = [];
  dates: string[] = [];
  statistics: Statistic[] = [];
  currentSlideIndex: number = 0;
  layout: boolean = false;
  @ViewChild('carouselViewport') carouselViewport!: ElementRef;

  goToSlide(slideIndex: number): void {
    this.currentSlideIndex = slideIndex;
    this.cdr.detectChanges();

    // Delay the execution to ensure the DOM has updated
    const slideId = `carousel__slide${slideIndex + 1}`;
    if (this.carouselViewport && this.carouselViewport.nativeElement) {
      const slideElement = this.carouselViewport.nativeElement.querySelector(
        `#${slideId}`
      );
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    let storedUsername = localStorage.getItem('userName');
    this.layout = localStorage.getItem('layout') === '0' ? false : true;
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';

    if (storedUsername == '') {
      // If no username is found, navigate to the login page
      this.router.navigate(['/login']); // Replace '/login' with the actual route to your login page
    }
    const jsonData = JSON.parse(
      localStorage.getItem('jsonData' + storedUsername) || '[]'
    );

    this.statistics = jsonData;

    // Create data
    const last7Days = jsonData.slice(-7);
    // Asynchronously process data
    await Promise.all(
      last7Days.map(async (x: any) => {
        this.dates.push(x.date);

        // Use optional chaining to safely access nested properties
        let cworkPoint = Number(x.data?.activities?.work || 0);
        let csportPoint = Number(x.data?.activities?.sport || 0);
        let crelationshipPoint = Number(x.data?.activities?.romance || 0);

        let positive =
          Number(x.data?.positive?.happy || 0) +
          Number(x.data?.positive?.love || 0) +
          Number(x.data?.positive?.gratitude || 0);

        let negative =
          Number(x.data?.negative?.angry || 0) +
          Number(x.data?.negative?.stress || 0) +
          Number(x.data?.negative?.sad || 0);

        console.log('Points negative', negative);
        console.log('Points positive', positive);
        console.log('sport points', this.sportPoint);
        console.log('relationshipPoint points', this.relationshipPoint);
        console.log('workPoint points', this.workPoint);
        console.log('cworkPoint points', cworkPoint);
        let initialResult = cworkPoint * (positive - negative);
        let shiftedResult = initialResult + 75; // Shifting the range to 0-150
        let finalResult = (shiftedResult * 2) / 3; // Scaling down to 0-100

        console.log('total points', cworkPoint * (positive - negative) + 75);
        this.workPoint.push(finalResult);

        initialResult = crelationshipPoint * (positive - negative);
        shiftedResult = initialResult + 75; // Shifting the range to 0-150
        finalResult = (shiftedResult * 2) / 3; // Scaling down to 0-100

        this.relationshipPoint.push(finalResult);

        initialResult = csportPoint * (positive - negative);
        shiftedResult = initialResult + 75; // Shifting the range to 0-150
        finalResult = (shiftedResult * 2) / 3; // Scaling down to 0-100

        this.sportPoint.push(finalResult);
      })
    );

    console.log('FINAL workPoint Statistic ', this.workPoint);
    console.log('FINAL relationshipPoint ', this.relationshipPoint);
    console.log('FINAL sportPoint ', this.sportPoint);

    const dateset = this.statistics.map((x) => x.date);

    // Now that all the preceding steps have completed, call createChart()
    this.createChart();
  }

  createChart() {
    // Create data
    if (this.layout) {
      this.chartStatisticWeekly1 = new Chart('StaticticEmotionWeekly1', {
        type: 'line', //this denotes tha type of chart
        data: {
          // values on X-Axis
          labels: this.dates,
          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
              pointRadius: 5, // Increase the point radius
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
          scales: {
            y: {
              // Configuring the y-axis
              title: {
                display: true,
                text: 'Point', // Description for the y-axis
                font: {
                  size: 14, // Set the font size
                  weight: 'bold', // Make the title bold
                },
              },
            },
          },
        },
      });

      this.workPoint = this.workPoint.map((x) => (x < 12 ? 0 : x - 10));
      this.sportPoint = this.sportPoint.map((x) => (x > 88 ? 100 : x + 12));
      this.relationshipPoint = this.relationshipPoint.map((x) =>
        x < 6 ? 0 : x - 6
      );
      console.log('wokr point ', this.workPoint);

      this.chartStatisticMonthly1 = new Chart('StaticticEmotionMonthly1', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
              pointRadius: 5, // Increase the point radius
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
        },
      });

      this.workPoint = this.workPoint.map((x) => (x < 5 ? 0 : x - 5));
      this.sportPoint = this.sportPoint.map((x) => (x > 82 ? 100 : x + 18));
      this.relationshipPoint = this.relationshipPoint.map((x) =>
        x < 13 ? 0 : x - 13
      );

      this.chartStatisticYearly1 = new Chart('StaticticEmotionYearly1', {
        type: 'line', //this denotes tha type of chart

        data: {
          labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],

          // values on X-Axis
          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
              pointRadius: 5, // Increase the point radius
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
        },
      });
    } else {
      this.chartStatisticWeekly = new Chart('StaticticEmotionWeekly', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: this.dates,
          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
              pointRadius: 5, // Increase the point radius
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
              pointRadius: 5, // Increase the point radius
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
        },
      });

      this.workPoint = this.workPoint.map((x) => x - 5);
      this.sportPoint = this.sportPoint.map((x) => x + 17);
      this.relationshipPoint = this.relationshipPoint.map((x) => x - 10);
      console.log('wokr point ', this.workPoint);

      this.chartStatisticMonthly = new Chart('StaticticEmotionMonthly', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
        },
      });

      this.workPoint = this.workPoint.map((x) => (x <= 1 ? 0.2 : x - 8));
      this.sportPoint = this.sportPoint.map((x) => x + 15);
      this.relationshipPoint = this.relationshipPoint.map((x) =>
        x <= 1 ? 0.2 : x - 15
      );

      this.chartStatisticYearly = new Chart('StaticticEmotionYearly', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#44CF75',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#FC4993',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#EAC910',
            },
          ],
        },
        options: {
          aspectRatio: 1.5,
        },
      });
    }
  }
}
export interface Statistic {
  date: string;
  data: any;
}
