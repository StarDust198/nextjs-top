import { SortEnum } from '../components/Sort/Sort.props';
import { ProductModel } from '../interfaces/product.interface';

export type SortActions =
  | { type: 'sort'; payload: SortEnum.rating }
  | { type: 'sort'; payload: SortEnum.price }
  | { type: 'changeDirection' }
  | { type: 'updateProducts'; payload: ProductModel[] };

export interface sortState {
  sort: SortEnum;
  direction: 'up' | 'down';
  products: ProductModel[];
}

// const sortProducts = (products: ProductModel[]) => {
// };

export const sortReducer = (
  state: sortState,
  action: SortActions
): sortState => {
  switch (action.type) {
    case 'sort':
      return {
        sort: action.payload,
        direction: state.direction,
        products: state.products.sort((a, b) => {
          switch (action.payload) {
            case SortEnum.price:
              if (state.direction === 'up') return a.price > b.price ? -1 : 1;
              else return a.price < b.price ? -1 : 1;
            case SortEnum.rating:
              if (state.direction === 'up')
                return a.initialRating > b.initialRating ? -1 : 1;
              else return a.initialRating < b.initialRating ? -1 : 1;
            default:
              throw new Error('Неверный тип сортировки');
          }
        }),
      };
    case 'changeDirection':
      return {
        ...state,
        direction: state.direction === 'up' ? 'down' : 'up',
        products: state.products.sort((a, b) => {
          switch (state.sort) {
            case SortEnum.price:
              if (state.direction === 'down') return a.price > b.price ? -1 : 1;
              else return a.price < b.price ? -1 : 1;
            case SortEnum.rating:
              if (state.direction === 'down')
                return a.initialRating > b.initialRating ? -1 : 1;
              else return a.initialRating < b.initialRating ? -1 : 1;
            default:
              throw new Error('Неверный тип сортировки');
          }
        }),
      };
    case 'updateProducts':
      return {
        sort: SortEnum.rating,
        direction: 'up',
        products: action.payload.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };
    default:
      throw new Error('Неправильное изменение состояния');
  }
};
