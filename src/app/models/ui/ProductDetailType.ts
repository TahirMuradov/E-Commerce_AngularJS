import ProductCartType from "./ProductCartType"

export default interface ProductDetailType{
    id:string,
    productCode:string,
    title:string,
    description:string,
    price:number,
    category:string,
    imgUrls:string[],
    size:{key:string,value:string}[]//key is size id,value is size content
    relatedProducts:ProductCartType[]

}
 
export const Data: ProductDetailType[] = [
    {
        id: 'prod-001',
        productCode: 'PD001',
        title: 'Blue Denim Midi Cocktail Dress',
        description: 'Stylish blue denim cocktail dress perfect for evening occasions',
        price: 39.90,
        category: 'Cocktail Dresses',
        imgUrls: ['img/product-img/product-1.jpg', 'img/product-img/product-3.jpg'],
        size: [
            {key: 's', value: 'Small'},
            {key: 'm', value: 'Medium'},
            {key: 'l', value: 'Large'}
        ],
        relatedProducts: [
            {
                id: 'prod-011',
                imgUrl: 'img/product-img/product-11.jpg',
                category: 'Cocktail Dresses',
                price: 45.99,
                title: 'Black Velvet Cocktail Dress'
            }
        ]
    },
    {
        id: 'prod-002',
        productCode: 'PD002',
        title: 'Classic White Leather Sneakers',
        description: 'Comfortable white leather sneakers for everyday wear',
        price: 59.99,
        category: 'Footwear',
        imgUrls: ['img/product-img/product-2.jpg'],
        size: [
            {key: '36', value: 'EU 36'},
            {key: '38', value: 'EU 38'},
            {key: '40', value: 'EU 40'}
        ],
        relatedProducts: []
    },
    {
        id: 'prod-003',
        productCode: 'PD003',
        title: 'Waterproof Winter Parka Jacket',
        description: 'Warm and waterproof parka for extreme winter conditions',
        price: 129.95,
        category: 'Outerwear',
        imgUrls: ['img/product-img/product-3.jpg', 'img/product-img/product-3-alt.jpg'],
        size: [
            {key: 'xs', value: 'X-Small'},
            {key: 's', value: 'Small'},
            {key: 'm', value: 'Medium'},
            {key: 'l', value: 'Large'}
        ],
        relatedProducts: [
            {
                id: 'prod-012',
                imgUrl: 'img/product-img/product-12.jpg',
                category: 'Outerwear',
                price: 99.99,
                title: 'Lightweight Windbreaker'
            }
        ]
    },
    // Additional products with all required fields...
];