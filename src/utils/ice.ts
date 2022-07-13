import Http from 'utils/http';

export default class Ice {
  private http: Http;

  constructor(private baseUrl: string) {
    this.http = new Http({
      baseUrl: this.baseUrl,
    });

    // 添加响应拦截器
    Http.setIceResponseInterceptors(this.http.ax);
  }

  login(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/login',
      method: 'POST',
      data: {
        email,
        password,
        timestamp: new Date().getTime(),
      },
    });
  }

  signin(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/signin',
      method: 'POST',
      data: {
        email,
        password,
        timestamp: new Date().getTime(),
      },
    });
  }
}

