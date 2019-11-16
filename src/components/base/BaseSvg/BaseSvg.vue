<template>
  <svg :class="state.svgClasses"><use :xlink:href="state.xlink"></use></svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, ref, reactive, computed, onMounted, toRefs, watch, Ref } from '@vue/composition-api';
export default createComponent({
  name: 'BaseSvg',
  props: {
    svgId: String,
    tmClasses: String,
  },
  setup(props) {
    const buildSvgClasses = () => {
      const svgClassArray: string [] = [];
      svgClassArray.push('icon');
      svgClassArray.push(`icon-${props.svgId}`);
      if (props.tmClasses !== undefined) {
        svgClassArray.push(props.tmClasses);
      }
      return svgClassArray.join(' ');
    };

    const state = reactive({
      svgClasses: computed(() => buildSvgClasses()),
      xlink: computed(() => `#icon-${props.svgId}`),
    });

    return {
      state,
    };
  },
});
</script>