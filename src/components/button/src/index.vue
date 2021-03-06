<template>
  <AButton v-bind="binds" :class="classes">
    <slot name="icon" />
    <slot />
  </AButton>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Button as AButton } from "ant-design-vue";

import { useStyles } from "/@/hooks/useStyles";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SButton",
  components: { AButton },
  inheritAttrs: false,
  props: {
    disabled: PropTypes.bool.def(false),
    ghost: PropTypes.bool.def(false),
    htmlType: PropTypes.oneOf(["submit", "button", "reset"]).def("button"),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).def(false),
    shape: PropTypes.oneOf(["circle", "circle-outline", "round"]),
    size: PropTypes.oneOf(["large", "default", "small"]).def("default"),
    type: PropTypes.oneOf([
      "default",
      "primary",
      "ghost",
      "dashed",
      "danger",
      "link",
    ]).def("default"),
    block: PropTypes.bool.def(false),

    linkType: PropTypes.oneOf([
      "info",
      "default",
      "minor",
      "success",
      "warning",
      "danger",
    ]).def("info"),
  },
  setup(props, { attrs }) {
    const { prefixCls } = useStyles("btn");
    const classes = computed(() => {
      const { type, linkType } = props;
      return {
        [prefixCls]: true,
        [`${prefixCls}-success`]: type === "success",
        [`${prefixCls}-warning`]: type === "warning",
        [`${prefixCls}-info`]: type === "info",
        [`${prefixCls}-link-${linkType}`]: type === "link",
      };
    });

    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds, classes };
  },
});
</script>

<style lang="less">
@spider-btn-prefix-cls: ~"@{spider-prefix}-btn";
@ant-btn-prefix-cls: ~"@{ant-prefix}-btn";

@btn-success-color: #ffffff;
@btn-success-bg: @success-color;

@btn-warning-color: #ffffff;
@btn-warning-bg: @warning-color;

@btn-info-color: #ffffff;
@btn-info-bg: @info-color;

.button-color(@color; @background; @border) {
  color: @color;
  background-color: @background;
  border-color: @border;

  > a:only-child {
    color: currentColor;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: "";
    }
  }
}

.button-disabled(@color: @btn-disable-color; @background: @btn-disable-bg; @border: @btn-disable-border) {
  &-disabled,
  &.disabled,
  &[disabled] {
    &,
    &:hover,
    &:focus,
    &:active,
    &.active {
      .button-color(@color; @background; @border);

      text-shadow: none;
      box-shadow: none;
    }
  }
}

.button-variant(@color; @background) {
  .button-color(@color; @background; @background);

  text-shadow: @btn-text-shadow;
  box-shadow: @btn-primary-shadow;

  &:hover,
  &:focus {
    .button-color(
      @color; ~`colorPalette("@{background}", 5) `; ~`colorPalette("@{background}", 5) `
    );
  }

  &:active,
  &.active {
    .button-color(
      @color; ~`colorPalette("@{background}", 7) `; ~`colorPalette("@{background}", 7) `
    );
  }

  .button-disabled();
}

.button-group-variant(@color) {
  .ant-btn-group {
    &:not(:first-child):not(:last-child) {
      border-right-color: @color;
      border-left-color: @color;

      &:disabled {
        border-color: @btn-default-border;
      }
    }

    &:first-child {
      &:not(:last-child) {
        border-right-color: @color;

        &[disabled] {
          border-right-color: @btn-default-border;
        }
      }
    }
  }

  .ant-btn-group &:last-child:not(:first-child),
  .ant-btn-group & + & {
    border-left-color: @color;

    &[disabled] {
      border-left-color: @btn-default-border;
    }
  }
}

.button-link-color(@color) {
  color: @color;

  > a:only-child {
    color: currentColor;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: "";
    }
  }
}

.button-link-disabled(@color: @btn-disable-color) {
  &-disabled,
  &.disabled,
  &[disabled] {
    &,
    &:hover,
    &:focus,
    &:active,
    &.active {
      .button-link-color(@color);

      text-shadow: none;
      box-shadow: none;
    }
  }
}

.button-variant-link(@color) {
  color: @color;

  &:hover,
  &:focus {
    .button-link-color(~`colorPalette("@{color}", 5) `);
  }

  &:active,
  &.active {
    .button-link-color(~`colorPalette("@{color}", 7) `);
  }

  .button-link-disabled();
}

.@{spider-btn-prefix-cls},
a.@{spider-btn-prefix-cls},
.@{ant-btn-prefix-cls},
a.@{ant-btn-prefix-cls} {
  // success button
  &-success {
    .button-variant(@btn-success-color; @btn-success-bg);
    .button-group-variant(@success-5);
  }

  // warning button
  &-warning {
    .button-variant(@btn-warning-color; @btn-warning-bg);
    .button-group-variant(@warning-5);
  }

  // info button
  &-info {
    .button-variant(@btn-info-color; @btn-info-bg);
    .button-group-variant(@primary-5);
  }

  // link button
  &-link {
    &-default {
      .button-variant-link(@text-color);
    }

    &-minor {
      .button-variant-link(@text-color-secondary);
    }

    &-success {
      .button-variant-link(@success-color);
    }

    &-warning {
      .button-variant-link(@warning-color);
    }

    &-info {
      .button-variant-link(@info-color);
    }

    &-danger {
      .button-variant-link(@error-color);
    }
  }
}
</style>
