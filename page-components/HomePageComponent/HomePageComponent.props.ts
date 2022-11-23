import { MenuItem } from '../../interfaces/menu.interface';

export interface HomePageComponentProps extends Record<string, unknown> {
  menu: MenuItem[];
}
