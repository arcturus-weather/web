export const filter = {
    filters: {
        Time: (value) => {
            if (!value) return "";
            let minute = value.getMinutes();
            if (minute < 10) {
                minute += "0";
            }
            let hour = value.getHours();
            if (hour < 10) {
                hour = "0" + hour
            }
            return `${hour}:${minute}`;
        },
    },
}

export const darkMode = {
    computed: {
        darkMode() {
            return this.$vuetify.theme.dark;
        },
    }
}

// 一些公共方法
export const common = {
    methods: {
        Timer(fn, wait) {
            // 防抖函数
            var timer = null;
            return function () {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn();
                }, wait);
            }
        },
        setTheme(theme) {
            if (theme === "lightMode") {
                // 浅色模式
                this.$vuetify.theme.dark = false;
            } else if (theme === "darkMode") {
                // 暗黑模式
                this.$vuetify.theme.dark = true;
            } else if (theme === "followSystem") {
                // 跟随系统
                if (window.matchMedia('(prefers-color-scheme: dark)').matches){
                    // 浏览器处于暗黑模式
                    this.$vuetify.theme.dark = true;
                } else {
                    this.$vuetify.theme.dark = false;
                }
            } else if (theme === "auto") {
                let nowTime = new Date();
                if (nowTime.getHours() < 6 || nowTime.getHours() > 18) {
                    // 0~6点和18~24点自动开启暗黑模式
                    this.$vuetify.theme.dark = true;
                } else {
                    this.$vuetify.theme.dark = false;
                }
            }
        }
    }
}