import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MyMaterialModule} from './Modules/material.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OverrideAuthorizationComponent } from './Components/shared/override-authorization/override-authorization.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditInventoryComponent } from './Components/shared/edit-inventory/edit-inventory.component';




@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    InventoryComponent,
    OverrideAuthorizationComponent,
    EditInventoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
