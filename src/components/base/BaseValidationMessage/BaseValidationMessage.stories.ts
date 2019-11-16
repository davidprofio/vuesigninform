import {action} from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import BaseValidationMessage from './BaseValidationMessage.vue';

const stories = storiesOf('Base Validation Message', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => ({
  components: { BaseValidationMessage },
  template: `<div>
  <BaseValidationMessage
    :tm-errored="errored"
    :tm-success="success"
    :style="styles">
      {{inputText}}
  </BaseValidationMessage>
  <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
    <symbol id="icon-notification" viewBox="0 0 32 32">
      <title>notification</title>
      <path d="M16 3c-3.472 0-6.737 1.352-9.192 3.808s-3.808 5.72-3.808 9.192c0 3.472 1.352 6.737 3.808 9.192s5.72 3.808 9.192 3.808c3.472 0 6.737-1.352 9.192-3.808s3.808-5.72 3.808-9.192c0-3.472-1.352-6.737-3.808-9.192s-5.72-3.808-9.192-3.808zM16 0v0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16zM14 22h4v4h-4zM14 6h4v12h-4z"></path>
    </symbol>
    <symbol id="icon-warning" viewBox="0 0 32 32">
      <title>warning</title>
      <path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"></path>
      <path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
      <path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"></path>
    </symbol>
    <symbol id="icon-checkmark" viewBox="0 0 32 32">
      <title>checkmark</title>
      <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
    </symbol>
    </defs>
  </svg>
</div>`,
  props: {
    success: {
      default: boolean('Success', false),
    },
    styles: {
      default: text('Styles', ''),
    },
    errored: {
      default: boolean('Errored', false),
    },
    inputText: {
      default: text('Text', 'Testing'),
    },
  },
}));
