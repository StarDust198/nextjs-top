import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions =
  | { type: 'sort'; payload: SortEnum.rating }
  | { type: 'sort'; payload: SortEnum.price }
  | { type: 'updateProducts'; payload: ProductModel[] };

export interface sortState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (
  state: sortState,
  action: SortActions
): sortState => {
  switch (action.type) {
    case 'sort':
      return {
        sort: action.payload,
        products: state.products.sort((a, b) => {
          switch (action.payload) {
            case SortEnum.price:
              return a.price > b.price ? -1 : 1;
            case SortEnum.rating:
              return a.initialRating > b.initialRating ? -1 : 1;
            default:
              throw new Error('Неверный тип сортировки');
          }
        }),
      };
    case 'updateProducts':
      return {
        sort: SortEnum.rating,
        products: action.payload.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };
    default:
      throw new Error('Неправильное изменение состояния');
  }
};
