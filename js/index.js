window.onload = function(){

    function Banner($banner, $picList, $picWidth, $tab, $btn, $i){
        this.$banner = $banner;
        this.$picList = $picList;
        this.$picWidth = $picWidth;
        this.$tab = $tab;
        this.$tabLength = $tab.length;
        this.$btn = $btn;
        this.$index = 0;
        this.$i = $i;
        this.$isI = $i!==undefined;
        this.timer = null;
    }
    //用于调用需要执行的函数
    Banner.prototype.exe = function(){
        this.init();
    };
    //注册Banner的事件
    Banner.prototype.init = function(){
        var This = this;
        //tab点击事件
        This.$tab.click(function(){
            This.$index = $(this).index();
            This.$picList.animate({
                "left" : -This.$index*This.$picWidth
            },300);
            $(this).addClass('on').siblings().removeClass('on');
            This.$isI&&This.$i.html(This.$index+1);
        });
        var $delay = false;     //是否被点击(避免急速点击)
        //左右按钮点击事件
        This.$btn.click(function(){
            if(!$delay){
                if($(this).index()){
                    //右
                    This.$index++;
                    This.$index%=This.$tabLength;
                }else{
                    //左
                    This.$index--;
                    if(This.$index<0)This.$index=This.$tabLength-1;
                }
                change(This, This.$tab.eq(This.$index));
                This.$isI&&This.$i.html(This.$index+1);


                $delay = true;
                setTimeout(function(){
                    $delay = false;
                },300);
            }
        });

        //自动播放
        function autoPlay(){
            This.$index++;
            This.$index%=This.$tabLength;
            change(This, This.$tab.eq(This.$index));
            This.$isI&&This.$i.html(This.$index+1);
            return autoPlay;
        };
        This.timer = setInterval(autoPlay,2000);

        This.$banner.hover(function(){
            clearInterval(This.timer);
        },function(){
            This.timer = setInterval(autoPlay,2000);
        });

        function change(This, tab){
            This.$picList.animate({"left" : -This.$index*This.$picWidth},300);
            tab.addClass('on').siblings().removeClass('on');
        }
    };

    //banner1
    var $banner1 = $('.main .banner1'),
        $picList = $banner1.find('.picList'),
        $picWidth = $picList.find('li').eq(0).width(),
        $tab = $banner1.find('.tab i'),
        $btn = $banner1.find('.btnList .btn');

    var Banner1 = new Banner($banner1 ,$picList, $picWidth, $tab, $btn);
    Banner1.exe();

    //banner2
    var $banner2 = $('.main .banner2'),
        $picList = $banner2.find('.piclist'),
        $picWidth = $picList.find('li').eq(0).width(),
        $tab = $banner2.find('.tab i'),
        $btn = $banner2.find('.btnList .btn'),
        $i = $banner2.find('.header span i');

    var Banner2 = new Banner($banner2 ,$picList, $picWidth, $tab, $btn, $i);
    Banner2.exe();


};