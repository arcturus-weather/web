import Http from 'utils/http';

export default class Ice {
  private http: Http;

  constructor(private baseUrl: string, public token: string | null) {
    this.http = new Http({
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.http.ax.interceptors.request.use(
      (config) => {
        if (this.token) {
          // 只要登录过, 请求就带上 token
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.http.ax.interceptors.response.use(
      (resp) => {
        return resp.data;
      },
      (err) => {
        return err;
      }
    );
  }

  sendCode(email: string) {
    return this.http.request({
      url: '/sendCode',
      method: 'POST',
      data: { email },
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/login',
      method: 'POST',
      data: { email, password },
    });
  }

  signin(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/signin',
      method: 'POST',
      data: { email, password },
    });
  }

  changePassword(email: string, password: string, code: string) {
    return this.http.request({
      url: '/reset',
      method: 'POST',
      data: { email, password, code },
    });
  }

  favorites(): Promise<any> {
    return this.http.request({
      url: '/favorites',
    });
  }

  addFavorite(options: ILocation): Promise<any> {
    return this.http.request({
      url: '/addFavorites',
      method: 'POST',
      data: { ...options },
    });
  }

  deleteFavorite(options: ILocation[]): Promise<any> {
    return this.http.request({
      url: '/deleteFavorites',
      method: 'POST',
      data: { list: options },
    });
  }

  daily(options: IDaily) {
    return this.http.request({
      url: '/daily',
      method: 'POST',
      data: { ...options },
    });
  }

  checkin(options: ICheckin): Promise<any> {
    return this.http.request({
      url: '/checkin',
      method: 'POST',
      data: { ...options },
    });
  }

  calendar(): Promise<any> {
    return this.http.request({
      url: '/calendar',
    });
  }
}

