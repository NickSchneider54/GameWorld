import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DataComponent } from './data/data.component';
import { PriceChartingComponent } from './price-charting/price-charting.component';

@NgModule({
  declarations: [
    AppComponent,
    BuySellComponent,
    InventoryComponent,
    DataComponent,
    PriceChartingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
