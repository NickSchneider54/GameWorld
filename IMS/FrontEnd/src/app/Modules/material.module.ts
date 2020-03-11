import { NgModule } from  '@angular/core';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';  
import {MatMenuModule} from '@angular/material/menu'; 
import {MatCardModule} from '@angular/material/card';


@NgModule({
    imports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule, 
    MatCardModule   
    ],
    exports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule
    ]
})

export  class  MyMaterialModule { }