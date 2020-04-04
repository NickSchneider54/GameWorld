import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Login/login.service';
import { User } from 'src/app/Classes/User/user';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users: User[] = [];
  public username: string;
  public password: string;

  constructor(private userLogin: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userLogin.getUsers().subscribe((result: any[])=>{
      console.log(result);
      for(var i =0; i < result.length; i++){
        this.users.push(new User(result[i].username, result[i].password, result[i].level));
      }
      console.log(this.users);
    })
  }

  login(username:string, password:string){
    console.log(username + ", " + password);
    console.log(this.users.length);
    for(var i = 0; i < this.users.length; i++){
      if(username == this.users[i].username && password == this.users[i].password){
        this.userLogin.setUser(this.username);
        this.userLogin.setLevel(this.users[i].level);
        this.router.navigate(['/buy-sell']);
      }
    }
  }

}
