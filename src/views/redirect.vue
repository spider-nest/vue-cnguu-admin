<template>
  <div />
</template>

<script lang="ts">
import { defineComponent, unref } from "vue";
import { useRouter } from "vue-router";

import { isArray } from "/@/utils/is";

export default defineComponent({
  name: "Redirect",
  setup() {
    const { currentRoute, push } = useRouter();

    const { params, query } = unref(currentRoute);
    const { path } = params;

    const _path = isArray(path) ? path.join("/") : path;

    push({
      path: `/${_path}`,
      query,
    });

    return {};
  },
});
</script>
