'use strict'

$(function() {

    // 定义当屏幕改变宽度触发的函数，根据屏幕宽度的大小，设置不同的图片
    function resize() {
        // 获取屏幕宽度
        var screenWidth = $(window).width();

        // 根据屏幕宽度设置图片的地址
        var isSmallScreen = screenWidth < 768;

        $("#main_ad > .carousel-inner > .item").each(function(index, el) {
            var $item = $(el);
            var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '">');
            } else {
                $item.empty();
            }
        });
    }
    // 给window委托resize事件，在手动出发一次resize函数
    $(window).on('resize', resize).trigger('resize');

    // 给tooltips初始化
    $('[data-toggle="tooltip"]').tooltip();

    /* 设置tab滚动条的宽度 */
    var $ulWrapper = $('.ul-wrapper > .nav-tabs');
    var width = 20; // 包裹在外面的ul有20px的padding
    $ulWrapper.children().each(function(index, element) {
            width += $(element).width();
        })
        /* 判断width与屏幕宽度进行比较 如果width大于屏幕宽度设置一下宽度 */
    if (width > $(window).width()) {
        $ulWrapper
            .width(width)
            .parent().css('overflow-x', 'scroll');
    }

    /* 设置新闻版块头部文字 */
    // 找到相应的元素a
    // 委托点击事件，改变新闻版块标题
    $('#news .nav-pills a').on('click', function() {
        var $this = $(this);
        var title = $this.data('title');
        $('#news .news-title').text(title);
    })

    /* 轮播图根据手指左右滑动 */
    // 获取页面上所有轮播图元素
    var $carousels = $('.carousel');
    var start = 0;
    var end = 0;
    var offset = 50;
    // 获取手指滑动方向
    // 获取手指开始所在位置
    // 获取手指移动时所在位置
    // 离开时，计算手指移动距离
    $carousels
        .on('touchstart', function(event) {
            start = event.originalEvent.touches[0].clientX;
        })
        .on('touchmove', function(event) {
            end = event.originalEvent.touches[0].clientX;
        })
        .on('touchend', function(event) {
            var distance = end - start;
            if (Math.abs(distance) > offset) {
                $(this).carousel(distance > 0 ? 'prev' : 'next');
            }
        });;;


    // 根据touchstart,touchend,touchmove,获取触摸点的clientX

    // 利用bootstrap提供的轮播图函数carousel,实现轮播图左右滑动


});
