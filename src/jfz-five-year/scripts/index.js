//判断移动端的横竖屏标志
(function() {
    var supportsOrientation = (typeof window.orientation == 'number' && typeof window.onorientationchange == 'object');
    var HTMLNode = document.body.parentNode;
    var updateOrientation = function() {
        // rewrite the function depending on what's supported
        if (supportsOrientation) {
            updateOrientation = function() {
                var orientation = window.orientation;

                switch (orientation) {
                    case 90:
                    case -90:
                        orientation = 'landscape';
                        break;
                    default:
                        orientation = 'portrait';
                }
                // if (orientation == 'portrait') {
                //     $(".lock_wrp").hide();
                //     $(".swiper-container").show();
                // } else {
                //     $(".lock_wrp").show();
                //     $(".swiper-container").hide();
                // }

                // set the class on the HTML element (i.e. )
                HTMLNode.setAttribute('class', orientation);
            }
        } else {
            updateOrientation = function() {
                // landscape when width is biggest, otherwise portrait
                var orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
                // if (orientation == 'portrait') {
                //     $(".lock_wrp").hide();
                //     $(".swiper-container").show();
                // } else {
                //     $(".lock_wrp").show();
                //     $(".swiper-container").hide();
                // }
                // set the class on the HTML element (i.e. )
                HTMLNode.setAttribute('class', orientation);
            }
        }

        updateOrientation();
    }
    var init = function() {
        // initialize the orientation
        updateOrientation();

        if (supportsOrientation) {
            window.addEventListener('orientationchange', updateOrientation, false);
        } else {
            // fallback: update every 5 seconds
            setInterval(updateOrientation, 5000);
        }

    }
    window.addEventListener('DOMContentLoaded', init, false);
})();
//图片预加载
var images = new Array()

function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image()
        images[i].src = preload.arguments[i]
    }
}
preload("");

//动画效果
//切换到相对应的屏时触发相关操作
function pyramidshow() {
    var flag = 7;
    $(".head-img").removeClass('ball');
    var st = setInterval(function() {
        if ($(".head-img").hasClass('ball')) {
            $(".pyramid-div").find("i").removeClass("active");
            flag = 7;
            return;
        }
        flag--;
        if (flag == 0) {
            clearInterval(st);
        }
        $(".pyramid-div").find(".i-" + flag).addClass("active");
    }, 500);
}

$(function() {
    var number = 0;
    var loadInterval = setInterval(function() {
        number++;
        $("#showSchedule").html(number + '%');
        if (number == 100) {
            clearInterval(loadInterval);
            $(".loading-page").hide();
            $(".swiper-container").show();
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                onTransitionStart: function(swiper) {
                    var index = swiper.activeIndex;
                    if (index == 7) {
                        $(".head-img").addClass('ball');
                    } else {
                        $(".head-img").removeClass('ball');
                    }
                },
                onSlideChangeEnd: function(swiper) {
                    $(".pyramid-div").find("i").removeClass("active");
                    var index = swiper.activeIndex;
                    if (index == 7) {
                        setTimeout(function() {
                            pyramidshow()
                        }, 1000);
                    }
                }
            });
        }
    }, 50);

    //背景音乐控制
    $(document).one('touchend', function() {
        $("#bgm").get(0).play();
        $(".video").addClass('play');
    });
    
    document.addEventListener("WeixinJSBridgeReady", function() { //微信
        $("#bgm").get(0).play();
        $(".video").addClass('play');
    }, false);
    document.addEventListener("YixinJSBridgeReady", function() { //易信
        $("#bgm").get(0).play();
        $(".video").addClass('play');
    }, false);

    $(document).on('click', '.video', function(e) {
        var $this = $(this);
        if (!$this.hasClass('play')) {
            $("#bgm").get(0).play();
            $(".video").addClass('play');
        } else {
            $("#bgm").get(0).pause();
            $(".video").removeClass('play');
        }
    });
});
