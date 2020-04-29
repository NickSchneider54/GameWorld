import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BuySellService } from 'src/app/Services/Buy-Sell/buy-sell.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {

  id: string;
  product: Object;

  constructor(private search: BuySellService, public dialogRef: MatDialogRef<EditInventoryComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.id = data.id;
    console.log(this.id);
  }

  close() {
    this.dialogRef.close();
  }

  override(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.search.getProduct(this.id).subscribe((result: object) =>{
      console.log(result);
      this.product = result;
    });
  }

}
