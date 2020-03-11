import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {
  
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private userLogin: LoginService) { }

  ngOnInit() {
    this.userLogin.getUser().subscribe(user=>{
      console.log(user);
      if(user != undefined){
        this.loggedIn.emit(true);
      }
    })
  }

}
