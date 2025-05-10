import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange, MatSliderModule } from '@angular/material/slider';
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
  valueRange = [50, 60];

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
    debugger;
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
    debugger;
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

  handlePriceChange(event: any) {
    const sliderValue = event.value;

    // Use the value as needed (e.g., update a signal)

  }
}
