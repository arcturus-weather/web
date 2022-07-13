import Http from 'utils/http';

export class Ice {
  private http: Http;

  constructor(private baseUrl: string) {
    this.http = new Http({
      baseUrl: this.baseUrl,
    });

    // 添加响应拦截器
    Http.setQweatherResponseInterceptors(this.http.ax);
  }
}

