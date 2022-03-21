// 日期格式化
Date.prototype.format = function (fmt) {
  // 年
  if (/y+/.test(fmt)) {
    const y = /y+/.exec(fmt)[0];
    fmt = fmt.replace(y, String(this.getFullYear()).substring(4 - y.length));
  }

  const o = {
    'M+': this.getMonth() + 1, // 月
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    ms: this.getMilliseconds(), // 毫秒
  };

  for (let k in o) {
    const regex = new RegExp(k);
    if (regex.test(fmt)) {
      const v = regex.exec(fmt)[0];
      fmt = fmt.replace(
        v,
        v.length === 1 ? o[k] : `00${o[k]}`.substring(String(o[k]).length)
      );
    }
  }
  return fmt;
};

// 星期几
Date.prototype.week = function () {
  const w = ['日', '一', '二', '三', '四', '五', '六'];

  return w[this.getDay()];
};

// 获取距离 n 天的日期
Date.prototype.deltaDay = function (n) {
  const timestamp = new Date().getTime(); // 当前日期的时间戳

  // 时间戳加上指定天数(1000 * 3600 * 24)
  return new Date(timestamp + n * 86400000);
};
