import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private ping: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

    getUsers():Observable<Object>{
      this.ping = "http://localhost:8013/GameWorld/IMS/BackEnd/api/users.php";
      return this.http.get(this.ping);
    }

    setUser(username:string){
      this.cookieService.set('username', username);
      this.setLoginState('true');
    }

    setLevel(level:string){
      this.cookieService.set('level', level);
    }

    setLoginState(state:string){      
      this.cookieService.set('loggedIn', state);
    }

    logout(){
      this.setLoginState('false');
      this.router.navigate(['/login']);
    }
  
}
