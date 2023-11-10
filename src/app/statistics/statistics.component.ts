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
  statistics: Statistic[] = [];

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('userName');

    // acc username work on json
    const pathStatistic =
      'assets/Backend/' +
      storedUsername +
      '/statistics/' +
      storedUsername +
      '.json';

    console.log(pathStatistic);

    fetch(pathStatistic)
      .then((response) => response.json())
      .then((jsonData) => {
        this.statistics = jsonData;
        console.log(jsonData);
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

    const last7Days = this.statistics.slice(0, 7);
    console.log('create chart ', last7Days);

    const dateset = this.statistics.map((x) => x.date);

    console.log(dateset);
    this.chartWeekly = new Chart('EmotionWeekly', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
        ],
        datasets: [
          {
            label: 'Work',
            data: ['99', '12', '35', '56', '92', '12', '13'],
            backgroundColor: '#FA7070',
          },
          {
            label: 'Relationship',
            data: ['34', '35', '1', '90', '17', '0.00', '78'],
            backgroundColor: '#F3B664',
          },
          {
            label: 'Finance',
            data: ['35', '89', '77', '44', '17', '0.00', '23'],
            backgroundColor: '#F1EB90',
          },
          {
            label: 'Family',
            data: ['08', '34', '12', '22', '33', '0.00', '45'],
            backgroundColor: '#9FBB73',
          },
        ],
      },
      options: {
        aspectRatio: 1.2,
      },
    });
    this.chartMonthly = new Chart('EmotionMonthly', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Work',
            data: ['99', '12', '35', '56', '92', '12', '13'],
            backgroundColor: '#FA7070',
          },
          {
            label: 'Relationship',
            data: ['56', '76', '34', '35', '17', '0.00', '78'],
            backgroundColor: '#F3B664',
          },
          {
            label: 'Finance',
            data: ['23', '65', '89', '78', '17', '56', '45'],
            backgroundColor: '#F1EB90',
          },
          {
            label: 'Family',
            data: ['13', '34', '12', '22', '33', '0.00', '56'],
            backgroundColor: '#9FBB73',
          },
        ],
      },
      options: {
        aspectRatio: 1.2,
      },
    });
    this.chartYearly = new Chart('EmotionYearly', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
          {
            label: 'Work',
            data: ['99', '12', '35', '56', '92', '12', '13'],
            backgroundColor: '#FA7070',
          },
          {
            label: 'Relationship',
            data: ['56', '76', '34', '35', '17', '0.00', '78'],
            backgroundColor: '#F3B664',
          },
          {
            label: 'Finance',
            data: ['23', '65', '89', '78', '17', '56', '45'],
            backgroundColor: '#F1EB90',
          },
          {
            label: 'Family',
            data: ['13', '34', '12', '22', '33', '0.00', '56'],
            backgroundColor: '#9FBB73',
          },
        ],
      },
      options: {
        aspectRatio: 1.2,
      },
    });
  }
}
export interface Statistic {
  date: string;
  data: any;
}
