import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label,Color } from 'ng2-charts';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  amountUsers: number;

  public doughnutChartColors: Color[] = [
    {backgroundColor:["#9E120E","#FF5800","#FFB414"]},
    {backgroundColor:["#9E120E","#FF5800","#FFB414"]},
    {backgroundColor:["#9E120E","#FF5800","#FFB414"]}
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
       {
           display: true,
           ticks: {
             fontSize: 14
           }
       }
       
     ],
     xAxes: [
      {
          display: true,
          ticks: {
            fontSize: 12
          }
      }
      
    ]
     
   },
   
  };
  barChartLabels: Label[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData1: ChartDataSets[] = [
    { data: [7, 7.8, 6, 5, 4.6, 0, 0], label: 'Doanh thu (trăm triệu)' },
  ];

  barChartOptions1: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
       {
           display: true,
           ticks: {
             fontSize: 14
           }
       }
     ]
   }
  };
  barChartLabels1: Label[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartPlugins1 = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#fb2324bf' },
    { backgroundColor: 'green' },
  ]
  

  barChartData: ChartDataSets[] = [
    { data: [9333, 9800, 6000, 5821, 2500, 0, 0], label: 'Số lượng vé bán' },
  ];

  constructor(private user : AccountService) { }

  ngOnInit(): void {
    this.getAmountUser();
  }
  getAmountUser(){
    this.user.listUserFull().subscribe(data => {
      this.amountUsers = data.length;
      
    })
  }

}
