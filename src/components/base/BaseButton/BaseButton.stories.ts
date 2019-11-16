import {action} from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import BaseButton from './BaseButton.vue';

const stories = storiesOf('Base Button', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => ({
  components: { BaseButton },
  template: `<BaseButton style="width: 225px; font-size: 22px; margin: 25px;">
    <span>Click Me</span>
  </BaseButton>`,
}));
