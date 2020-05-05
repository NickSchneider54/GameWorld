import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BuySellService } from 'src/app/Services/Buy-Sell/buy-sell.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { Item } from 'src/app/Classes/Cart-Item/item';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OverrideAuthorizationComponent } from '../dialogs/override-authorization/override-authorization.component';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit, AfterViewInit {

  currentTab: string = "Sales";
  name: string = "";
  upc: string = "";
  price: string = "";
  shoppingCart: Item[] = [];
  buyList: Item[] = [];
  subTotal: number = 0.00;
  salesTax: number = 0.00;
  cartTotal: number = 0.00;

  cartSell: string;
  cartBuy: string;
  authorization: boolean;
  
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private search: BuySellService, private cart: CartService, private router: Router, private cookies: CookieService, public dialog: MatDialog) { }

  ngOnInit() {
    this.savedCarts();
    if(this.cookies.get('loggedIn') != 'true'){       
      this.router.navigate(['/login']);
    }
   }

  ngAfterViewInit(){
    var input = document.querySelector('input');
    input.addEventListener('change', this.getProduct);
  }

  tabClick(tab){    
    this.currentTab = tab.tab.textLabel;
    console.log(this.currentTab);
    this.updateCart();
    this.upc = "";
    if(this.currentTab == 'Purchases'){
      var submit = document.getElementById('upc'); 
      submit.addEventListener("keydown", function(event){
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("getProdBtn").click();
        }
      });
    }
  }

  clearProduct(){
    this.upc = "";
    this.name = "";
    this.price = "";
  }

  getProduct(){
    this.search.getProduct(this.upc).subscribe((result: object) =>{
      console.log(result);
      this.name = result[0].name;
      this.price = result[0].price;
      console.log(this.name);
      console.log(this.price);
    }) 
  }

  addItemToCart(upc:string): void{
    this.search.getProduct(upc).subscribe((result: object) =>{
      if(this.currentTab === "Sales"){
        this.cart.addToCart(new Item(result));
      }
      if(this.currentTab === "Purchases"){
        var item = new Item(result);
        if(item.product[0].price != this.price){
          item.product[0].price = this.price;
        }
        console.log(item)
        this.cart.addToBuyList(item);
      }
      this.updateCart();
    })
  }

  removeItemFromCart(name:string){
    if(this.currentTab == "Sales"){
      for(var i = 0; i < this.shoppingCart.length; i++){
        if(this.shoppingCart[i].product[0].name === name){
          this.shoppingCart.splice(i, 1);
          break;
        }
      }
    }
    else if(this.currentTab == "Purchases"){
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
    if(this.currentTab == "Sales"){
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

    if(this.currentTab == "Purchases"){
      this.buyList = this.cart.getBuyList();
      for(var i = 0; i < this.buyList.length; i++){
        this.cartTotal += parseFloat(this.buyList[i].product[0].price);
      }
      this.subTotal = this.round(this.subTotal);
      this.cookies.set('buyList', JSON.stringify(this.buyList));
      this.cartBuy = this.cookies.get("buyList");
    }        
    this.upc = "";
    this.name = "";
    this.price = "";
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
    if(this.currentTab == 'Sales'){
      this.search.createSellTicket().subscribe(result=>{
        
      });   
      this.cart.clearCart(); 
      this.updateCart();   
      alert("Order Complete");
    }
    else if(this.currentTab == 'Purchases'){
      if(this.cookies.get("level") == "master" || this.authorization == true){
        this.search.createBuyTicket().subscribe(result=>{});   
        this.cart.clearBuyList();
        this.updateCart();
        alert("Order Complete");
      }
      else{
        this.openDialog();
      }
    }
  } 
  
  savedCarts(){
    if(!this.cookies.get("shoppingCart") && !this.cookies.get("buyList")){
      this.cookies.set("shoppingCart", JSON.stringify(this.shoppingCart));
      this.cookies.set("buyList", JSON.stringify(this.buyList));
    }
    this.cart.setShoppingCart();
    this.cart.setBuyList();
    this.updateCart();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      data: this.authorization
    };
    
    const dialogRef = this.dialog.open(OverrideAuthorizationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( data =>{
      console.log("Dialog output:", data);
      
      this.search.getAuthprizartionCode().subscribe((result: any[]) =>{
        for(var i = 0; i < result.length; i++){
          if(data == result[i].password){
            this.authorization = true;
          }
        }
        this.completePurchase();
      });

    });     
  }

}
