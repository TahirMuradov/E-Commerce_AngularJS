

export default interface GetProductType {
  Id: string;
  ProductCode: string;
  Title: string;
  CategoryName: string;
  Price: number;
  Discount: number;
  ImageUrl: string;
  SizeInfo:GetSizeForProductDashboardTableType[]
}
export interface GetSizeForProductDashboardTableType {
  size: string;
  stockCount: number;
}