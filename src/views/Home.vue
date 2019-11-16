<template>
<div class="home">
    <h1 class="home__heading">EXAMPLE</h1>
    <form class="home__form" @submit.prevent="onSubmit">
      <base-input
        class="home__input"
        tm-id="email"
        tm-type="email"
        v-model="state.email"
        :tm-errored="state.emailValidation.errored">
        <span>Email</span>
      </base-input>
      <base-validation-message
        class="home__validation-message"
        v-show="state.emailValidation.errored"
        :tm-errored="state.emailValidation.errored">
        {{state.emailValidation.message}}
      </base-validation-message>
      <base-input
        class="home__input"
        tm-id="password"
        tm-type="password"
        :tm-errored="state.signUpPasswordValidation.errored === true || state.loginPasswordValidation.errored === true"
        v-model="state.password">
        <span>Password</span>
      </base-input>
      <base-validation-message
        class="home__validation-message"
        v-show="state.loginPasswordValidation.errored"
        :tm-errored="state.loginPasswordValidation.errored">
        {{state.loginPasswordValidation.message}}
      </base-validation-message>
      <div class="home__password__validation">
        <div v-if="!state.login">
          <div class="home__password__validation__label">
            Your password must contain:
          </div>
          <ul class="home__password__validation__message-list">
            <li class="home__password__validation__message-list__message">
              <base-validation-message
              :tm-errored="state.signUpPasswordValidation.enoughChar === true"
              :tm-success="state.signUpPasswordValidation.enoughChar === false">
                at least 8 characters
              </base-validation-message>
            </li>
            <li class="home__password__validation__message-list__message">
              <base-validation-message
              :tm-errored="state.signUpPasswordValidation.upperCase === true"
              :tm-success="state.signUpPasswordValidation.upperCase === false">
                an upper case letter
              </base-validation-message>
            </li>
            <li class="home__password__validation__message-list__message">
              <base-validation-message 
              :tm-errored="state.signUpPasswordValidation.lowerCase === true"
              :tm-success="state.signUpPasswordValidation.lowerCase === false">
                a lower case letter
              </base-validation-message>
            </li>
            <li class="home__password__validation__message-list__message">
              <base-validation-message 
              :tm-errored="state.signUpPasswordValidation.numericChar === true"
              :tm-success="state.signUpPasswordValidation.numericChar === false">
                a number
              </base-validation-message>
            </li>
          </ul>
        </div>
      </div>
      <base-button
        class="home__button base-button base-button--primary"
        tm-type="submit">
        {{state.primaryActionText}}
      </base-button>
      <base-button
        @clicked="switchAction"
        class="home__link-button base-button--link">
        {{state.secondaryActionText}}
      </base-button>
    </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, ref, reactive, computed, onMounted, toRefs, watch, Ref } from '@vue/composition-api';
import BaseInput from '@/components/base/BaseInput/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton/BaseButton.vue';
import BaseSvg from '@/components/base/BaseSvg/BaseSvg.vue';
import BaseValidationMessage from '@/components/base/BaseValidationMessage/BaseValidationMessage.vue';
import {  useEmailValidator, useRequiredValidator, usePasswordValidator } from '@/utils/validators';
import { ValidatePasswordResult } from '../types/main';

export default createComponent({
  name: 'Home',
  components: {
    BaseInput,
    BaseButton,
    BaseSvg,
    BaseValidationMessage,
  },
  setup() {
    // use ref so we can pass it to validator and change it within
    // i.e. wanting to prevent numeric characters in a name field
    // or vice versa. confirmed it works but not using it yet
    // dunno if it's actually best to do
    const email = ref('');
    const password = ref('');
    const state = reactive({
      login: true,
      email,
      password,
      primaryActionText: 'Log In',
      secondaryActionText: 'Sign Up',
      emailValidation: {
        errored: false,
        message: 'Please enter a valid email address',
      },
      // set up validation like this so we could have an error message
      // in the validators but thinking about making it html driven for
      // more flexibliity
      loginPasswordValidation: {
        errored: false,
        message: 'Please enter your password',
      },
      signUpPasswordValidation: {
        upperCase: null,
        lowerCase: null,
        enoughChar: null,
        numericChar: null,
        errored: null,
      } as ValidatePasswordResult,
    });

    // function for doing the validation
    const validateEmailInput = () => {
      let result = useRequiredValidator(email).errored;
      result = result ||  useEmailValidator(email).errored;
      state.emailValidation.errored = result;
      return !result;
    };

    // watch the email value, run our validator
    watch (
      () => email.value,
      () => {
        validateEmailInput();
      },
      {lazy: true},
    );

    // need different validate password functions because the form shares
    // the inputs, alternative to above design is to have separate forms and
    // then copy the values between on switch. Tbh might switch it to that,
    // seems like it may be easier, but idk. Duplicated html vs slightly
    // more complicated js
    const validateSignUpPasswordInput = () => {
      if (state.login) {
        return true;
      }
      const result = usePasswordValidator(password);
      state.signUpPasswordValidation = {...result};
      return !result.errored;
    };

    const validateLoginPasswordInput = () => {
      if (!state.login) {
        return true;
      }
      const result = useRequiredValidator(password);
      state.loginPasswordValidation.errored = result.errored;
      return !result.errored;
    };

    watch (
      () => password.value,
      () => {
        validateSignUpPasswordInput();
        validateLoginPasswordInput();
      },
      {lazy: true},
    );

    // trigger all the validations since we lazy load them
    const onSubmit = () => {
      let valid = validateEmailInput();
      valid = validateSignUpPasswordInput() && valid;
      valid = validateLoginPasswordInput() && valid;
      if (!valid) {
        return;
      }

      console.log('submitted');
    };

    // on switch from login to sign up and vice versa reset states
    const resetValidation = () => {
      state.signUpPasswordValidation = {
        upperCase: null,
        lowerCase: null,
        enoughChar: null,
        numericChar: null,
        errored: null,
      };
      state.emailValidation.errored = false;
      state.loginPasswordValidation.errored = false;
    };

    const switchAction = () => {
      state.login = !state.login;
      resetValidation();
      if (state.login) {
        state.primaryActionText = 'Log In';
        state.secondaryActionText = 'Sign Up';
      } else {
        state.primaryActionText = 'Sign Up';
        state.secondaryActionText = 'Log In';
      }
    };

    return {
      state,
      onSubmit,
      switchAction,
    };
  },
});
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.25rem;
  text-align: center;
  &__heading {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    color: $brand-primary;
  }
  &__form {
    background-color: #fff;
    box-shadow: 0 0 5px #595959;
    padding: 6rem 2rem 2rem 2rem; 
    min-height: 31.25rem;
    width: 100%;
    max-width: 31.25rem;
  }
  &__input {
    text-align: left;
    margin-top: 1.5rem;
    &:first-child {
      margin-top:0;
    }
  }
  &__validation-message {
    margin-top: 0.5rem;
    text-align: left;
  }
  &__password__validation {
    margin-top: 1.5rem;
    text-align: left;
    &__label {
      font-weight: 500;
    }
    &__message-list {
      margin-left: 1.5rem;
      list-style: none;
      &__message {
        margin: 6px 0;
      }
    }
  }
  &__button {
    width: 50%; 
    margin: 1.5rem auto 1.5rem auto;
  }
  &__link-button {
    width: auto;
  }

}
</style>