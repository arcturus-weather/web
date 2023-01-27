import {
  isWarning,
  qweatherIcon,
  caiyunIcon,
} from './utils';

Component({
  properties: {
    name: {
      type: String,
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 18,
    },
    type: {
      type: String,
      value: 'qweather',
    },
  },
  lifetimes: {
    attached() {
      const { type, name } = this.properties;

      let prefix = '';

      if (isWarning(name)) {
        prefix = 'warnings';
      } else {
        prefix = 'weathers';
      }

      let id = '';

      if (type === 'qweather') {
        id = qweatherIcon(name);
      } else if (type === 'caiyun') {
        id = caiyunIcon(name);
      }

      this.setData({
        id: `${prefix}-${id}`,
      });
    },
  },
  data: {
    id: '',
  },
});
