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

  username: string = "";
  title = 'FrontEnd';
  loggedIn: boolean = false;
  searchItem: string; // holds the search/filter constraint entered by the user
  showFiller: boolean = false;
  
  constructor(private search: SearchService, private userLogin: LoginService, private router: Router){}

  ngOnInit(){
    this.userLogin.getUser().subscribe(user =>{
      this.username = user;      

      if(this.username === ""){
        this.router.navigate(["/login"]);
      }
      else{
        this.loggedIn = true;
        console.log("logged in");
      }
    })

  }

  // sends the search constraint inputted by the user to the SearchService
  sendSearch(searchItem: string): void{
    this.search.sendSearch(searchItem);
  }


  logout(){
    this.username = "";
    this.router.navigate(['/login']);
  }

  
  

}
