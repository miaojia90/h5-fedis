/****************************
Function:公共的JS库
Add   By:major.miao
Add Date:2017-07-03
****************************/
var H5 = {
    routerUrl: "http://h5.jfz.net/fortune/video/",
    // 存储 sesstionStorage
    setSessionStorage: function(name, value) {
        sessionStorage.setItem(name, value);
    },

    // 获取 sesstionStorage
    getSessionStorage: function(name) {
        return sessionStorage.getItem(name);
    },

    // 存储 localStorage
    setLocalStorage: function(name, value) {
        localStorage.setItem(name, value);
    },

    // 获取 localStorage
    getLocalStorage: function(name) {
        return localStorage.getItem(name);
    },

    // 写入 cookie
    setCookie: function(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    // 获取 cookie
    getCookie: function(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },

    // 获取 url 中的参数值
    getRequest: function() {
        var url = location.search;
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0, length = strs.length; i < length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    replaceAll: function(obj, str1, str2) {
        var result = obj.replace(eval("/" + str1 + "/gi"), str2);
        return result;
    },
    //时间戳转化时间
    formatDate: function(date) {
        if(!date){
          return ""; 
        }
        var now = new Date(parseInt(date*1000));
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + (month>9?month:"0"+month) + "-" + (date>9?date:"0"+date) + " " + (hour>9?hour:"0"+hour) + ":" + (minute>9?minute:"0"+minute) + ":" + (second>9?second:"0"+second);
    },
    //Ajax请求封装
    getDataPostApi: function(method, params, succesCallback, errorCallback) {
        var routerUrl = H5.routerUrl;
        var method = method;
        var params = params;
        var t = new Date().getTime();
        params = "{'" + params.replace(/=/g, "':'").replace(/&/g, "','") + "'}";
        params = eval('(' + params + ')');
        var jsonString = params['jsonString'].replace('}', ',t:' + t + '}');
        routerUrl += method;
        $.ajax({
            type: "post",
            url: routerUrl,
            data: { jsonString: jsonString },
            dataType: 'jsonp',
            jsonp: "callback",
            success: function(data) {
                typeof succesCallback == 'function' && succesCallback(data);
            },
            error: function(a, b, c) {
                console.log("error!");
                typeof errorCallback == 'function' && errorCallback(a, b, c);
            }
        });
    },
    //Ajax get请求封装
    getDataGetApi: function(method, params, succesCallback, errorCallback) {
        var routerUrl = H5.routerUrl;
        var method = method;
        var params = params;
        var jsonP = "callback=?";
        var jsonstring = null;
        if (params == null || params.length < 0) {
            jsonP = "?callback=?";

        } else {
            //遍历结果写到URL后面
            jsonstring = params.replace('jsonString={"', "?");
            jsonstring = H5.replaceAll(jsonstring, '":"', '=');
            jsonstring = H5.replaceAll(jsonstring, '","', '&');
            jsonstring = H5.replaceAll(jsonstring, '"}', '&');
        }
        routerUrl += method + jsonstring + jsonP;
        $.ajax({
            type: 'GET',
            url: routerUrl,
            dataType: 'json',
            data: {},
            success: function(data) {
                typeof succesCallback == 'function' && succesCallback(data);
            },
            error: function(a, b, c) {
                console.log("error!");
                typeof errorCallback == 'function' && errorCallback(a, b, c);
            }
        });
    }
};
//封装
var StringBuilder = function() {
    this.arr = new Array();
}

StringBuilder.prototype = {
    append: function(str) {
        this.arr.push(str);
    },
    clear: function() {
        this.arr = new Array();
    },
    toString: function() {
        return this.arr.join("");
    }
}
