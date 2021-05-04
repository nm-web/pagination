import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {IProduct, IProductFilters} from '../../model/types';
import {DatabaseService} from '../../services/database.service';
import {SubSet} from '../../services/subset';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  products: IProduct[];
  private subs = new SubSet();
  currentFilters = {
    artnumber: null,
    name: null,
    brand: null,
    weight: null,
    quantity: null,
    price:null,
    stock: false,
  };
  resetFilters = new Subject();
  filteredProducts: IProduct[];
  filtersData: IProductFilters;
  thumbLabel = true;
  valueWeight: number = 0;
  valueQuantity: number = 0;
  valuePrice: number = 0;

  constructor(
    private databaseService: DatabaseService,
  ) {
  }

  ngOnInit(): void {
    this.subs.add = this.databaseService.products.pipe(filter(data => !!data)).subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = [...this.products];
      }
    });

    this.subs.add = this.databaseService.filtersData.pipe(filter(data => !!data)).subscribe({
      next: data => {
        data.artnumber.unshift('Все артикулы');
        data.name.unshift('Все товары');
        data.brand.unshift('Все брэнды');
        this.filtersData = data;
      }
    });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  filterProducts(event: { value: any; index: number }, field: string): void {
    if (event.index === 0) {
      this.currentFilters[field] = null;
    } else {
      this.currentFilters[field] = event.value;
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(item => {
      if (this.currentFilters.artnumber && item.artnumber !== this.currentFilters.artnumber) {
        return false;
      }
      if (this.currentFilters.name && item.name !== this.currentFilters.name) {
        return false;
      }
      if (this.currentFilters.brand && item.brand !== this.currentFilters.brand) {
        return false;
      }
      if (this.currentFilters.stock && !!item.stock !== this.currentFilters.stock) {
        return false;
      }
      if (this.currentFilters.weight && item.weight >= this.currentFilters.weight) {
        return false;
      }
      if (this.currentFilters.quantity && item.quantity >= this.currentFilters.quantity) {
        return false;
      }
      if (this.currentFilters.price && item.price >= this.currentFilters.price) {
        return false;
      }
      return true;
    });
  }


  removeAllFilters(): void {
    this.filteredProducts = this.products;
    this.currentFilters = {
      artnumber: null,
      name: null,
      brand: null,
      weight: null,
      quantity:null,
      price:null,
      stock: false
    };
    this.valueWeight = 0;
    this.valueQuantity = 0;
    this.valuePrice = 0;
    this.resetFilters.next(true);
  }

}
