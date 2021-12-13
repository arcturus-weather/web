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
        }
    }
}