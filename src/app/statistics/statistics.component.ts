import { Component, OnInit } from '@angular/core';
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

  layout: boolean = false;
  constructor(private router: Router) {}

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

        let feeling =
          (Number(x.data?.feeling?.stress || 0) +
            Number(x.data?.feeling?.hungry || 0)) /
          2;
        let states =
          (Number(x.data?.state?.angry || 0) +
            Number(
              (x.data?.feeling?.happy || 0) + (x.data?.feeling?.sad || 0)
            )) /
          3;
        this.workPoint.push((cworkPoint + feeling + states) / 3);
        this.relationshipPoint.push(
          (crelationshipPoint + feeling + states) / 3
        );
        this.sportPoint.push((csportPoint + feeling + states) / 3);
      })
    );

    console.log('this workPoint Statistic ', this.workPoint);
    console.log('this relationshipPoint ', this.relationshipPoint);
    console.log('this sportPoint ', this.sportPoint);

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
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      });
      this.chartStatisticMonthly1 = new Chart('StaticticEmotionMonthly1', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      });
      this.chartStatisticYearly1 = new Chart('StaticticEmotionYearly1', {
        type: 'line', //this denotes tha type of chart

        data: {
          labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],

          // values on X-Axis
          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
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
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      });
      this.chartStatisticMonthly = new Chart('StaticticEmotionMonthly', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      });
      this.chartStatisticYearly = new Chart('StaticticEmotionYearly', {
        type: 'line', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],

          datasets: [
            {
              label: 'Work',
              data: this.workPoint,
              backgroundColor: '#FA7070',
            },
            {
              label: 'Relationship',
              data: this.relationshipPoint,
              backgroundColor: '#F3B664',
            },
            {
              label: 'Sport',
              data: this.sportPoint,
              backgroundColor: '#F1EB90',
            },
          ],
        },
        options: {
          aspectRatio: 1,
        },
      });
    }
  }
}
export interface Statistic {
  date: string;
  data: any;
}
