import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  canvas1: any; 
  canvas2: any;
  canvas3: any; 
  ctx: any;
  constructor() { }
  ngOnInit() {
    this.canvas1 = document.getElementById('chart1');
    this.ctx = this.canvas1.getContext('2d');
    let chart1 = new Chart(this.ctx,{
      type:'line',
      data:{
        labels: ["1","2","3"],
        datasets:[{
          label: 'label',
          data: [1,2,3,4,5]
        }]      
        },
        options: {
          responsive: false,
      }
    })
    this.canvas2 = document.getElementById('chart2');
    this.ctx = this.canvas2.getContext('2d');
    let chart2 = new Chart(this.ctx,{
      type:'bar',
      data:{
        labels: ["1","2","3"],
        datasets:[{
          label: 'label',
          data: [1,2,3,4,5]
        }]      
        },
        options: {
          responsive: false,
      }
    })  
  this.canvas3 = document.getElementById('chart3');
  this.ctx = this.canvas3.getContext('2d');
  let chart3 = new Chart(this.ctx,{
    type:'doughnut',
    data:{
      labels: ["1","2","3"],
      datasets:[{
        label: 'label',
        data: [1,2,3,4,5]
      }]      
      },
      options: {
        responsive: false,}
  }
  )
}
    
}

  
