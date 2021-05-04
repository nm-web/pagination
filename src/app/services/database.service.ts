import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IData, IProduct, IProductFilters} from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public apiHost = './assets/data.json';
  products = new BehaviorSubject<IProduct[] | null>(null);
  filtersData = new BehaviorSubject<IProductFilters>({
    artnumber: [],
    name: [],
    brand: []
  });

  constructor(
    private http: HttpClient,
  ) {
    this.loadData();
  }

  createData(products: IProduct[]): IProduct[] {
    for (let i = 1; i < 190; i++) {
      products.push({
        'id': i,
        'artnumber': 'AR' + Math.floor(Math.random() * 60),
        'name': 'Товар' + i,
        'brand': 'Брэнд' + Math.floor(Math.random() * 30),
        'weight': Math.floor(Math.random() * 1000),
        'quantity': Math.floor(Math.random() * 500),
        'price': +(Math.random() * 100).toFixed(2),
        'stock': Math.floor(Math.random() * 2),
      });
    }
    return products;
  }

  loadData(): void {
    this.http.get(this.apiHost)
      .subscribe({
        next: (data: any) => {
          const products = data as IData;
          this.createData(products.products);
          this.filtersData.next(this.createFiltersData(products.products));
          this.products.next(products.products);
        },
        error: (err) => {
          console.log('Невозможно загрузить данные');
        }
      });
  }

  createFiltersData(products: IProduct[]): IProductFilters {
    const artnumber = new Set<string>();
    const name = new Set<string>();
    const brand = new Set<string>();
    const weight = new Set<number>();
    const quantity = new Set<number>()
    const price = new Set<number>()
    products.forEach((el) => {
      artnumber.add(el.artnumber);
      name.add(el.name);
      brand.add(el.brand);
      weight.add(el.weight);
      quantity.add(el.quantity);
      price.add(el.price);

    });
    return {
      artnumber: Array.from(artnumber).sort(),
      name: Array.from(name).sort((a, b) => a <= b ? -1 : 1),
      brand: Array.from(brand).sort((a, b) => a <= b ? -1 : 1),
      weight: Math.max.apply(null,Array.from(weight)),
      quantity: Math.max.apply(null,Array.from(quantity)),
      price: Math.max.apply(null,Array.from(price))
    };
  }


}
