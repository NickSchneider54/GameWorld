import { NgModule } from  '@angular/core';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';  
import {MatMenuModule} from '@angular/material/menu'; 
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatButtonModule} from '@angular/material/button'; 


@NgModule({
    imports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule, 
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule
    ],
    exports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule
    ]
})

export  class  MyMaterialModule { }