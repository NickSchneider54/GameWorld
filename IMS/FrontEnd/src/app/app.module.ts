import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { BuySellComponent } from './Components/buy-sell/buy-sell.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { DataComponent } from './Components/data/data.component';
import { PriceChartingComponent } from './Components/price-charting/price-charting.component';
=======
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
