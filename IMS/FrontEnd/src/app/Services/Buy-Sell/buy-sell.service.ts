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

  createSellTicket(){
    // %5B%7B%22product%22%3A%5B%7B%22productID%22%3A%22885370928518%22%2C%22name%22%3A%22Halo%205%3A%20Guardians%22%2C%22description%22%3A%22Halo's%205th%20installment%20in%20the%20series%22%2C%22price%22%3A19.98%2C%22used%22%3A%220%22%2C%22stock%22%3A%226%22%7D%5D%2C%22qty%22%3A2%7D%2C%7B%22product%22%3A%5B%7B%22productID%22%3A%22047875882188%22%2C%22name%22%3A%22Diablo%20III%20Eternal%20Collection%22%2C%22description%22%3A%22Diablo%20III%20Eternal%20Collection%2C%20Activision%2C%20Xbox%20One%22%2C%22price%22%3A59.98%2C%22used%22%3A%221%22%2C%22stock%22%3A%2212%22%7D%5D%2C%22qty%22%3A2%7D%2C%7B%22product%22%3A%5B%7B%22productID%22%3A%22045496741273%22%2C%22name%22%3A%22Pokemon%20Black%22%2C%22description%22%3A%22pokemon%20game%22%2C%22price%22%3A%2246.95%22%2C%22used%22%3A%220%22%2C%22stock%22%3A%227%22%7D%5D%2C%22qty%22%3A1%7D%5D
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=ticket&f=sell&user=${this.cookies.get('username')}&cart=` + encodeURIComponent(this.cookies.get('shoppingCart'));
    return this.http.get(this.ping);
  }

  createBuyTicket(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=ticket&f=buy&user=${this.cookies.get('username')}&cart=` + encodeURIComponent(this.cookies.get('buyList'));
    return this.http.get(this.ping);
  }
  
  getAuthprizartionCode(){
    this.ping = "http://localhost:8013/GameWorld/IMS/BackEnd/api/users.php"
    return this.http.get(this.ping);
  }

}
