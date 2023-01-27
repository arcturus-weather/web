// 数据库配置
interface IDataBaseConfig {
  uri: string;
}

// 邮件配置
interface IMailConfig {
  host: string;
  port: number;
  account: string;
  password: string;
}

// jwt 配置
interface IAuthConfig {
  secret: string;
  expires: string;
}

// jwt 负载
interface IPayLoad {
  email: string;
  uid: string;
}

// 地理坐标
interface ILocation {
  latitude: number;
  longitude: number;
  city?: string;
  address?: string;
}

interface IAuth {
  password: string;
  email: string;
}

type IFavorite = ILocation;

// 天气信息
interface IWeather {
  temperature: number;
  feelsLike: number;
  icon: string;
  description: string;
  wind360: number;
  windSpeed: number;
  humidity: number;
  precip: number;
  pressure: number;
  visibility: number;
  clouds: number;
  aqi: number;
  source: string;
}

// 打卡记录
interface ICalendarItem {
  location: ILocation;
  weather: IWeather;
  daily?: string;
  date: Date;
  id: string; // 记录的 id, 用于前端对记录的修改
}

interface ICalendar {
  status: number;
  timestamp: number;
  list: ICalendarItem[];
}

// 日记
interface IDailyBody {
  id: string;
  daily: string;
}

interface IMailBody {
  email: string;
  subject: string; // 邮件标题
  sign?: string; // 邮件签名
}

// 修改密码
interface IChangePasswordBody {
  email: string;
  password: string;
  code: string;
}

// 添加地址收藏
interface IAddFavoritesBody {
  uid: string;
  item: IFavorite;
}

interface IDeleteFavoritesBody {
  uid: string;
  item: IFavorite[];
}

// 每日打卡
interface ICheckIn {
  location: ILocation;
  weather: IWeather;
}

interface ICheckInBody {
  uid: string;
  item: ICheckIn;
}
