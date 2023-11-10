import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartDaily: any;
  public chartWeekly: any;
  public chartYearly: any;
  public chartMonthly: any;
  layout: Boolean = false;
  ngOnInit(): void {
    const storedLayout = localStorage.getItem('layout');
    console.log("You're at " + storedLayout);
    this.layout = storedLayout == '1' ? false : true;
    this.createChart();
  }
  switchLayout() {}
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
        maintainAspectRatio: false,
      },
    });
  }
}
