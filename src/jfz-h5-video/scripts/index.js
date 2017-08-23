var videoALL = document.getElementById('videoALL'),
    videobox = document.getElementById('videobox'),
    Music = document.getElementById('Music'),
    slideBtn = document.getElementById('Slide');
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var touched = true;
var cdnUrl = 'http://7xlbj9.com1.z0.glb.clouddn.com/jfz_';
videoALL.style.width = clientWidth + 'px';
videoALL.style.height = 'auto';
document.addEventListener('touchmove', function(e) { if (touched) { e.preventDefault() } }, false);

function stylediv(divId) {
    divId.style.width = clientWidth + 'px';
    divId.style.height = clientHeight + 200 + 'px';
}
stylediv(videobox);

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
if (isAndroid) {
    $('body').addClass('android');
    $('#videoALL').attr('src', $('#videoALL').attr('src').replace('jfz_jfzvideo.mp4', 'jfz_jfzbgvideo.mp4'));
}

function playcontr() {
    if (isAndroid) {
        videoALL.style.width = window.screen.width + 'px';
        videoALL.style.height = window.screen.height + 'px';
    } else {
        videoALL.style.width = clientWidth + 'px';
    }
    videobox.style.display = "block";
    videoALL.play();
};

videoALL.addEventListener("x5videoexitfullscreen", function() {
    if (isAndroid) {
        videoALL.style.width = clientWidth + 'px';
        videoALL.style.height = clientHeight + 'px';
        $('body').removeClass('android');
    }
})
videoALL.addEventListener("x5videoenterfullscreen", function() {
    if (isAndroid) {
        videoALL.style.width = window.screen.width + 'px';
        videoALL.style.height = window.screen.height + 'px';
        $('body').addClass('android');
    }
});

//信息提示
var Core = window['Core'] || {};
Core.CONFIG = {
    TwinkTime: 70, //提示框闪烁时长
    TwinkCount: 3, //提示框闪烁次数
    MsgTimeout: 1000, //minmessage 自动隐藏时间
    IsMobilePhone: /^((\(\d{3}\))|(\d{3}\-))?(13\d{9}$)|(15\d{9}$)|(17\d{9}$)|(18\d{9}$)|(14\d{9}$)/, //移动电话
};

Core.Center = function(box, setting) {
    var mainBox = $(window);;
    var cut = 0,
        t = 0,
        l = 0;
    var cssT = (mainBox.height() - box.height()) / 2.2 + cut + t;
    var cssL = (mainBox.width() - box.width()) / 2 + cut + l;
    if (cssT < 0) {
        cssT = 0;
    }
    if (cssL < 0) {
        cssL = 0;
    }
    var st = document.documentElement.scrollTop || document.body.scrollTop;
    if (st) {
        cssT += st;
    }
    box.css({
        top: cssT,
        left: cssL
    });
}

Core.MinMessage = (function() {
    var _temp = '<div class="popup-hint" style="background-color:rgba(0,0,0,0.7);border-radius:0.3rem;position:fixed;top:9999px;lefe:9999px;z-index:9999999999;display:none;">' +
        '<i class="" rel="type"></i>' +
        '<em class="sl"><b></b></em>' +
        '<span class="desc" style="color:#fff;font-size: 0.8rem;padding: 0.3rem 1rem; line-height: 1.5rem; display:block;" rel="con"></span>' +
        '<em class="sr"><b></b></em>' +
        '</div>';
    var _cache = {
            Type: {
                "suc": "hint-icon hint-suc-m",
                "war": "hint-icon hint-war-m",
                "err": "hint-icon hint-err-m",
                "load": "hint-loader",
            }
        },
        _dom, _timer, timeout = 3000;

    //创建消息DOM
    var create = function(obj) {
        if (!_dom) {
            _dom = $(_temp);
            $(document.body).append(_dom);
        }
        _dom.find("[rel='con']").html(obj.text);
        var icon = _dom.find("[rel='type']");
        for (var k in _cache.Type) {
            icon.removeClass(_cache.Type[k]);
        }
        icon.addClass(_cache.Type[obj.type]);
        _dom.fadeIn();
        Core.Center(_dom);
    }

    //隐藏
    var hide = function() {
        if (_timer) {
            window.clearTimeout(_timer);
        }
        if (_dom) {
            _dom.fadeOut();
        }
    }

    return {
        Show: function(obj) {
            if (!obj.type) {
                obj.type = "war";
            }
            create(obj);
            if (_timer) {
                window.clearTimeout(_timer);
            }
            if (!obj.timeout) return;
            if (timeout) {
                _timer = window.setTimeout(hide, timeout);
            }
        },
        Hide: function() {
            fadeOut();
        }
    }
})();
/**
 *提示弹窗
 */
