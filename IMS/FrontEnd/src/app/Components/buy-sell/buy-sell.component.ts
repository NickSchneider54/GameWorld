import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { BuySellService } from 'src/app/Services/Buy-Sell/buy-sell.service';
import { Game } from 'src/app/Classes/Game/game';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { Item } from 'src/app/Classes/Cart-Item/item';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {

  currentTab: string = "Sell";
  name: string = "";
  upc: string = "";
  console: string = "";
  shoppingCart: Item[] = [];
  buyList: Item[] = [];
  subTotal: number = 0.00;
  salesTax: number = 0.00;
  cartTotal: number = 0.00;

  cartSell: string;
  cartBuy: string;
  
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private search: BuySellService, private cart: CartService, private router: Router, private cookies: CookieService) { }

  ngOnInit() {
    if(this.cookies.get('loggedIn') != 'true'){       
      this.router.navigate(['/login']);
    }
  }

  tabClick(tab){    
    this.currentTab = tab.tab.textLabel;
    console.log(this.currentTab);
    this.updateCart();
    this.upc = "";
  }

  addItemToCart(upc:string): void{
    this.search.getProduct(upc).subscribe((result: object) =>{
      if(this.currentTab === "Sell"){
        this.cart.addToCart(new Item(result));
      }
      if(this.currentTab === "Buy"){
        this.cart.addToBuyList(new Item(result));
      }
      this.updateCart();
    })    
    this.upc = "";
  }

  removeItemFromCart(name:string){
    if(this.currentTab == "Sell"){
      for(var i = 0; i < this.shoppingCart.length; i++){
        if(this.shoppingCart[i].product[0].name === name){
          this.shoppingCart.splice(i, 1);
          break;
        }
      }
    }
    else if(this.currentTab == "Buy"){
      for(var i = 0; i < this.buyList.length; i++){
        if(this.buyList[i].product[0].name === name){
          this.buyList.splice(i, 1);
          break;
        }
      }
    }
    this.updateCart();
  }

  updateCart(): void{
    this.subTotal = 0;
    this.salesTax = 0;
    this.cartTotal = 0;
    if(this.currentTab == "Sell"){
      this.shoppingCart = this.cart.getShoppingCart();
      console.log(this.shoppingCart);
      for(var i = 0; i < this.shoppingCart.length; i++){
        this.subTotal += parseFloat(this.shoppingCart[i].product[0].price);
        console.log(this.subTotal);
        this.salesTax = this.getSalesTax(this.subTotal);
        this.cartTotal = this.getCartTotal(this.subTotal, this.salesTax);
      }
      this.subTotal = this.round(this.subTotal);
      this.cookies.set('shoppingCart', JSON.stringify(this.shoppingCart));
      this.cartSell = this.cookies.get('shoppingCart');
    }

    if(this.currentTab == "Buy"){
      this.buyList = this.cart.getBuyList();
      for(var i = 0; i < this.buyList.length; i++){
        this.subTotal += parseFloat(this.buyList[i].product[0].price);
        this.salesTax = this.getSalesTax(this.subTotal);
        this.cartTotal = this.getCartTotal(this.subTotal, this.salesTax);
      }
      this.subTotal = this.round(this.subTotal);
      this.cookies.set('buyList', JSON.stringify(this.buyList));
      this.cartBuy = this.cookies.get("buyList");
    }
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

  completePurchase(){
    if(this.currentTab == 'Sell'){
      this.search.createSellTicket().subscribe(result=>{
        
      });   
      this.cart.clearCart(); 
      this.updateCart();   
      alert("Order Complete");
    }
    else if(this.currentTab == 'Buy'){
      this.search.createBuyTicket();
      this.cart.clearCart();
      this.updateCart();
    }
  }  

}
