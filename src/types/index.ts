export interface ProductApplication {
  brand: string;
  model: string;
  motor: string;
  years: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  line: string;
  description: string;
  sku: string;
  imageUrl: string;
  specifications?: string;
  characteristics?: string;
  applications: ProductApplication[];
}
