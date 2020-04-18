import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  ping: string;

  constructor(private http: HttpClient) { }

  getInventory(){
    this.ping = `http://localhost:8013/GameWorld/IMS/BackEnd/api/test.php?action=inventory`;
    return this.http.get(this.ping);
  }

}