(function($, window, undefined) {
    $.extend($, {
        loadTip: function(text, container, timer) {
            if ($.isNumeric(container)) {
                timer = container;
                container = null;
            }
            if (top.window.Core && top.window.Core.MinMessage) {
                top.window.Core.MinMessage.Show({
                    text: text,
                    type: "load",
                    window: container ? { warp: container } : null,
                    timeout: null
                });
            } else {
                alert(text);
            }

        },
        successTip: function(text, container, timer) {
            if ($.isNumeric(container)) {
                timer = container;
                container = null;
            }
            if (top.window.Core && top.window.Core.MinMessage) {
                top.window.Core.MinMessage.Show({
                    text: text,
                    type: "suc",
                    window: container ? { warp: container } : null,
                    timeout: timer || 2000
                });
            } else {
                alert(text);
            }

        },
        infoTip: function(text, container, timer) {
            if ($.isNumeric(container)) {
                timer = container;
                container = null;
            }
            if (top.window.Core && top.window.Core.MinMessage) {
                top.window.Core.MinMessage.Show({
                    text: text,
                    type: "inf",
                    window: container ? { warp: container } : null,
                    timeout: timer || 2000
                });
            } else {
                alert(text);
            }

        },
        alertTip: function(text, container, timer) {
            if ($.isNumeric(container)) {
                timer = container;
                container = null;
            }
            if (top.window.Core && top.window.Core.MinMessage) {
                top.window.Core.MinMessage.Show({
                    text: text,
                    type: "war",
                    window: container ? { warp: container } : null,
                    timeout: timer || 2000
                });
            } else {
                alert(text);
            }
        },
        hideTip: function() {
            top.window.Core.MinMessage.Hide();
        },
        closeTip: function() {
            top.window.Core.MinMessage.Hide();
        }
    });
}(jQuery, window));

//校验手机号码
function checkMobile(str) {
    var re = /^((\(\d{3}\))|(\d{3}\-))?(13\d{9}$)|(15\d{9}$)|(17\d{9}$)|(18\d{9}$)|(14\d{9}$)/;
    if (re.test(str)) { return true; } else { return false; }
}


