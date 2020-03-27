import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { BuySellService } from 'src/app/Services/Buy-Sell/buy-sell.service';
import { Game } from 'src/app/Classes/Game/game';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { Item } from 'src/app/Classes/Cart-Item/item';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {

  name: string = "";
  isbn: string = "";
  console: string = "";
  
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private userLogin: LoginService, private search: BuySellService, private cart: CartService, private router: Router) { }

  ngOnInit() {
    this.userLogin.getUser().subscribe(user=>{
      console.log(user);
      if(user != undefined){
        this.loggedIn.emit(true);
      }
      else{
        this.router.navigate(['/login']);
      }
    })
  }

  addItemToCart(name:string, isbn:string, console:string): void{
    this.search.getGame(name, isbn, console).subscribe((result: object) =>{
      this.cart.addToCart(new Item(result, 1));
    })    
  }

}
