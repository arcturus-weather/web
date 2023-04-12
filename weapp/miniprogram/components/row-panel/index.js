Component({
  externalClasses: ['panel-class'],
  properties: {
    /**
     * data = [{
     *    name: '大气压强',
     *    icon: '',
     *    value: '1003',
     *    unit: 'hPa',
     * }, {
     *    name: '相对湿度',
     *    icon: '',
     *    value: 72,
     *    unit: '%',
     * }, {
     *    name: '能见度',
     *    icon: '',
     *    value: '7',
     *    unit: 'km'
     * }, {
     *    name: '风速',
     *    icon: '',
     *    value: '3',
     *    unit: 'km/h'
     * }]
     */
    options: Array,
  },
});
