import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuySellComponent } from './Components/buy-sell/buy-sell.component';
import { DataComponent } from './Components/data/data.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { PriceChartingComponent } from './Components/price-charting/price-charting.component';
import {LoginComponent } from './Components/login/login.component';


const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "buy-sell", component: BuySellComponent },
  { path: "data", component: DataComponent },
  { path: "inventory", component: InventoryComponent },
  { path: "price-charting", component: PriceChartingComponent },
  { path: "login", component: LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [BuySellComponent, DataComponent, InventoryComponent, PriceChartingComponent, LoginComponent];
