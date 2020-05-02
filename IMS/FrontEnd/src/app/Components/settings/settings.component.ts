import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Interfaces/Employee/employee';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  users: Employee[] = [];
  username: string = "";
  password: string = "";
  level: string = "";

  constructor(private user: LoginService, private update: UserService, private cookies: CookieService, private router: Router) {}
  
  ngOnInit(): void {
    if(this.cookies.get('loggedIn') != 'true'){       
      this.router.navigate(['/login']);
    }
    else{
      this.user.getUsers().subscribe((result: Employee[])=>{
        for(var i = 0; i < result.length; i++){
          this.users[i] = {id: result[i]['userID'], username: result[i]['username'], password: result[i]['password'], level: result[i]['level'], show: true};
        }
        console.log(this.users)
      });
    }
  }

  addEmployee(username, password, level){
    console.log("in function")
    var user = {username: username, password: password, level: level};
    console.log(user);
    this.update.addUser(encodeURIComponent(JSON.stringify(user))).subscribe((result) =>{
      console.log(result);
      alert(result);
    });
  }
  
  updateEmployee(user){
    this.update.updateUser(encodeURIComponent(JSON.stringify(user))).subscribe((result) =>{
      alert(result);
    });
  }

  deleteEmployee(user){

  }

}
