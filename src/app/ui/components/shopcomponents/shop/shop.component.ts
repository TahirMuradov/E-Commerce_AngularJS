import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange, MatSliderDragEvent, MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import CategoryType, {
  mockCategories,
} from '../../../../models/ui/CategoryType';
import SizeType, { mockSizes } from '../../../../models/ui/SizeType';
import { mockProductsCart } from '../../../../models/ui/ProductCartType';
import { ProductcartComponent } from '../../productcart/productcart.component';
import ProductCartType from '../../../../models/ui/ProductCartType';
import { CommonModule } from '@angular/common';
import ProductFilter from '../../../../models/ui/ProductFilter';



@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    ProductcartComponent,
    MatSliderModule,
    MatCheckboxModule,
  
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
    effect((onCleanup) => {
      const filter = this.signalFilter();
      if (!filter) return; // Skip initial null

      console.log(filter);
    });
  }

  signalProducts = signal<ProductCartType[] | null>(null);
  signalCtegories = signal<CategoryType[] | null>(null);
  signalSizes = signal<SizeType[] | null>(null);

  signalPage = signal<number>(1);
  signalFilter = signal<ProductFilter | null>(
    {
      categoryIds: [],
      sizeIds: [],
      page: 1,
      minPrice: 0,
      maxPrice: 500
    }
  );

handlePage(event:any){
console.log(event)
}
  tryParse(input: string): [boolean, number | null] {
    const parsed = Number(input);
    if (isNaN(parsed)) {
      return [false, null];
    }
    return [true, parsed];
  }
  ngOnInit(): void {
    this.signalProducts.set(mockProductsCart);
    this.signalCtegories.set(mockCategories);
    this.signalSizes.set(mockSizes);
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const queryPage: string = params['page'];
        const [isConvert, value] = this.tryParse(queryPage);
        if (isConvert && value > 0) {
          this.signalPage.set(value);
        } else this.signalPage.set(1);
      },
    });
  }
  onCategoryCheck(id: string) {

    const selectedCategory = this.signalCtegories()?.find(
      (category) => category.id === id
    );
    if (!selectedCategory) return;

    const filter = this.signalFilter();

    const isAllCategory = selectedCategory.categoryName.toLowerCase() === 'all';

    if (isAllCategory) {
      this.signalFilter.update((x) => ({
        ...x!,
        categoryIds: [id],
      }));
    } else {
      const currentIds = filter?.categoryIds?.filter((cid) => {
        const cat = this.signalCtegories()?.find((c) => c.id === cid);
        return cat?.categoryName.toLowerCase() !== 'all';
      });

      const isAlreadySelected = currentIds?.includes(id);

      const updatedIds = isAlreadySelected
        ? currentIds?.filter((cid) => cid !== id)
        : [...currentIds, id];

      this.signalFilter?.update((x) => ({
        ...x!,
        categoryIds: updatedIds,
      }));
    }
  }

  onSizeCheck(id: string) {

    const selectedSize = this.signalSizes()?.find((size) => size.id === id);
    if (!selectedSize) return;

    const filter = this.signalFilter();
    const isAllSize = selectedSize.content.toLowerCase() === 'all';

    if (isAllSize) {
      this.signalFilter.update((x) => ({
        ...x!,
        sizeIds: [id],
      }));
    } else {
      const currentIds =
        filter?.sizeIds?.filter((sid) => {
          const size = this.signalSizes()?.find((s) => s.id === sid);
          return size?.content.toLowerCase() !== 'all';
        });

      const isAlreadySelected = currentIds?.includes(id);

      const updatedIds = isAlreadySelected
        ? currentIds?.filter((sid) => sid !== id)
        : [...currentIds, id];

      this.signalFilter.update((x) => ({
        ...x!,
        sizeIds: updatedIds,
      }));
    }
  }
  formatLabel(value: number | null): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value.toString();
  }

  handleMinPriceChange(event: MatSliderDragEvent) {
    let minPriceValue = event.value;

    if (minPriceValue < 0)
      minPriceValue = 0
    this.signalFilter.update((x) => ({
      ...x!,
      minPrice: minPriceValue,
    }))

  }
  handleMaxPriceChange(event: MatSliderDragEvent) {
    let maxPrice = event.value
  
    if (maxPrice < 0) {
      maxPrice = 0
    }
    this.signalFilter.update((x) => ({
      ...x!,
      maxPrice: maxPrice,
    }))
  }
}
