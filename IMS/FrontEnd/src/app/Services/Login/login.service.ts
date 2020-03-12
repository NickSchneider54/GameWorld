import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private ping: string;
  private username = new Subject<string>();

  constructor(private http: HttpClient) { }

    getUsers():Observable<Object>{
      this.ping = "http://localhost:8013/GameWorld/IMS/BackEnd/api/users.php";
      return this.http.get(this.ping);
    }

    setUser(username:string){
      this.username.next(username);
    }

    getUser():Observable<string>{
      return this.username.asObservable();
    }
  
}
