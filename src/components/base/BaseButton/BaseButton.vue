<template>
  <button 
    :class="state.buttonClasses"
    :disabled="tmDisabled"
    :type="tmType"
    v-on:click="$emit('clicked')">
      <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, reactive, computed } from '@vue/composition-api';

export default createComponent({
  name: 'BaseButton',
  props: {
    tmDisabled: Boolean,
    tmType: {
      type: String,
      default: 'button',
    },
  },
  setup(props, {emit}) {
    const buildButtonClasses = () => {
      const buttonClassArray: string[] = [];
      return buttonClassArray.join(' ');
    };

    const state = reactive({
      buttonClasses: computed(() => buildButtonClasses()),
    });

    return {
       state,
    };
  },
});
</script>

<style lang="scss">
.base-button {
  padding: 0.5em;
  min-height: 2.8em;
  display:flex; 
  align-content: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;

  &:active {
    transform: translateY(2px);
  }

  &--primary {
    background-color: $btn-primary-color;
    color: $white;
      
    &:hover,
    &:focus {
      background-color: darken($btn-primary-color, 5%); 
    }
  }

  &--link {
    color: $btn-primary-color; 
    text-decoration: underline;
    &:focus {
      outline: 1px solid $btn-primary-color;
    }
  }
}
</style>