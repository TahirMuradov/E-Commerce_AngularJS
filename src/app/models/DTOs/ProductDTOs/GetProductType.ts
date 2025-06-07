import { GetSizeForProductType } from "./GetProductDetailtype";

export default interface GetProductType {
  Id: string;
  ProductCode: string;
  Title: string;
  CategoryName: string;
  Price: number;
  Discount: number;
  ImageUrl: string;
  SizeInfo:GetSizeForProductDashboardType[]
}
export interface GetSizeForProductDashboardType {
  size: string;
  stockCount: number;
}