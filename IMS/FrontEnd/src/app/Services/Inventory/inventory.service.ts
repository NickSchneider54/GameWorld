import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  ping: string;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  getInventory(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=inventory`;
    return this.http.get(this.ping);
  }

  updateInventoryItem(){    
    // %7B%22id%22%3A%22025001458612%22%2C%22name%22%3A%22Nintendo%20DS%22%2C%22description%22%3A%22Nintendo%20Hand-held%20device%20%22%2C%22price%22%3A49.99%2C%22used%22%3A%22No%22%2C%22stock%22%3A7%7D
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=update&product=${encodeURIComponent(this.cookies.get('editedProduct'))}`;
    return this.http.get(this.ping);
  }

}
