import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  ping: string;

  getTopGames(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=games&range=${range}`;
    return this.http.get(this.ping);
  }

  getTopGameSales(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=gamesales&range=${range}`;
    return this.http.get(this.ping);
  }

  getTopConsoles(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=consoles&range=${range}`;
    return this.http.get(this.ping);
  }

  getTopCategories(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=categories&range=${range}`;
    return this.http.get(this.ping);
  }

  getTopEmployees(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=employees&range=${range}`;
    return this.http.get(this.ping);
  }

  getSales(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=sales&range=${range}`;
    return this.http.get(this.ping);
  }

  getTopDays(range:string){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=data&f=days&range=${range}`;
    return this.http.get(this.ping);
  }

  

}
