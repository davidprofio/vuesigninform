import { Ref } from '@vue/composition-api';

export function checkEmptyStringRef(value: Ref<string>) {
  return value === null
    || value === undefined
    || value.value === null
    || value.value === undefined
    || value.value === '';
}
