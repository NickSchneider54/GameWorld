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
  shoppingCart: Item[] = [];
  subTotal: number = 0.00;
  salesTax: number = 0.00;
  cartTotal: number = 0.00;
  
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private userLogin: LoginService, private search: BuySellService, private cart: CartService, private router: Router) { }

  ngOnInit() {
    this.updateCart();
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
      this.updateCart();
    })    
  }

  updateCart(): void{
    this.subTotal = 0;
    this.salesTax = 0;
    this.cartTotal = 0;
    this.shoppingCart = this.cart.getShoppingCart();
    console.log(this.shoppingCart);
    for(var i = 0; i < this.shoppingCart.length; i++){
      this.subTotal += parseFloat(this.shoppingCart[i].product[0].price);
      console.log(this.subTotal);
      this.salesTax = this.getSalesTax(this.subTotal);
      this.cartTotal = this.getCartTotal(this.subTotal, this.salesTax);
    }
    this.subTotal = this.round(this.subTotal);
  }

  getSalesTax(total:number): number{
    return this.round(total * .0748);
  }

  getCartTotal(subTotal:number, salesTax:number): number{
    return this.round(subTotal + salesTax)
  }

  round(total:number): number{
    return Number(Math.round(+(total + 'e' + 2)) + 'e-' + 2);
  }

}
