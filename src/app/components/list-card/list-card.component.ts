import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {IProduct} from '../../model/types';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit, OnChanges {
  @Input() products: IProduct[];

  pageEvent: PageEvent;
  length: number;
  productsPage:IProduct[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.length = this.products?.length;
      this.productsPage = this.products?.slice(0,this.pageSize);
      this.pageIndex = 0;
    }
  }

  getPaginatorData(event: PageEvent): any {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    this.productsPage = this.products.slice(this.lowValue,this.lowValue+this.pageSize);
  }
}
