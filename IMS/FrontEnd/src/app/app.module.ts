import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuySellComponent } from './Components/buy-sell/buy-sell.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { DataComponent } from './Components/data/data.component';
import { PriceChartingComponent } from './Components/price-charting/price-charting.component';

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
