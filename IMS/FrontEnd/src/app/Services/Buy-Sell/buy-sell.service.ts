import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BuySellService {

  private ping: string;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  getProduct(upc:string):Observable<Object>{
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=sell&upc=${upc}`;
    return this.http.get(this.ping);
  }
//%5B%7B%22product%22%3A%5B%7B%22productID%22%3A%22045496590420%22%2C%22name%22%3A%22Zelda%20Breath%20of%20the%20Wild%22%2C%22description%22%3A%22Zelda%20game%22%2C%22price%22%3A%2249.99%22%2C%22used%22%3A%220%22%2C%22stock%22%3A%227%22%7D%5D%7D%2C%7B%22product%22%3A%5B%7B%22productID%22%3A%22711719506133%22%2C%22name%22%3A%22God%20of%20War%22%2C%22description%22%3A%22Newest%20installment%20of%20the%20God%20of%20War%20series%22%2C%22price%22%3A%2219.99%22%2C%22used%22%3A%220%22%2C%22stock%22%3A%228%22%7D%5D%7D%5D
  createSellTicket(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=ticket&f=sell&user=${this.cookies.get('username')}&cart=` + encodeURIComponent(this.cookies.get('shoppingCart'));
    return this.http.get(this.ping);
  }

  createBuyTicket(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=ticket&f=buy&user=${this.cookies.get('username')}&cart=` + encodeURIComponent(this.cookies.get('buyList'));
    return this.http.get(this.ping);
  }

}
