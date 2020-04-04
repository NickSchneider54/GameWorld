import { Injectable } from '@angular/core';
import { Game } from 'src/app/Classes/Game/game';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuySellService {

  private ping: string;

  constructor(private http: HttpClient) { }

  getProduct(upc:string):Observable<Object>{
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/search.php?action=sell&upc=${upc}`;
    return this.http.get(this.ping);
  }

  createSellTicket(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/search.php?action=ticket`;
  }

  createBuyTicket(){
    
  }

}
