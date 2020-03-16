import { NgModule } from  '@angular/core';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';  
import {MatMenuModule} from '@angular/material/menu'; 
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
    imports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule, 
    MatCardModule,
    MatSidenavModule,
    MatListModule
    ],
    exports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule
    ]
})

export  class  MyMaterialModule { }