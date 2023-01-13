import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { notify } from '@utils/utils';
import { useAppInfoStore } from './appinfo';
import Ice from '@src/utils/ice-server';

const user = new Ice(
  process.env.VUE_SERVER_BASEURL!,
  LocalStorage.getItem('token')
);

export const useUserStore = defineStore('user', {
  actions: {
    // 是否登录
    isLoggedIn() {
      const token = LocalStorage.getItem('token');

      if (token) return true;
      else return false;
    },

    logout() {
      LocalStorage.remove('token');
    },

    // 发送验证码
    sendCode(email: string) {
      return user.sendCode(email);
    },

    // 访问
    visit() {
      user.visit().then((res) => {
        const { status, visitor } = res as any;
        if (status === 200) {
          const app = useAppInfoStore();
          app.visitor = visitor;
        }
      });
    },

    // 登录
    login(account: string, password: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .login(account, password)
          .then((res) => {
            const { status, token } = res;
            if (status === 200) {
              // 保存用户 token
              LocalStorage.set('token', token);
              user.token = token;
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects({ code: err.status });
          });
      });
    },

    // 注册
    signin(account: string, password: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .signin(account, password)
          .then((res) => {
            const { status } = res;

            if (status === 200) {
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects(err);
          });
      });
    },

    // 修改密码
    changePassword(email: string, password: string, code: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .changePassword(email, password, code)
          .then((res) => {
            console.log(res);
            const { status } = res;

            if (status === 200) {
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects(err);
          });
      });
    },

    // 每日日记
    daily(id: string, daily: string) {
      return new Promise<void>((resolve, rejects) => {
        user.daily({ id, daily }).then((res) => {
          const { status } = res;

          if (status === 200) {
            resolve();
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    favorites(): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.favorites().then((res) => {
          const { status, favorites } = res;

          if (status === 200) {
            resolve(favorites);
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    addFavorite(options: ILocation) {
      return user.addFavorite(options);
    },

    deleteFavorite(options: ILocation[]): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.deleteFavorite(options).then((e) => {
          const { status } = e;

          if (status === 200) {
            resolve(e.favorites);
          } else {
            notify.negative(e.message);
            rejects();
          }
        });
      });
    },

    calendar(): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.calendar().then((res) => {
          const { status, list } = res;

          if (status === 200) {
            resolve(list);
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    checkin(options: ICheckin): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.checkin(options).then((res) => {
          const { status, item } = res;

          if (status === 200) {
            resolve(item);
          } else {
            rejects('waring.checkinFail');
          }
        });
      });
    },
  },
});

