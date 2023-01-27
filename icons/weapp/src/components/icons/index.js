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
  },
  lifetimes: {
    attached() {
      const { size } = this.properties;
      if (typeof  size === 'number') {
        this.setData({
          iconSize: `${size}px`,
        })
      } else if (typeof size === 'string') {
        this.setData({
          iconSize: size,
        })
      }
    }
  },
  data: {
    quote: '"',
    iconSize: 0,
  }
});