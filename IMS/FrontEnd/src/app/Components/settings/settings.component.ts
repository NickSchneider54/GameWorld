import { Component, OnInit } from '@angular/core';


export interface Employee{
  username: string;
  password:string;
  level: number;
  id:number;
  
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // test data
  users: Employee[] =[
    {
      username: 'employee1',
      password: 'password',
      level: 1,
      id:1
      
    },
    {
      username: 'employee2',
      password: 'password',
      level: 2,
      id:2
      
    }
  ]
  constructor() {}
  
 
   

  ngOnInit(): void {
  }

}
