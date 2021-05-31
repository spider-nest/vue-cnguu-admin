import { createApp } from "vue";
import "virtual:svg-icons-register";

import App from "/@/views/spider.vue";

import { setupStore } from "/@/store";

import { launchAppConfig } from "/@/utils/theme";

// import { iconGlobalization, componentGlobalization } from "/@/components";
import { iconGlobalization } from "/@/components";

import { setupLocale } from "/@/locales";

import router, { setupRouter } from "/@/router";

import "/@/styles/index.less";
if (import.meta.env.DEV) {
  import("ant-design-vue/dist/antd.less");
}

(async () => {
  const app = createApp(App);

  setupStore(app);

  launchAppConfig();

  iconGlobalization(app);
  // componentGlobalization(app);

  await setupLocale(app);

  setupRouter(app);

  await router.isReady();

  app.mount("#spider", true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
