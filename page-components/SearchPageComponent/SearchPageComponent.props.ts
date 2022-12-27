import { TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface SearchPageComponentProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  products: ProductModel[];
}
