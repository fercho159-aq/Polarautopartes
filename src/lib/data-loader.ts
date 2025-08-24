import type { Product, ProductApplication } from '@/types';
import Papa from 'papaparse';

interface CsvProduct {
  id: string;
  name: string;
  brand: string;
  line: string;
  description: string;
  sku: string;
  price: string;
  imageUrl: string;
  oem: string;
  specifications?: string;
  characteristics?: string;
  applications_brand: string;
  applications_model: string;
  applications_motor: string;
  applications_years: string;
}

export async function loadProductsFromCSV(): Promise<Product[]> {
  try {
    // In a real app, this would be an API call. For this demo, we use fetch.
    const response = await fetch('/products.csv');
    const csvText = await response.text();

    const parsed = Papa.parse<CsvProduct>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      console.error("Errors parsing CSV:", parsed.errors);
      return [];
    }

    const productMap = new Map<string, Product>();

    parsed.data.forEach((row) => {
      if (!row.id) return;

      const application: ProductApplication = {
        brand: row.applications_brand,
        model: row.applications_model,
        motor: row.applications_motor,
        years: row.applications_years,
      };

      if (productMap.has(row.id)) {
        productMap.get(row.id)!.applications.push(application);
      } else {
        const product: Product = {
          id: row.id,
          name: row.name,
          brand: row.brand,
          line: row.line,
          description: row.description,
          sku: row.sku,
          price: parseFloat(row.price),
          imageUrl: row.imageUrl,
          oem: row.oem,
          specifications: row.specifications,
          characteristics: row.characteristics,
          applications: [application],
        };
        productMap.set(row.id, product);
      }
    });

    return Array.from(productMap.values());
  } catch (error) {
    console.error("Failed to load or parse products.csv", error);
    return [];
  }
}
