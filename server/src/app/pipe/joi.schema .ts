import * as joi from 'joi';
// 关于 joi: https://joi.dev/api/?v=17.6.0#introduction

// 注册参数策略
export const authSchema = joi.object({
  email: joi.string().required().email(),

  // 密码最短 3 个字符最长 30 个
  password: joi.string().min(3).max(30).required(),
});

// 重置密码
export const resetSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().min(3).max(30).required(),
  code: joi.string().length(6), // 生成验证码时规定了 6 位
});

// 经度范围 -180~180, 纬度 -90~90
export const favoriteSchema = joi.object({
  latitude: joi.number().required().min(-90).max(90),
  longitude: joi.number().required().min(-180).max(180),
  city: joi.string(),
  address: joi.string(),
});

export const favoritesSchema = joi.object({
  list: joi.array().items(favoriteSchema),
});

// 每日打卡
export const checkinSchema = joi.object({
  location: favoriteSchema,
  weather: joi.object({
    temperature: joi.number(),
    feelsLike: joi.number(),
    icon: joi.string(),
    description: joi.string(),
    wind360: joi.number().max(360).min(0),
    windSpeed: joi.number(),
    humidity: joi.number().min(0).max(100),
    precip: joi.number(),
    pressure: joi.number(),
    visibility: joi.number(),
    clouds: joi.number().min(0).max(100),
    aqi: joi.number().max(500).min(0),
    source: joi.string(),
  }),
});

export const dailySchema = joi.object({
  id: joi.string().length(24).required(),
  daily: joi.string().required(),
});
