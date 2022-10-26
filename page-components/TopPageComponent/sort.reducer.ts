import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions = { type: SortEnum.rating } | { type: SortEnum.price };

export interface sortState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (
  state: sortState,
  action: SortActions
): sortState => {
  switch (action.type) {
    case SortEnum.rating: {
      return {
        sort: SortEnum.rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };
    }
    case SortEnum.price: {
      return {
        sort: SortEnum.price,
        products: state.products.sort((a, b) => (a.price > b.price ? -1 : 1)),
      };
    }
    default:
      throw new Error('Неверный тип сортировки');
  }
};
