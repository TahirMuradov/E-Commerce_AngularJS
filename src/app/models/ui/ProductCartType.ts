export default interface ProductCartType{
    id:string,
    imgUrl:string,
    category:string,
    price:number,
    title:string,
  
}
export const mockProductsCart:ProductCartType[]= [
    {
      id: 'prod-001',
      imgUrl: 'img/product-img/product-1.jpg',
      category: 'Cocktail Dresses',
      price: 39.90,
      title: 'Blue Denim Midi Cocktail Dress'
    },
    {
      id: 'prod-002',
      imgUrl: 'img/product-img/product-2.jpg',
      category: 'Footwear',
      price: 59.99,
      title: 'Classic White Leather Sneakers'
    },
    {
      id: 'prod-003',
      imgUrl: 'img/product-img/product-3.jpg',
      category: 'Outerwear',
      price: 129.95,
      title: 'Waterproof Winter Parka Jacket'
    },
    {
      id: 'prod-004',
      imgUrl: 'img/product-img/product-4.jpg',
      category: 'Accessories',
      price: 199.00,
      title: 'Pro Fitness Smart Watch'
    },
    {
      id: 'prod-005',
      imgUrl: 'img/product-img/product-5.jpg',
      category: 'Tops',
      price: 34.50,
      title: 'Premium Linen Button-Up Shirt'
    },
    {
      id: 'prod-006',
      imgUrl: 'img/product-img/product-6.jpg',
      category: 'Home',
      price: 79.99,
      title: 'Luxury Wool Throw Blanket'
    },
    {
      id: 'prod-007',
      imgUrl: 'img/product-img/product-7.jpg',
      category: 'Bags',
      price: 89.95,
      title: 'Urban Commuter Backpack'
    },
    {
      id: 'prod-008',
      imgUrl: 'img/product-img/product-8.jpg',
      category: 'Activewear',
      price: 45.00,
      title: 'High-Waist Yoga Leggings'
    },
    {
      id: 'prod-009',
      imgUrl: 'img/product-img/product-9.jpg',
      category: 'Kitchen',
      price: 18.75,
      title: 'Artisan Ceramic Coffee Mug'
    },
    {
      id: 'prod-010',
      imgUrl: 'img/product-img/product-10.jpg',
      category: 'Accessories',
      price: 49.99,
      title: 'Minimalist Leather Wallet'
    }
  ];