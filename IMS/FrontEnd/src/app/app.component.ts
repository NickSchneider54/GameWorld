import { Component } from '@angular/core';
import { SearchService } from './Services/Search/search.service';
import { LoginService } from './Services/Login/login.service';
import { Router } from '@angular/router';
import { BuySellComponent } from './Components/buy-sell/buy-sell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string = "Username";
  title = 'FrontEnd';
  loggedIn: boolean = false;
  searchItem: string; // holds the search/filter constraint entered by the user
  
  constructor(private search: SearchService, private userLogin: LoginService){}

  // sends the search constraint inputted by the user to the SearchService
  sendSearch(searchItem: string): void{
    this.search.sendSearch(searchItem);
  }
  
  // waits for the login event to occur and sets loggedIn to True
  onActivate(componentReference:BuySellComponent): void{
    componentReference.loggedIn.subscribe((data:boolean)=>{
      console.log(data);
      this.loggedIn = data;
      this.userLogin.getUser().subscribe(user =>{
        this.username = user;
      })
    });
  }

}
