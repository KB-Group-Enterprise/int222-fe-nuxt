/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue';

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';

import {
  required,
  alpha,
  email,
  min,
  max,
  between,
  // eslint-disable-next-line camelcase
  min_value,
  // eslint-disable-next-line camelcase
  max_value,
  confirmed,
  numeric,
} from 'vee-validate/dist/rules';

import th from 'vee-validate/dist/locale/th.json';

localize('th', th);

extend('required', {
  ...required,
});

extend('alpha', {
  ...alpha,
});

extend('email', {
  ...email,
});

extend('min', {
  ...min,
});

extend('max', {
  ...max,
});

extend('between', {
  ...between,
});
extend('min_value', {
  // eslint-disable-next-line camelcase
  ...min_value,
});
extend('max_value', {
  // eslint-disable-next-line camelcase
  ...max_value,
});

extend('confirmed', {
  ...confirmed,
  message: 'รหัสผ่านไม่ตรงกัน',
});

extend('numeric', {
  ...numeric,
});

extend('azAZ', {
  validate: (value) => /^(.*[a-zA-Z].*[A-Z]+)$/.test(value),
  message: 'ภาษาอังกฤษเท่านั้น',
});

extend('required_az', {
  validate: (value) => /^(?=.*[a-z])/.test(value),
  message: 'ต้องมีตัวอังกฤษเล็กภาษาอังกฤษ',
});

extend('required_AZ', {
  validate: (value) => /^(?=.*[A-Z])/.test(value),
  message: 'ต้องมีตัวอังกฤษใหญ่ภาษาอังกฤษ',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
