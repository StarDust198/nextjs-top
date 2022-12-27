import { MenuItem } from '../../interfaces/menu.interface';

export interface BasePageComponentProps extends Record<string, unknown> {
  menu: MenuItem[];
}