$(function() {
    var index = 0,
        touchtime = new Date().getTime();
    $('.action1').on("click", function() {
        var $t = $(this);
        if (new Date().getTime() - touchtime < 500) {
            $t.empty().remove();
            playcontr();
        } else {
            touchtime = new Date().getTime();
        }
        return false;
    })
    $('.action2').on("click", function(event) {
        var $t = $(this);
        Music.play();
        setTimeout(function() {
            videoALL.play();
            $t.empty().remove();
        }, 500)
        return false;
    })
    $('.action3').on("click", function(event) {
        videoALL.play();
        $(this).empty().remove();
        return false;
    })
    slideBtn.addEventListener('touchmove', function(e) {
        videoALL.play();
        $(slideBtn).empty().remove();
    }, false);
    $('.action5').on("click", function(event) {
        $('.end').fadeIn().addClass('play');
        $(this).empty().remove();
        return false;
    });

    $('.submitbtn').on("click", function(event) {
        var name = $('#name').val(),
            mobile = $('#mobile').val();
        if (!name) { $.alertTip('请输入您的真实姓名'); return false; }
        if (!mobile) { $.alertTip('请输入您的手机号'); return false; }
        if (!checkMobile(mobile)) { $.alertTip('请输入正确手机号'); return false; }
        $.ajax({
            async: false,
            url: "api.php",
            type: "POST",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                'username': name,
                'phone': mobile
            },
            timeout: 5000,
            beforeSend: function() {
                //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
            },
            success: function(json) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                if (json.status == -2) {
                    $.alertTip('您已经预约过了');
                } else if (json.status == -3) {
                    $.alertTip('操作失败，请重试');
                } else {
                    $.alertTip('预约成功');
                    setTimeout(function() {
                        top.window.location.href = "http://h5.jfz.com/fortune/video/350?sign=xxzy";
                    }, 2500)
                }
            },
            complete: function(XMLHttpRequest, textStatus) {},
            error: function(xhr) {

            }
        });

        return false;
    })

    videoALL.addEventListener('timeupdate', function(e) {
        if (this.currentTime >= 25.15 && index == 0) {
            index++
            this.pause();
            $('.action2').fadeIn();
        } else if (this.currentTime >= 52.2 && index == 1) {
            index++
            this.pause();
            $('.action3').fadeIn();
        } else if (this.currentTime >= 78.2 && index == 2) {
            index++
            this.pause();
            $('.action4').fadeIn();
        } else if (this.currentTime >= 114.2 && index == 3) {
            $('.action5').fadeIn();
        }
    });


    var pics = [
        cdnUrl + "action1.png",
        cdnUrl + "action2.png",
        cdnUrl + "action3.png",
        cdnUrl + "action4.png",
        cdnUrl + "txt1.png",
        cdnUrl + "arrow.png",
        cdnUrl + "endbg.jpg",
        cdnUrl + "date.png",
        cdnUrl + "invitetxt.png",
        cdnUrl + "line1.png",
        cdnUrl + "line2.png",
        cdnUrl + "logo.png",
        cdnUrl + "orderbtn.png",
        cdnUrl + "theme.png",
        cdnUrl + "mobile.png",
        cdnUrl + "name.png",
        cdnUrl + "ordertheme.png",
        cdnUrl + "submit.png",
        cdnUrl + "arrow.png",
        cdnUrl + "invitetxt.png",
        cdnUrl + "jfzmusic.mp3"
    ];


    function _loadImages(pics, callback, len) {
        len = len || pics.length;
        if (pics.length) {
            var IMG = new Image(),
                picelem = pics.shift();

            if (window._pandaImageLoadArray) {
                window._pandaImageLoadArray = window._pandaImageLoadArray
            } else {
                window._pandaImageLoadArray = [];
            }
            window._pandaImageLoadArray.push(picelem);
            IMG.src = picelem;
            // 从数组中取出对象的一刻，就开始变化滚动条
            _drawLoadProgress(window._pandaImageLoadArray.length / (len * len));
            // 缓存处理
            if (IMG.complete) {
                window._pandaImageLoadArray.shift();
                return _loadImages(pics, callback, len);
            } else {
                // 加载处理
                IMG.onload = function() {
                        window._pandaImageLoadArray.shift();
                        IMG.onload = null; // 解决内存泄漏和GIF图多次触发onload的问题
                    }
                    // 容错处理 todo 应该如何处理呢?
                    // 目前是忽略这个错误，不影响正常使用
                IMG.onerror = function() {
                    window._pandaImageLoadArray.shift();
                    IMG.onerror = null;
                }
                return _loadImages(pics, callback, len);
            }
            return;
        }
        if (callback) _loadProgress(callback, window._pandaImageLoadArray.length, len);
    }
    // 监听实际的加载情况
    function _loadProgress(callback, begin, all) {
        var loadinterval = setInterval(function() {
            if (window._pandaImageLoadArray.length != 0 && window._pandaImageLoadArray.length != begin) {
                _drawLoadProgress((begin - window._pandaImageLoadArray.length) / all);
            } else if (window._pandaImageLoadArray.length == 0) {
                _drawLoadProgress(1)
                setTimeout(function() {
                    callback.call(window);
                }, 500);
                clearInterval(loadinterval);
            }
        }, 300);
    }

    function _drawLoadProgress(w) {
        var num = Math.floor(w * 100) >= 100 ? 100 : Math.floor(w * 100);
        $('#process').css({ "width": num + "%" });
        $("#loading").html(num);

    }

    _loadImages(pics, function() {
        $('#loadingBox').fadeOut();
        $('.action1').fadeIn();
    });


    var uri = window.location.href.split("#")[0];
    $.post("http://public.oyoozo.com/wxapi.php", {
        uri: uri
    }, function(data) {
        data = eval("(" + data + ")");
        var apilist = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ];
        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: apilist
        });

        wx.ready(function() {
            // 分享给朋友事件绑定
            wx.onMenuShareAppMessage({
                title: "穿越回2012，细数私募这五年",
                desc: "金斧子CEO张开兴邀您见证私募大时代。",
                link: 'http://public.oyoozo.com/2017/07/jfz/index.html',
                imgUrl: 'http://7xlbj9.com1.z0.glb.clouddn.com/jfz_jfzweixin.jpg',
                success: function() {

                }
            });

            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: "穿越回2012，细数私募这五年",
                link: 'http://public.oyoozo.com/2017/07/jfz/index.html',
                imgUrl: 'http://7xlbj9.com1.z0.glb.clouddn.com/jfz_jfzweixin.jpg',
                success: function() {

                }
            });
        })
    });


})