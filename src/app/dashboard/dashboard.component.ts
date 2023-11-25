import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  chartDaily: Chart | null = null;
  chartWeekly: Chart | null = null;
  chartYearly: Chart | null = null;
  chartMonthly: Chart | null = null;
  chartWeekly1: Chart | null = null;
  chartMonthly1: Chart | null = null;
  chartYearly1: Chart | null = null;

  statistics: Statistic[] = [];

  relationshipPoint: number[] = [];
  workPoint: number[] = [];
  sportPoint: number[] = [];
  dates: string[] = [];

  layout: boolean = false;
  constructor(private router: Router) {}

  ngOnDestroy() {
    // Destroy the chart instance when the component is destroyed
    if (this.chartWeekly) {
      this.chartDaily?.destroy();
    }
    if (this.chartMonthly) {
      this.chartDaily?.destroy();
    }
    if (this.chartYearly) {
      this.chartDaily?.destroy();
    }

    if (this.chartWeekly1) {
      this.chartWeekly1?.destroy();
    }
    if (this.chartMonthly1) {
      this.chartMonthly1.destroy();
    }
    if (this.chartYearly1) {
      this.chartYearly1.destroy();
    }
  }

  async ngOnInit(): Promise<void> {
    this.layout = localStorage.getItem('layout') === '0' ? false : true;

    let storedUsername = localStorage.getItem('userName');
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

  switchLayout() {}
  createChart() {
    console.log(this.layout);
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
        aspectRatio: 1.5,
      },
    });
  }
}

export interface Statistic {
  date: string;
  data: any;
}
