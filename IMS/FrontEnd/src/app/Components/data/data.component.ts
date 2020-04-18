import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  saleDays: number[] = [];
  saleGames: number[] = [];
  games: string[] = [];
  categorySales: number[] = [];

  totalSales: number;

  chart1;
  chart2;
  chart3;
  chart1Range: string = 'Weekly';
  chart2Range: string = 'Weekly';
  chart3Range: string = 'Weekly';
  canvas1: any; 
  canvas2: any;
  canvas3: any; 
  ctx: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTopDays(this.chart1Range).subscribe((result: number[]) =>{
      this.saleDays = result;
      this.chart1.data.datasets[0].data = this.saleDays;
      this.chart1.update();
      console.log(this.saleDays);
    });

    this.dataService.getTopGames(this.chart2Range).subscribe((result: any[]) =>{
      this.games = result;
      this.chart2.data.labels = this.games;
      this.chart2.update();
    });

    this.dataService.getTopGameSales(this.chart2Range).subscribe((result: any[]) =>{
      this.saleGames = result;
      this.chart2.data.datasets[0].data = this.saleGames;
      this.chart2.update();
    });

    this.dataService.getTopCategories(this.chart3Range).subscribe((result: any[]) =>{
      console.log(result);
      this.categorySales = result;
      this.chart3.data.datasets[0].data = this.categorySales;
      this.chart3.update();
      console.log(this.categorySales);
    });

    this.dataService.getSales('Monthly').subscribe((result: any) =>{
      this.totalSales = Number(Math.round(+(result + 'e' + 2)) + 'e-' + 2);
    })

    // Top Sales Days
    this.canvas1 = document.getElementById('chart1');
    this.ctx = this.canvas1.getContext('2d');
    this.chart1 = new Chart(this.ctx,{
      type:'line',
      data:{
        labels: ["Mon","Tue","Wed", "Th", "Fri", "Sat", "Sun"],
        datasets:[{
          label: 'Daily Sales',
          data: [1,2,3,4,5,6,7]
        }]      
        },
        options: {
          responsive: false,
          scales:{
            yAxes: [{
              ticks:{
                max: 10,
                min: 0,
                stepSize: 1
              }
            }]
          }
      }
    })

    // Top Selling Items
    this.canvas2 = document.getElementById('chart2');
    this.ctx = this.canvas2.getContext('2d');
    this.chart2 = new Chart(this.ctx,{
      type:'bar',
      data:{
        labels: ["1","2","3"],
        datasets:[{
          label: 'Top Selling Games',
          data: [1,2,3,4,5]
        }]      
        },
        options: {
          responsive: false,
          scales:{
            yAxes: [{
              ticks:{
                max: 10,
                min: 0,
                stepSize: 1
              }
            }]
          }
      }
    })  

    // Top selling Categories
    this.canvas3 = document.getElementById('chart3');
    this.ctx = this.canvas3.getContext('2d');
    this.chart3 = new Chart(this.ctx,{
      type:'doughnut',
      data:{
        labels: ["Games","Consoles","Equipment","Misc."],
        datasets:[{
          label: 'Sales by Category',
          data: [1,2,3,4]
        }]      
        },
        options: {
          responsive: false,}
    })
  }  

  addData(chart, data){
    console.log(data);
    chart.data.datasets.foreach((dataset) =>{
      dataset.data.push(data);
    });
    
  }

  updateChart(chart:string, range:string){
    console.log('in function');
      if(chart == this.chart1.data.datasets[0].label){
        this.dataService.getTopDays(range).subscribe((result: number[]) =>{
          this.saleDays = result;
          this.chart1.data.datasets[0].data = this.saleDays;
          this.chart1.update();
          this.chart1Range = range;
          console.log('update');
        });
      }
      else if(chart == this.chart2.data.datasets[0].label){
        this.dataService.getTopGames(range).subscribe((result: any[]) =>{
          this.games = result;
          this.chart2.data.labels = this.games;
          this.chart2.update();
        });
        this.dataService.getTopGameSales(range).subscribe((result: number[]) =>{
          this.saleGames = result;
          this.chart2.data.datasets[0].data = this.saleGames;
          this.chart2.update();
          this.chart2Range = range;
        });
      }
      else if(chart == this.chart3.data.datasets[0].label){
        this.dataService.getTopCategories(range).subscribe((result: number[]) =>{
          this.categorySales = result;
          this.chart3.data.datasets[0].data = this.categorySales;
          this.chart3.update();
          this.chart3Range = range;
        });
      }
  }

  catWeekly(){

  }
    
}

  
