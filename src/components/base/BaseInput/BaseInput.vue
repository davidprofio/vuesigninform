<template>
  <div class="base-input">
    <label :for="tmId" :class="state.labelClasses"><slot></slot></label>
    <input
      :disabled="tmDisabled"
      :id="tmId"
      :class="state.inputClasses"
      :type="tmType"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, reactive, computed } from '@vue/composition-api';

export default createComponent({
  name: 'BaseInput',
  props: {
    tmId: String,
    value: [String, Number],
    tmDisabled: Boolean,
    tmErrored: Boolean,
    tmSuccess: Boolean,
    tmType: {
      type: String,
      default: 'text',
    },
  },
  setup(props, {emit}) {
    const buildInputClasses = () => {
      const inputClassArray: string[] = [];
      inputClassArray.push('base-input__input');
      if (props.tmErrored) {
        inputClassArray.push('base-input__input--errored');
      }
      if (props.tmSuccess) {
        inputClassArray.push('base-input__input--success');
      }
      return inputClassArray.join(' ');
    };

    const buildLabelClasses = () => {
      const labelClassArray: string[] = [];
      labelClassArray.push('base-input__label');
      if (props.tmErrored) {
        labelClassArray.push('base-input__label--errored');
      }
      return labelClassArray.join(' ');
    };

    const state = reactive({
      labelClasses: computed(() => buildLabelClasses()),
      inputClasses: computed(() => buildInputClasses()),
    });

    return {
       state,
    };
  },
});
</script>

<style lang="scss">
.base-input {
  &__label {
    display: inline-block; 
    margin-bottom: 0.3125em;
    font-weight: 500;
  }
  &__input {
    display: block; 
    width: 100%;
    font-size: 0.9em;
    min-height: 1.4em;
    padding: 0.2em 0.4em;
    border: 1px solid $font-secondary-color;
    color: $font-primary-color;
    &:focus {
      outline: 0;
      box-shadow: 0 0 5px $font-secondary-color;
    }
    &--errored {
      border-color: $error-color;
      &:focus{
        box-shadow: 0 0 5px $error-color;
      }
    }
    &--success {
      border-color: $success-color;
      &:focus{
        box-shadow: 0 0 5px $success-color;
      }
    }
  }
}
</style>