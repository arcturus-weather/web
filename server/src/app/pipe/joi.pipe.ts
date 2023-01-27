import { PipeTransform, Injectable } from '@nestjs/common';
import { BadReq } from '@src/utils/http';
import { ObjectSchema } from 'joi';

// joi 参数验证
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error: err } = this.schema.validate(value);
    if (err) throw new BadReq(err.message ?? '参数错误');
    return value;
  }
}
