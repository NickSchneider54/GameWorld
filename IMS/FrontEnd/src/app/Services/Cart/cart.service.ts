import { Injectable } from '@angular/core';
import { Item } from 'src/app/Classes/Cart-Item/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private shoppingCart: Item[] = [];
  private buyList: Item[] = [];

  constructor() { }

  addToCart(item:Item): void{
    console.log(item);
    this.shoppingCart.push(item);
  }

  getShoppingCart(){
    return this.shoppingCart;
  }

  clearCart(): void{
    this.shoppingCart = [];
  }

  addToBuyList(item:Item): void{
    this.buyList.push(item);
  }

  getBuyList(){
    return this.buyList;
  }

  clearBuyList(): void{
    this.buyList = [];
  }

}
