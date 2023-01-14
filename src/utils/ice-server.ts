import Http from '@utils/http';
import { notify } from './utils';
import { AxiosRequestHeaders } from 'axios';

export default class Ice {
  private http: Http;

  constructor(private baseUrl: string, public token: string | null) {
    this.http = new Http({
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    Http.setRequestInterceptors(this.http.ax, (config) => {
      if (this.token) {
        (
          config.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${this.token}`;
      }

      return config;
    });

    this.http.ax.interceptors.response.use(
      (resp) => {
        return resp.data;
      },
      (err) => {
        notify.negative(err.message);
        return err;
      }
    );
  }

  visit() {
    return this.http.request({
      url: '/visit',
    });
  }

  sendCode(email: string) {
    return this.http.request({
      url: '/sendCode',
      method: 'POST',
      data: { data: { email } },
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/login',
      method: 'POST',
      data: { data: { email, password } },
    });
  }

  signin(email: string, password: string): Promise<any> {
    return this.http.request({
      url: '/signin',
      method: 'POST',
      data: { data: { email, password } },
    });
  }

  changePassword(email: string, password: string, code: string) {
    return this.http.request({
      url: '/reset',
      method: 'POST',
      data: { data: { email, password, code } },
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
      data: { data: { ...options } },
    });
  }

  deleteFavorite(options: ILocation[]): Promise<any> {
    return this.http.request({
      url: '/deleteFavorites',
      method: 'POST',
      data: { data: { list: options } },
    });
  }

  daily(options: ICheckInDaily) {
    return this.http.request({
      url: '/daily',
      method: 'POST',
      data: { data: { ...options } },
    });
  }

  checkin(options: ICheckin): Promise<any> {
    return this.http.request({
      url: '/checkin',
      method: 'POST',
      data: { data: { ...options } },
    });
  }

  calendar(): Promise<any> {
    return this.http.request({
      url: '/calendar',
    });
  }
}
