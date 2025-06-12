import GetProductType from './GetProductType';

export interface GetSizeForProductType {
  id: string;
  size: string;
  stockCount: number;
}

export default interface GetProductForUpdateType {
  id: string;
  productCode: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  categoryId: string;
  isFeature: boolean;
  price: number;
  discount: number;
  imageUrls: string[];
  sizes: GetSizeForProductType[];
  relatedProducts: GetProductType[];
}
