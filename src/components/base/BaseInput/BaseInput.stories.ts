import {action} from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import BaseInput from './BaseInput.vue';

const stories = storiesOf('Base input', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => ({
  components: { BaseInput },
  template: `<BaseInput :tm-type="type"
    :tm-errored="errored"
    :tm-disabled="disabled"
    :style="styles"
    v-model="inputValue"
    tm-id="test-label">
      Testing Input
    </BaseInput>`,
  props: {
    disabled: {
      default: boolean('Disable input', false),
    },
    styles: {
      default: text('Styles', 'width: 400px; margin-top: 30px; margin-left: 30px; font-size: 1.5rem;'),
    },
    errored: {
      default: boolean('Errored', false),
    },
    type: {
      default: text('Type', 'text'),
    },
  },
  data: () => {
    return {
      inputValue: 'dummy',
    };
  },
}));
