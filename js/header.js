var search_history = ['北京', '新疆', '河北', '天津', '河南'];
localStorage.setItem('search_history', JSON.stringify(search_history));

// 遮罩层
var Mask = document.getElementById('mask');

// 搜索
var Search_box = document.getElementById('search-box');

// 设置
var Setting_box = document.getElementById('setting-box');

// 导航栏中存在响应式的选项
var nav_item_a = document.getElementById('nav-item-a');

// 显示搜索框或者设置框
function displayPop(e) {
    Mask.style.opacity = 1;
    Mask.style.pointerEvents = 'auto';

    if (e.id == 'search-btn') {
        // 给遮罩添加上自定义属性
        // 方便后续关闭弹窗
        Mask.setAttribute('myKey', 'search-close');

        Search_box.style.opacity = 1;
        Search_box.style.transform = 'scale(1)';

        // 历史记录
        let search_history_dom = document.getElementById('search-history');
        let search_history_div = search_history_dom.getElementsByTagName('div')[1];

        let record = JSON.parse(localStorage.getItem('search_history'));
        // 如果本地历史记录存在
        if (record) {
            // 获取所有 div 节点
            let search_history_div_item = search_history_div.getElementsByTagName('div');
            let a = search_history_div.lastElementChild;
            // 获取 div 节点个数
            let length = search_history_div_item.length;
            // 清空原来的 div 节点
            for (let i = 0; i < length; i++) {
                search_history_div.removeChild(a);
                a = search_history_div.lastElementChild;
            }
            // 渲染历史记录
            for (let i = 0; i < record.length; i++) {
                let div = document.createElement('div');
                div.innerHTML = record[i];
                div.classList.add('check-item');
                search_history_div.appendChild(div);
            }
            // 加入一个“清空历史记录”的按钮
            let div = document.createElement('div');
            div.innerHTML = '清空历史记录';
            div.classList.add('check-item');
            // 绑定一个点击事件 => 用于清空记录
            div.addEventListener('click', function () {
                localStorage.removeItem('search_history');
                // 获取 div 节点数
                length = search_history_div_item.length;
                // 删除所有节点(包括“清空历史记录”)
                for (let i = 0; i < length; i++) {
                    search_history_div.removeChild(search_history_div_item[0]);
                }
                // 加入“暂无历史记录”的节点
                let div = document.createElement('div');
                div.innerHTML = '暂无历史记录';
                div.classList.add('check-item');
                search_history_div.appendChild(div);
            })
            search_history_div.appendChild(div);
        } else if (!record && !search_history_div.children[1]) {
            // 如果本地无历史记录且没有加入“暂无历史记录”这个节点
            let div = document.createElement('div');
            div.innerHTML = '暂无历史记录';
            div.classList.add('check-item');
            search_history_div.appendChild(div);
        }
    } else if (e.id == 'setting-btn') {
        Mask.setAttribute('myKey', 'setting-close');

        Setting_box.style.opacity = 1;
        Setting_box.style.transform = 'scale(1)';
    }
}

// 隐藏搜索框或设置框
function hiddenPop(e) {
    Mask.style.opacity = 0;
    Mask.style.pointerEvents = 'none';
    // 移除自定义属性,避免后续干扰
    Mask.removeAttribute('myKey');

    // 判断 e 有没有 id 这个属性
    if (e?.id) {
        if (e.id == 'search-close') {
            Search_box.style.opacity = 0;
            Search_box.style.transform = 'scale(0)';
        } else if (e.id == 'setting-close') {
            Setting_box.style.opacity = 0;
            Setting_box.style.transform = 'scale(0)';
        } else if (e.id == 'disaster-info-close') {
            var disaster = document.getElementById('disaster');
            disaster.style.transform = 'translateX(110%)';
        }
    } else {
        if (e == 'search-close') {
            Search_box.style.opacity = 0;
            Search_box.style.transform = 'scale(0)';
        } else if (e == 'setting-close') {
            Setting_box.style.opacity = 0;
            Setting_box.style.transform = 'scale(0)';
        }
    }
}

// 默认折叠
var isunfold = false;
var nav_mask = document.getElementById('nav-mask');

function unfold() {
    // 折叠的情况下
    if (isunfold) {
        isunfold = false;
        nav_mask.style.opacity = 0;
        nav_mask.style.pointerEvents = 'none'
        // 添加隐藏动画
        // 必须动态添加,否则一开始时会出现一次隐藏动画
        nav_item_a.classList.add('hidden_animation');
        setTimeout(() => {
            // 先加入 class 才执行移动
            // 避免动画无效果
            nav_item_a.style.transform = 'translateX(100%)';
        }, 0);
        setTimeout(() => {
            // 动画执行完毕后清空动画
            // 方便后面加个新动画进来
            nav_item_a.classList.remove('hidden_animation');
        }, 500);
    } else {
        // 展开的情况下
        isunfold = true;
        nav_mask.style.opacity = 1;
        nav_mask.style.pointerEvents = 'auto'
        nav_item_a.classList.add('display_animation');
        setTimeout(() => {
            nav_item_a.style.transform = 'translateX(0)';
        }, 0);
        setTimeout(() => {
            nav_item_a.classList.remove('display_animation');
        }, 500)
    }
}

// 监听屏幕尺寸变化
// 如果尺寸大于 600px 就不需要再偏移 100%
// 目的是为了避免浏览器窗口由小于 600px 逐渐过渡到大于 600px 的过程中
// nav_item_a 由于偏移而“消失”
window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
        nav_item_a.style.transform = 'translateX(0)';
    } else {
        nav_item_a.style.transform = 'translateX(100%)';
    }
})

// 监听屏幕点击事件
document.addEventListener('click', e => {
    // 如果点击的是 nav-mask 遮罩
    // 则将 nav-item-a 折叠
    if (e.target.id == 'nav-mask') {
        unfold();
    } else if (e.target.id == 'mask') {
        // 如果点击的是普通遮罩
        // 传入遮罩的自定义属性用于关闭指定遮罩
        hiddenPop(Mask.getAttribute('myKey'));
    }
});