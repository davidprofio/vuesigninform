import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(j|t)s$/), module);
import '../src/assets/scss/global.scss';