import { HttpStatus, HttpException } from '@nestjs/common';

// 请求成功, 接收一个字符串或者对象
export function httpSuccess(msg: string | unknown) {
  if (typeof msg === 'string') {
    return {
      status: HttpStatus.OK,
      message: msg,
      timestamp: new Date().getTime(),
    };
  } else if (msg instanceof Object) {
    return {
      status: HttpStatus.OK,
      ...msg,
      timestamp: new Date().getTime(),
    };
  }
}

// 封装自定义异常类
export class UnAuth extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: msg ?? '账号未登录',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class BadReq extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message: msg ?? '参数错误',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class ServiceUnavailable extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message: msg ?? '服务端错误',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class Forbidden extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: msg ?? '服务端拒绝',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class NotFound extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        message: msg ?? '未找到该条记录',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class EmailNotExists extends HttpException {
  constructor() {
    super(
      {
        status: 303,
        message: '账号不存在',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class PasswardError extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: 302,
        message: msg ?? '密码错误',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}

export class codeError extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: 301,
        message: msg ?? '验证码错误',
        timestamp: new Date().getTime(),
      },
      200
    );
  }
}
