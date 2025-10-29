
import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bomba de Agua Auxiliar',
    brand: 'KG',
    line: 'Bomba de Agua',
    description: 'Bomba de Agua Auxiliar para varios modelos de Audi y Volkswagen.',
    sku: 'KGPA-1040',
    imageUrl: '/Images/10.png',
    specifications: 'Especificación de ejemplo',
    characteristics: 'Característica de ejemplo',
    applications: [
      { brand: 'Audi', model: 'A3', motor: 'L4 2.0L', years: '2006 - 2007' },
      { brand: 'Audi', model: 'A4 Quattro', motor: 'V6 3.2L', years: '2009 - 2009' },
      { brand: 'Audi', model: 'A5 Quattro', motor: 'V6 3.2L', years: '2008 - 2008' },
      { brand: 'Volkswagen', model: 'GTI', motor: 'L4 2.0L', years: '2007 - 2008' },
      { brand: 'Volkswagen', model: 'Jetta', motor: 'L4 2.0L', years: '2006 - 2008' },
      { brand: 'Volkswagen', model: 'Passat', motor: 'L4 2.0L', years: '2006 - 2008' },
    ],
  },
  {
    id: '2',
    name: 'Balatas Delanteras',
    brand: 'Brembo',
    line: 'Frenos',
    description: 'Juego de balatas cerámicas para Volkswagen Jetta.',
    sku: 'BR-FD-002',
    imageUrl: '/Images/10.png',
    applications: [
        { brand: 'Volkswagen', model: 'Jetta', motor: 'L4 2.0L', years: '2020 - 2022' },
        { brand: 'Volkswagen', model: 'Golf', motor: 'L4 1.4L', years: '2019 - 2021' },
    ]
  },
  {
    id: '3',
    name: 'Bujía de Iridio',
    brand: 'NGK',
    line: 'Motor',
    description: 'Bujía de iridio de larga duración para Nissan Sentra.',
    sku: 'NGK-BI-003',
    imageUrl: '/Images/10.png',
     applications: [
        { brand: 'Nissan', model: 'Sentra', motor: 'L4 1.8L', years: '2017 - 2019' },
     ]
  },
  {
    id: '4',
    name: 'Amortiguador Trasero',
    brand: 'Monroe',
    line: 'Suspensión',
    description: 'Amortiguador de gas para Honda Civic.',
    sku: 'MON-AT-004',
    imageUrl: '/Images/10.png',
    applications: [
        { brand: 'Honda', model: 'Civic', motor: 'L4 1.5T', years: '2020 - 2021' },
    ]
  },
    {
    id: '5',
    name: 'Batería de Coche',
    brand: 'LTH',
    line: 'Eléctrico',
    description: 'Batería de 12V para Nissan Versa.',
    sku: 'LTH-BC-005',
    imageUrl: '/Images/10.png',
    applications: [
        { brand: 'Nissan', model: 'Versa', motor: 'L4 1.6L', years: '2021 - 2023' },
    ]
  },
  {
    id: '6',
    name: 'Limpiaparabrisas',
    brand: 'Bosch',
    line: 'Accesorios',
    description: 'Juego de limpiaparabrisas para VW Tiguan.',
    sku: 'BOS-LP-006',
    imageUrl: '/Images/10.png',
    applications: [
        { brand: 'Volkswagen', model: 'Tiguan', motor: 'L4 2.0T', years: '2021 - 2022' },
    ]
  },
    {
    id: '7',
    name: 'Filtro de Aire',
    brand: 'Gonher',
    line: 'Filtros',
    description: 'Filtro de aire de alto flujo para Ford Mustang.',
    sku: 'GON-FA-007',
    imageUrl: '',
    applications: [
        { brand: 'Ford', model: 'Mustang', motor: 'V8 5.0L', years: '2020 - 2021' },
    ]
  },
  {
    id: '8',
    name: 'Radiador',
    brand: 'Valeo',
    line: 'Enfriamiento',
    description: 'Radiador de aluminio para Mazda CX-5.',
    sku: 'VAL-RD-008',
    imageUrl: '/Images/10.png',
    applications: [
        { brand: 'Mazda', model: 'CX-5', motor: 'L4 2.5L', years: '2017 - 2018' },
    ]
  },
];

export const vehicleData = [
  {
    brand: 'Acdelco',
    models: [
      { name: 'Aveo', years: [2020, 2019, 2018] },
      { name: 'Spark', years: [2021, 2020] },
    ],
  },
  {
    brand: 'Brembo',
    models: [
        { name: 'Jetta', years: [2022, 2021, 2020] },
        { name: 'Golf', years: [2021, 2019] }
    ],
  },
  {
    brand: 'NGK',
    models: [
        { name: 'Sentra', years: [2019, 2018] },
        { name: 'March', years: [2020, 2019] }
    ],
  },
    {
    brand: 'Monroe',
    models: [
        { name: 'Civic', years: [2021, 2020] },
        { name: 'Accord', years: [2022, 2021] }
    ],
  },
    {
    brand: 'LTH',
    models: [
        { name: 'Versa', years: [2023, 2022] },
        { name: 'Kicks', years: [2021, 2020] }
    ],
  },
    {
    brand: 'Bosch',
    models: [
        { name: 'Tiguan', years: [2022, 2021] },
        { name: 'Vento', years: [2020, 2019] }
    ],
  },
  {
    brand: 'Gonher',
    models: [
        { name: 'Mustang', years: [2021, 2020] },
        { name: 'Lobo', years: [2022, 2021] }
    ],
  },
  {
    brand: 'Valeo',
    models: [
        { name: 'CX-5', years: [2018, 2017] },
        { name: 'Mazda 3', years: [2020, 2019] }
    ],
  },
  {
    brand: 'Audi',
    models: [
        { name: 'A3', years: [2007, 2006] },
        { name: 'A4 Quattro', years: [2009] },
        { name: 'A5 Quattro', years: [2008] },
    ],
  },
  {
    brand: 'Volkswagen',
    models: [
        { name: 'GTI', years: [2008, 2007] },
        { name: 'Jetta', years: [2022, 2021, 2020, 2008, 2007, 2006] },
        { name: 'Passat', years: [2008, 2007, 2006] },
        { name: 'Golf', years: [2021, 2019] },
        { name: 'Tiguan', years: [2022, 2021] },
        { name: 'Vento', years: [2020, 2019] }
    ],
  },
  {
    brand: 'Nissan',
    models: [
      { name: 'Sentra', years: [2019, 2018, 2017] },
      { name: 'Versa', years: [2023, 2022, 2021] },
      { name: 'Kicks', years: [2021, 2020] },
      { name: 'March', years: [2020, 2019] },
    ]
  },
  {
    brand: 'Honda',
    models: [
      { name: 'Civic', years: [2021, 2020] },
      { name: 'Accord', years: [2022, 2021] },
    ]
  },
  {
    brand: 'Ford',
    models: [
      { name: 'Mustang', years: [2021, 2020] },
      { name: 'Lobo', years: [2022, 2021] },
    ]
  },
  {
    brand: 'Mazda',
    models: [
      { name: 'CX-5', years: [2018, 2017] },
      { name: 'Mazda 3', years: [2020, 2019] },
    ]
  }
];
