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
  }
}

export interface Statistic {
  date: string;
  data: any;
}
