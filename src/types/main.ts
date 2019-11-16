import { Vue } from 'vue/types/vue';
import { Ref } from '@vue/composition-api';

export interface ValidationResult {
  errored: boolean;
}
export interface ValidationResultWithMessages extends ValidationResult {
  messages: string[];
}
export interface ValidatePasswordResult {
  errored: boolean | null;
  upperCase: boolean | null;
  lowerCase: boolean | null;
  enoughChar: boolean | null;
  numericChar: boolean | null;
}
