
enum AvailabilityStatus {
  InStock = "In Stock",
  OutOfStock = "Out of Stock",
  Backordered = "Backordered"
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductMeta {
  barcode: string;
  createdAt: string; // ISO date string
  qrCode: string;
  updatedAt: string; // ISO date string
}

interface ProductDimensions {
  depth: number;
  height: number;
  width: number;
}

export default interface Product {
  availabilityStatus: AvailabilityStatus | string;
  brand: string;
  category: string;
  description: string;
  dimensions: ProductDimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: ProductMeta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}