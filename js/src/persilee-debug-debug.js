$(function () {

  // 调整 github logo 大小
  $('.github-corner svg').width(60).height(60);

  POWERMODE.colorful = true; // ture 为启用礼花特效
  POWERMODE.shake = false; // false 为禁用震动特效
  document.body.addEventListener('input', POWERMODE);

  //让 header 适应 暗色 背景
  $('#header').addClass('dark').addClass('animated');
  $('.sidebar-toggle').on('click', function () {
    $('#header').toggleClass('header-has-sidebar');
  });

  $('.popup-trigger.faa-parent.animated-hover').on('click',function(){
    $('.github-corner').hide();
    $('.sidebar-toggle').hide();
    $('.back-to-top.back-to-top-on').hide();
    $('#sidebar').hide();
    $('#header').removeClass('slideInDown');
    $('.local-search-popup .local-search-header').addClass('search-middle');
  });
  $('.popup-btn-close').on('click',function(){
    $('.github-corner').show();
    $('.sidebar-toggle').show();
    $('#sidebar').show();
    $('.back-to-top.back-to-top-on').show();
  })
  $('#local-search-input').on('change keydown',function(){
    $('.local-search-popup .local-search-header').removeClass('search-middle');
  });

  // 鼠标往上滚动 隐藏 header , 鼠标往下滚动 显示 header
  var p = 0,
      t = 0;
  $(document).on("scroll", function (e) {
    p = $(this).scrollTop();

    if (t <= p) { //下滚
      if ($(window).scrollTop() > 10) {
        $('#header').addClass('slideOutUp').removeClass('slideInDown');
      }
    } else { //上滚
      $('#header').removeClass('slideOutUp').addClass('slideInDown');
    }
    setTimeout(function () {
      t = p;
    }, 0);
  });

  // 给页面新增滚动进度条
  function scroll_fn() {
    var document_height = $(document).height();
    var scroll_so_far = $(window).scrollTop();
    var window_height = $(window).height();
    var max_scroll = document_height - window_height;
    var scroll_percentage = scroll_so_far / (max_scroll / 102);
    $('#load').width(scroll_percentage + '%');
    if (scroll_percentage >= 100){
      $('#load').hide();
    }else{
      $('#load').show();
    }
    var document_width = $(document).width();
    if (scroll_so_far > 5) {
      $('#header').addClass('light-header').removeClass('dark');
    } else {
      $('#header').removeClass('light-header').addClass('dark');
    }
  }
  $(window).scroll(function () {
    scroll_fn();
  });
  $(window).resize(function () {
    scroll_fn();
    if ($(window).width() <= 990) {
      $('#header').removeClass('header-has-sidebar');
    } else if ($('#sidebar').width() > 0) {
      $('#header').addClass('header-has-sidebar');
    }
  });




  //新增看娘

  var jsonPaths = ['/live2dw/assets/hijiki.model.json','/live2dw/assets/tororo.model.json'];

  L2Dwidget.init({
    "pluginRootPath": "live2dw/",
    "pluginJsPath": "lib/",
    "pluginModelPath": "assets/",
    "model": {
      "jsonPath": jsonPaths[Math.round(Math.random())],
    },
    "display": {
      "superSample": 2,
      "position": "left",
      "width": 90,
      "height": 220,
      "hOffset": 5,
      "vOffset": -136
    },
    "mobile": {
      "show": true,
      "scale": 0.5
    },
    "react": {
      "opacityDefault": 0.75,
      "opacityOnHover": 0.2
    }
  });

  $(document).on('click','#live2d-widget',function(){
    console.log('aaa');
  });



  setTimeout(() => {
    $('.vhead .vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
    $('#live2d-widget').prepend('<div class="per-tips"></div >');
  }, 1500);

  $('.vsubmit.vbtn').on('click', function () {
    setTimeout(() => {
      if ($('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]~.bozhu')) {
        $('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
      }
    }, 1000);
  });
});
