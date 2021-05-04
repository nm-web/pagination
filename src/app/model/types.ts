export interface IProduct {
  id: number;
  artnumber: string;
  name: string;
  brand: string;
  weight: number;
  quantity: number;
  price: number;
  stock: number
}

export interface IData {
  products:IProduct[]
}

export interface IProductFilters {
  artnumber?: string[];
  name?: string[];
  brand?: string[];
  weight?: number;
  quantity?: number;
  price?: number;
  stock?: false;
}


