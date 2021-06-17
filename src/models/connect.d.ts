import { UserType } from './user';
import { MenuType } from './menu';

export interface ConnectState {
  userInfo: UserType;
  isShowDetailMenu: MenuType;
}
