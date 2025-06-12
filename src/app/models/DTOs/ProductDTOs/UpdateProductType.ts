export default interface UpdateProductType {
  id: string;
  productCode: string;
  title: { [key: string]: string };
  description: { [key: string]: string };

  //key is size id,value is stock quantity Size
  sizes: { [key: string]: number };
  categoryId: string;
  productNewImages: File[];
  productOldImagesPath: string[];
  isFeatured: boolean;
}
