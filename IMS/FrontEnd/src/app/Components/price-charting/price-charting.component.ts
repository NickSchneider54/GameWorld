import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-price-charting',
  templateUrl: './price-charting.component.html',
  styleUrls: ['./price-charting.component.css']
})
export class PriceChartingComponent implements OnInit {
  name = 'Price Charting iFrame';
  url: string = "https://www.pricecharting.com/";
  urlSafe: SafeResourceUrl;


  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
