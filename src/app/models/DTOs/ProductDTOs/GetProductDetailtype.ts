import GetProductType from './GetProductType';

export interface GetSizeForProductType {
  id: string;
  size: string;
  stockCount: number;
}

export default interface GetProductDetailType {
  id: string;
  productCode: string;
  title: string;
  description: string;
  categoryName: string;
  price: number;
  discount: number;
  imageUrls: string[];
  sizes: GetSizeForProductType[];
  relatedProducts: GetProductType[];
}
