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

  getGame(game:string, isbn:string, console:string):Observable<Object>{
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/users.php?action=buy&game=${game}&isbn=${isbn}&console=${console}`;
    return this.http.get(this.ping);
  }

}
