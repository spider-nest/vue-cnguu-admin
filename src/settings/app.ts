import type { AppConfig } from "/#/config";

import { CacheTypeEnum } from "/@/enums/cache";
import { MenuTypeEnum, MenuModeEnum } from "/@/enums/menu";
import { primaryColor } from "/@/../build/theme";

const appSetting: AppConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  themeColor: primaryColor,
  grayMode: false,
  colorWeak: false,
  menuSetting: {
    collapsed: false,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  transitionSetting: {
    page: true,
    progress: true,
  },
};

export default appSetting;
