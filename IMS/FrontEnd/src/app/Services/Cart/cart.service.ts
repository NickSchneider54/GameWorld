import { Injectable } from '@angular/core';
import { Item } from 'src/app/Classes/Cart-Item/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private shoppingCart: Item[];

  constructor() { }

  addToCart(item:Item): void{
    this.shoppingCart.push(item);
  }

  getShoppingCart(){
    return this.shoppingCart;
  }

  clearCart(){
    this.shoppingCart = [];
  }

}
