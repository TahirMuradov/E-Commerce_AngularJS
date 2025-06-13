export default interface GetAllHomeDataType {
  disCountAreas: { description: string; title: string }[];
  homeSliderItems: { title: string; description: string; imageUrl: string }[];
  topCategoryAreas: {
    title: string;
    description: string;
    categoryId: string | null;
    pictureUrl: string;
  };
  newArriwalProducts: {
    id: string;
    imageUrls: string;
    price: number;
    disCount: number;
    title: string;
    category: { id: string; categoryName: string };
  };
  IsFeaturedCategorys: { id: string; categoryName: string };
}
