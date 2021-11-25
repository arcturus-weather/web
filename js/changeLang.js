(function () {
    var rep = new XMLHttpRequest();
    rep.onreadystatechange = function () {
        if (rep.readyState == 4 && rep.status == 200) {
            var span = document.getElementById('test');
            var obj = JSON.parse(rep.responseText);
            span.innerHTML = obj.cities.Beijing;
        }
    }
    rep.open('GET', '/i18n/zh-cn.json', true);
    rep.send();
})();