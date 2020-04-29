import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { InventoryService } from 'src/app/Services/Inventory/inventory.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OverrideAuthorizationComponent } from '../shared/override-authorization/override-authorization.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EditInventoryComponent } from '../shared/edit-inventory/edit-inventory.component';
// import { InventoryItem } from 'src/app/Classes/Inventory-Item/inventory-item';
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  used: number;
  stock: number;
}

export interface DialogData {
  name: string;
  description: string;
  price: number;
  used: number;
  stock: number;
}

// TODO: replace this with real data from the API call. Also TODO: create api call.
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends DataSource<InventoryItem> implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<InventoryItem>;
  dataSource = new MatTableDataSource<InventoryItem>();

  private INVENTORY: InventoryItem[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'price', 'used', 'stock', 'action'];
  
  constructor(private cookies: CookieService, private router: Router, private inv: InventoryService, public dialog: MatDialog) {
    super();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    /*
      Grabs all items in current Inventory and sets dataSource 
    */
    if(this.cookies.get('loggedIn') != 'true'){       
      this.router.navigate(['/login']);
    }
    this.inv.getInventory().subscribe((result: InventoryItem[]) =>{
      for(var i = 0; i < result.length; i++){
        this.INVENTORY.push({id: result[i]['productID'], name: result[i]['name'], description: result[i]['description'], price : Number(result[i]['price']), used: Number(result[i]['used']), stock: Number(result[i]['stock'])});        
      }
      this.dataSource.data = this.INVENTORY;
    });   

    console.log(this.INVENTORY)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

   /*
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InventoryItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.dataSource.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.dataSource.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InventoryItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InventoryItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'used': return compare(+a.used, +b.used, isAsc);
        case 'stock': return compare(+a.stock, +b.stock, isAsc);
        default: return 0;
      }
    });
  }

  openDialog(id): void {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      id: 1,
      data: id
    };
  
    this.dialog.open(EditInventoryComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(EditInventoryComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe( data =>{
      console.log("Dialog output:", data);

    });     
  }


}




// @Component({
//   selector: 'edit-dialog',
//   templateUrl: 'edit-dialog.html',
// })
// export class EditDialog {

//   constructor(
//     public dialogRef: MatDialogRef<EditDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
  
//   openDialog() {
//     this.dialog.open(EditDialog);
//   }

// }

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
