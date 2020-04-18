import { Component, OnInit } from '@angular/core';


export interface Employee{
  username: string;
  password:string;
  level: number;
  id:number;
  show:boolean;
  
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  //todo: save updated employee to database
  updateEmployee(username:string,password:string,level:number ){
  }
  
  //todo: get employee data from database
  
  // test data
  users: Employee[] =[
    {
      username: 'employee1',
      password: 'password',
      level: 1,
      id:1,
      show:false
      
    },
    {
      username: 'employee2',
      password: 'password',
      level: 2,
      id:2,
      show:false
      
    }
  ]
  constructor() {}
  
 
   

  ngOnInit(): void {
  }

}
