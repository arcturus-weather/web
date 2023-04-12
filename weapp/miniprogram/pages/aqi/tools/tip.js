import Aqi from './aqi';

export default function tip() {
  const keys = Object.keys(Aqi);

  let color = [],
    desc = [];

  keys.forEach(e => {
    const obj = Aqi[e];

    color.push(obj.gradientColor);

    desc.push({
      icon: obj.icon,
      name: obj.name,
      scope: `${obj.min}~${obj.max}`,
      desc: obj.desc,
    });
  });

  return { color: color.join(','), desc };
}
