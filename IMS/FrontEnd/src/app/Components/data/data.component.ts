import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/Services/Data/data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { User } from 'src/app/Interfaces/Users/user';
import { DataItem } from 'src/app/Interfaces/Data-Items/data-item';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  saleDays: number[] = [];
  saleGames: number[] = [];
  games: string[] = [];
  categorySales: number[] = [];
  employeeSales: User[] = [];
  gameSales: DataItem[] = [];
  consoleSales: DataItem[] = [];
  equipmentSales: DataItem[] = [];
  miscSales: DataItem[] = [];

  totalSales: number;

  chart1: Chart;
  chart2: Chart;
  chart3: Chart;
  chart1Range: string = 'Weekly';
  chart2Range: string = 'Weekly';
  chart3Range: string = 'Weekly';
  canvas1: any; 
  canvas2: any;
  canvas3: any; 
  ctx: any;

  employeeData = new MatTableDataSource<User>();
  userColumns = ['username', 'userSales'];

  gameData = new MatTableDataSource<DataItem>();
  gameColumns = ['upc', 'name', 'unitSold'];

  consoleData = new MatTableDataSource<DataItem>();
  consoleColumns = ['upc', 'name', 'unitSold'];

  equipData = new MatTableDataSource<DataItem>();
  equipColumns = ['upc', 'name', 'unitSold'];

  miscData = new MatTableDataSource<DataItem>();
  miscColumns = ['upc', 'name', 'unitSold'];

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

    this.dataService.getTopEmployees().subscribe((result: User[]) =>{
      for(var i = 0; i < result.length; i++){
        this.employeeSales.push(result[i]);
      }   
      this.employeeData.data = this.employeeSales;
    });

    this.dataService.getAllTimeGames().subscribe((result: DataItem[]) =>{
      console.log(result);
      for(var i = 0; i < result.length; i++){
        this.gameSales.push(result[i]);
      }
      console.log(this.consoleSales);
      this.gameData.data = this.gameSales;
      this.setDefaultSort(this.gameData);
    });
    
    this.dataService.getTopConsoles().subscribe((result: DataItem[]) =>{
      console.log(result);
      for(var i = 0; i < result.length; i++){
        this.consoleSales.push(result[i]);
      }
      console.log(this.consoleSales);
      this.consoleData.data = this.consoleSales;
    });

    this.dataService.getAllTimeEquipment().subscribe((result: DataItem[]) =>{
      console.log(result);
      for(var i = 0; i < result.length; i++){
        this.equipmentSales.push(result[i]);
      }
      console.log(this.consoleSales);
      this.equipData.data = this.equipmentSales;
    });

    this.dataService.getAllTimeMisc().subscribe((result: DataItem[]) =>{
      console.log(result);
      for(var i = 0; i < result.length; i++){
        this.miscSales.push(result[i]);
      }
      this.miscData.data = this.miscSales;
    });
    

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

  ngAfterViewInit(): void {    
    this.employeeData.sort = this.sort;
  }

  addData(chart, data){
    console.log(data);
    chart.data.datasets.foreach((dataset) =>{
      dataset.data.push(data);
    });
    
  }

  updateChart(chart:string, range:string){
      if(chart == this.chart1.data.datasets[0].label){
        this.dataService.getTopDays(range).subscribe((result: number[]) =>{
          this.saleDays = result;
          this.chart1.data.datasets[0].data = this.saleDays;
          this.chart1.update();
          this.chart1Range = range;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gameData.filter = filterValue.trim().toLowerCase();
    this.consoleData.filter = filterValue.trim().toLowerCase();
    this.equipData.filter = filterValue.trim().toLowerCase();
    this.miscData.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort, data: MatTableDataSource<DataItem>){
    if(sort.direction === 'asc'){
      this.sort.sort(({ id: 'sales', start: 'desc'}) as MatSortable);      
    }
    else{
      this.sort.sort(({ id: 'sales', start: 'asc'}) as MatSortable);
    }
    data.sort = this.sort;
  }

  setDefaultSort(data: MatTableDataSource<DataItem>){
    this.sort.sort(({ id: 'sales', start: 'desc'}) as MatSortable);
    data.sort = this.sort;
  }
    
}

  
