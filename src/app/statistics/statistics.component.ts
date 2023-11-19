import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public chartDaily: any;
  public chartWeekly: any;
  public chartYearly: any;
  public chartMonthly: any;
  public chartWeekly1: any;
  public chartMonthly1: any;
  public chartYearly1: any;

  relationshipPoint: number[] = [];
  workPoint: number[] = [];
  sportPoint: number[] = [];
  dates: string[] = [];
  statistics: Statistic[] = [];

  layout: boolean = false;

  ngOnInit(): void {
    let storedUsername = localStorage.getItem('userName');
    storedUsername = storedUsername ? storedUsername?.toLowerCase() : '';
    this.layout = localStorage.getItem('layout') === '0' ? false : true;

    // acc username work on json
    const pathStatistic =
      'assets/Backend/' +
      storedUsername +
      '/statistics/' +
      storedUsername +
      '.json';

    fetch(pathStatistic)
      .then((response) => response.json())
      .then((jsonData) => {
        this.statistics = jsonData;

        // Create data
        const last7Days = jsonData.slice(0, 7);
        last7Days.forEach((x: any) => {
          this.dates.push(x.date);
          let cworkPoint = Number(x.data?.activities?.work);
          let csportPoint = Number(x.data?.activities?.sport);
          let crelationshipPoint = Number(x.data?.activities?.romance);

          let feeling =
            (Number(x.data?.feeling?.stress || 0) +
              Number(x.data?.feeling?.hungry || 0)) /
            2;
          let states =
            (Number(x.data?.state.angry || 0) +
              Number(
                (x.data?.feeling.happy || 0) + (x.data?.feeling?.sad || 0)
              )) /
            3;
          this.workPoint.push((cworkPoint + feeling + states) / 3);
          this.relationshipPoint.push(
            (crelationshipPoint + feeling + states) / 3
          );
          this.sportPoint.push((csportPoint + feeling + states) / 3);
        });

        console.log('this workPoint ', this.workPoint);
        console.log('this relationshipPoint ', this.relationshipPoint);
        console.log('this sportPoint ', this.sportPoint);

        const dateset = this.statistics.map((x) => x.date);
      })
      .then(() => {
        this.createChart();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createChart() {
    // Create data

    if (this.layout) {
      this.chartWeekly1 = new Chart('EmotionWeekly1', {
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
      this.chartMonthly1 = new Chart('EmotionMonthly1', {
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
      this.chartYearly1 = new Chart('EmotionYearly1', {
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
      this.chartWeekly = new Chart('EmotionWeekly', {
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
      this.chartMonthly = new Chart('EmotionMonthly', {
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
      this.chartYearly = new Chart('EmotionYearly', {
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
