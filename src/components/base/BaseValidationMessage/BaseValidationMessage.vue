<template>
  <span :class="state.containerClasses">
    <base-svg :tm-classes="state.svgClasses" :svg-id="state.svgId"/> 
    <span :class="state.textClasses"><slot /></span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, reactive, computed } from '@vue/composition-api';
import { text } from '@storybook/addon-knobs';
import BaseSvg from '@/components/base/BaseSvg/BaseSvg.vue';

export default createComponent({
  name: 'BaseValidationMessage',
  components: {
    BaseSvg,
  },
  props: {
    tmSuccess: Boolean,
    tmErrored: Boolean,
  },
  setup(props, {emit}) {
    const buildSvgClasses = () => {
      const svgClassArray: string[] = [];
      svgClassArray.push('base-validation-message__icon');
      return svgClassArray.join(' ');
    };

    const determineSvgId = () => {
      if (props.tmErrored === true) {
        return 'warning';
      }

      if (props.tmSuccess === true) {
        return 'checkmark';
      }

      return 'notification';
    };

    const buildTextClasses = () => {
      const textClassArray: string[] = [];
      textClassArray.push('base-validation-message__text');
      return textClassArray.join(' ');
    };

    const buildContainerClasses = () => {
      const containerClassArray: string[] = [];
      containerClassArray.push('base-validation-message');
      if (props.tmSuccess) {
        containerClassArray.push('base-validation-message--success');
      }
      if (props.tmErrored) {
        containerClassArray.push('base-validation-message--errored');
      }
      return containerClassArray.join(' ');
    };
    const state = reactive({
      containerClasses: computed(() => buildContainerClasses()),
      svgClasses: computed(() => buildSvgClasses()),
      textClasses: computed(() => buildTextClasses()),
      svgId: computed(() => determineSvgId()),
    });

    return {
       state,
    };
  },
});
</script>

<style lang="scss">
.base-validation-message {
  display: flex;
  align-items: center;
  &--errored {
    color: $error-color;
  }
  &--success {
    color: $success-color;
  }
  &__icon {
    flex: 0 0 auto; 
    margin-right: .5em;
    height: 0.8em;
    width: 0.8em;
  }
  &__text {
    flex: 1 1 auto;
  }
}
</style>