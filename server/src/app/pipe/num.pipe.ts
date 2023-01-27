import { PipeTransform, Injectable } from '@nestjs/common';

// 把对象中全部字符串数字转成数字类型
// 因为使用 joi 校验过了, 所以只可能是数字字符串
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    return this.t(value);
  }

  // 递归将所以数字字符串转成数字
  t(value: any) {
    if (Array.isArray(value)) {
      return value.map((e) => this.t(e));
    } else if (value instanceof Object) {
      const res = {};
      Object.keys(value).forEach((e) => {
        if (e === 'icon') res[e] = value[e];
        else res[e] = this.t(value[e]);
      });

      return res;
    } else if (typeof value === 'string') {
      const res = Number(value);
      if (!isNaN(res)) return res;
      else return value;
    } else return value;
  }
}
