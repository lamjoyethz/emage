import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'dashboard-alternative',
  templateUrl: './dashboard-alternative.component.html',
  styleUrls: ['./dashboard-alternative.component.scss'],
})
export class DashboardAlternativeComponent implements OnInit {
  public chartDaily: any;
  public chartWeekly: any;
  public chartYearly: any;
  public chartMonthly: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
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
            data: ['467', '576', '572', '79', '92', '574', '573'],
            backgroundColor: 'blue',
          },
          {
            label: 'Relationship',
            data: ['542', '542', '536', '327', '17', '0.00', '538'],
            backgroundColor: 'limegreen',
          },
          {
            label: 'Finance',
            data: ['542', '542', '536', '327', '17', '0.00', '538'],
            backgroundColor: 'red',
          },
          {
            label: 'Family',
            data: ['123', '34', '12', '22', '33', '0.00', '538'],
            backgroundColor: 'turquoise',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
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
            data: ['467', '576', '572', '79', '92', '574', '573'],
            backgroundColor: 'blue',
          },
          {
            label: 'Relationship',
            data: ['56', '76', '34', '35', '17', '0.00', '78'],
            backgroundColor: 'limegreen',
          },
          {
            label: 'Finance',
            data: ['23', '65', '89', '78', '17', '56', '45'],
            backgroundColor: 'red',
          },
          {
            label: 'Family',
            data: ['123', '34', '12', '22', '33', '0.00', '538'],
            backgroundColor: 'turquoise',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
    this.chartMonthly = new Chart('EmotionYearly', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: 'Work',
            data: ['29', '32', '90', '35', '46', '32', '57'],
            backgroundColor: 'blue',
          },
          {
            label: 'Relationship',
            data: ['90', '10', '13', '78', '17', '0.00', '33'],
            backgroundColor: 'limegreen',
          },
          {
            label: 'Finance',
            data: ['34', '67', '88', '55', '17', '33', '44'],
            backgroundColor: 'red',
          },
          {
            label: 'Family',
            data: ['45', '34', '12', '22', '33', '0.00', '67'],
            backgroundColor: 'turquoise',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
