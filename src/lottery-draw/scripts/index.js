//转盘模块
var RotateModal = {
	bRotate:false,
    rotateFn: function(awards, angles, txt) {
        RotateModal.bRotate = !RotateModal.bRotate;
        $('.rotate').stopRotate();
        $('.rotate').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function() {
                $("#winning-prize-content").html(txt);
                $(".winning").show();
                RotateModal.bRotate = !RotateModal.bRotate;
            }
        });
    },
    rnd: function(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n)
    },
    pointerClick: function() {
        if (RotateModal.bRotate) return;
        var item = RotateModal.rnd(0, 7);
        switch (item) {
            case 0:
                RotateModal.rotateFn(0, 337.5, '美国高端游');
                break;
            case 1:
                RotateModal.rotateFn(1, 22.5, 'iphone7');
                break;
            case 2:
                RotateModal.rotateFn(2, 67.5, 'kindle');
                break;
            case 3:
                RotateModal.rotateFn(3, 112.5, '小米移动电源');
                break;
            case 4:
                RotateModal.rotateFn(4, 157.5, '1000元抵扣金');
                break;
            case 5:
                RotateModal.rotateFn(5, 202.5, 'AppleIpad');
                break;
            case 6:
                RotateModal.rotateFn(6, 247.5, '100元京东卡');
                break;
            case 7:
                RotateModal.rotateFn(7, 292.5, '华为手环');
                break;
        }
        console.log(item);
    }
};
//抽奖模块
var LotteryDraw = {
    init: function() {
        //事件绑定
        $("body").on("click", ".active-rule", function() {
            $(".rule-div-pop").show();
        });
        $("body").on("click", ".pop-modal .close", function() {
            $(".pop-modal").hide();
        });
        $("body").on("click", ".my-prize", function() {
            $(".my-prize-div-pop").show();
        });
        $("body").on("click", ".pointer", function() {
            RotateModal.pointerClick();
        });  
        $("body").on("click", "#writeAddress", function() {
            window.location.href="address.html";
        });                
    }
};


$(function() {
    LotteryDraw.init();
    $('.winning-list-div').vTicker({
		speed: 1000,
		pause: 2000,
		animation: 'fade',
		mousePause: false,
		showItems: 1
	});
});
