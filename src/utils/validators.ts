import { ValidationResult, ValidationResultWithMessages, ValidatePasswordResult } from '@/types/main';
import { Ref } from '@vue/composition-api';
import { checkEmptyStringRef } from '@/utils/helpers';

const useEmailValidator = (value: Ref<string>): ValidationResult => {
  const result: ValidationResult = {
    errored: false,
  };

  if (checkEmptyStringRef(value)) {
    return result;
  }

  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  result.errored = !regex.test(value.value);
  return result;
};

const useRequiredValidator = (value: Ref<string>): ValidationResult => {
  const result: ValidationResult = {
    errored: checkEmptyStringRef(value),
  };

  return result;
};

const usePasswordValidator = (value: Ref<string>): ValidatePasswordResult => {
  const result: ValidatePasswordResult = {
    upperCase: true,
    lowerCase: true,
    enoughChar: true,
    numericChar: true,
    errored: true,
  };

  // todo figure out a better way of doing this
  if (checkEmptyStringRef(value)) {
    return result;
  }

  if (value.value.length > 7) {
    result.enoughChar = false;
  }

  const upperCaseRegex = /[A-Z]/;
  if (upperCaseRegex.test(value.value)) {
    result.upperCase = false;
  }

  const lowerCaseRegex = /[a-z]/;
  if (lowerCaseRegex.test(value.value)) {
    result.lowerCase = false;
  }

  const specialCharacterRegex = /[1-9]/;
  if (specialCharacterRegex.test(value.value)) {
    result.numericChar = false;
  }

  result.errored = result.numericChar || result.enoughChar || result.upperCase || result.lowerCase;

  return result;
};

export {useEmailValidator, useRequiredValidator, usePasswordValidator};
