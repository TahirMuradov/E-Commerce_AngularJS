import CategoryType from "./CategoryType";
import SizeType from "./SizeType";
import { mockCategories } from "./CategoryType";
import { mockSizes } from "./SizeType";
export default interface ProductType{
id:string,
title:string,
description:string,
imgUrls:string[],
category:CategoryType,
sizes:SizeType[]

}
export const mockProducts: ProductType[] = [
    {
      id: 'prod-1',
      title: 'Classic Denim Jacket',
      description: 'Vintage-style denim jacket with distressed details.',
      imgUrls: ['public/img/product-img/product-1.jpg', 'public/img/product-img/product-2.jpg'],
      category: mockCategories[0], // Clothing
      sizes: [mockSizes[0], mockSizes[1], mockSizes[2]], // XS, S, M
    },
    {
      id: 'prod-2',
      title: 'Leather Sneakers',
      description: 'Premium leather sneakers with cushioned soles.',
      imgUrls: ['public/img/product-img/product-3.jpg'],
      category: mockCategories[1], // Footwear
      sizes: [mockSizes[5], mockSizes[6]], // 39, 40
    },
    {
      id: 'prod-3',
      title: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones.',
      imgUrls: ['public/img/product-img/product-4.jpg', 'public/img/product-img/product-5.jpg'],
      category: mockCategories[3], // Electronics
      sizes: [], // No sizes (electronics)
    },
    {
      id: 'prod-4',
      title: 'Cotton T-Shirt',
      description: 'Breathable 100% cotton tee.',
      imgUrls: ['public/img/product-img/product-6.jpg'],
      category: mockCategories[0], // Clothing
      sizes: [mockSizes[1], mockSizes[2], mockSizes[3]], // S, M, L
    },
    {
      id: 'prod-5',
      title: 'Silk Scarf',
      description: 'Handmade silk scarf with floral print.',
      imgUrls: ['public/img/product-img/product-7.jpg'],
      category: mockCategories[2], // Accessories
      sizes: [], // One-size
    },
    {
      id: 'prod-6',
      title: 'Running Shoes',
      description: 'Lightweight shoes for marathon training.',
      imgUrls: ['public/img/product-img/product-8.jpg', 'public/img/product-img/product-9.jpg'],
      category: mockCategories[1], // Footwear
      sizes: [mockSizes[6], mockSizes[7]], // 40, 41
    },
    {
      id: 'prod-7',
      title: 'Wool Sweater',
      description: 'Knit sweater for winter warmth.',
      imgUrls: ['public/img/product-img/product-10.jpg'],
      category: mockCategories[0], // Clothing
      sizes: [mockSizes[2], mockSizes[3], mockSizes[4]], // M, L, XL
    },
    {
      id: 'prod-8',
      title: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor.',
      imgUrls: ['public/img/product-img/product-11.jpg'],
      category: mockCategories[3], // Electronics
      sizes: [], // No sizes
    },
    {
      id: 'prod-9',
      title: 'Canvas Backpack',
      description: 'Durable backpack with laptop compartment.',
      imgUrls: ['public/img/product-img/product-12.jpg'],
      category: mockCategories[2], // Accessories
      sizes: [], // One-size
    },
    {
      id: 'prod-10',
      title: 'Formal Trousers',
      description: 'Slim-fit trousers for office wear.',
      imgUrls: ['public/img/product-img/product-1.jpg'], // Reusing image
      category: mockCategories[0], // Clothing
      sizes: [mockSizes[3], mockSizes[4]], // L, XL
    },
  ];