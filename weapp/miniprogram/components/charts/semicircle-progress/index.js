import semicircle from './semicircle';

Component({
  properties: {
    options: Object,
  },

  lifetimes: {
    ready() {
      this.createSelectorQuery()
        .in(this)
        .select('#ring')
        .fields({ node: true, size: true })
        .exec(res => {
          const p = new semicircle(res[0]);

          p.init(this.data.options);
        });
    },
  },
});
