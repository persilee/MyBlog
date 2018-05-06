$(function () {

  //新增看娘
  var jsonPaths = ['/live2dw/assets/hijiki.model.json', '/live2dw/assets/tororo.model.json'];
  var jsonPath = jsonPaths[Math.round(Math.random())];
  var opacityDefault = 0;
  if ($(window).width() <= 1024) {
    opacityDefault = 1;
  }else{
    opacityDefault = 0.8;
  }
  L2Dwidget.init({
    "pluginRootPath": "live2dw/",
    "pluginJsPath": "lib/",
    "pluginModelPath": "assets/",
    "model": {
      "jsonPath": jsonPath,
    },
    "display": {
      "superSample": 1.8,
      "position": "left",
      "width": 90,
      "height": 220,
      "hOffset": 8,
      "vOffset": -126
    },
    "mobile": {
      "show": true,
      "scale": 0.5
    },
    "react": {
      "opacityDefault": opacityDefault,
      "opacityOnHover": 0.2
    }
  });

  //给归档加更新时间
  $('.archive .posts-collapse .post-title a>span.archive-title').each(function(){
    $(this).append('<span class="archive-updated"></span>').find('.archive-updated').html('更新于：<time class="updated">' + $(this).attr('updated') + '</time');
  });

  //给分类 li 加事件
  $('.category-all .category-list-item').on('click',function(){
    window.location.href = $(this).find('a').attr('href');
    return false;
  });
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
    // $('.github-corner').hide();
    $('.sidebar-toggle').hide();
    $('.back-to-top.back-to-top-on').hide();
    $('#sidebar').hide();
    $('#header').removeClass('slideInDown');
    $('.local-search-popup .local-search-header').addClass('search-middle');
  });
  $('.popup-btn-close').on('click',function(){
    // $('.github-corner').show();
    $('.sidebar-toggle').show();
    $('#sidebar').show();
    $('.back-to-top.back-to-top-on').show();
  })
  $('#local-search-input').on('change keydown',function(){
    $('.local-search-popup .local-search-header').removeClass('search-middle');
  });

  // 鼠标往上滚动 隐藏 header , 鼠标往下滚动 显示 header
  // var p = 0,
  //     t = 0;
  // $(document).on("scroll", function (e) {
  //   p = $(this).scrollTop();

  //   if (t <= p) { //下滚
  //     if ($(window).scrollTop() > 10) {
  //       $('#header').addClass('slideOutUp').removeClass('slideInDown');
  //     }
  //     if ($(window).scrollTop() == $(document).height() - $(window).height()) showMessage('喵~ 页面到底了，点击右下角箭头 ⬆️ ，可回到顶部', 3000);
  //   } else { //上滚
  //     $('#header').removeClass('slideOutUp').addClass('slideInDown');
  //   }
  //   setTimeout(function () {
  //     t = p;
  //   }, 0);
  // });

  // 给页面新增滚动进度条
  // function scroll_fn() {
  //   var document_height = $(document).height();
  //   var scroll_so_far = $(window).scrollTop();
  //   var window_height = $(window).height();
  //   var max_scroll = document_height - window_height;
  //   var scroll_percentage = scroll_so_far / (max_scroll / 100);
  //   $('#load').width(scroll_percentage + '%');
  //   if (scroll_percentage >= 100){
  //     $('#load').hide();
  //   }else{
  //     $('#load').show();
  //   }
  //   var document_width = $(document).width();
  //   if (scroll_so_far > 57) {
  //     $('#header').addClass('light-header').removeClass('dark');
  //   } else {
  //     $('#header').removeClass('light-header').addClass('dark');
  //   }
  // }
  // $(window).scroll(function () {
  //   scroll_fn();
  // });
  // $(window).resize(function () {
  //   scroll_fn();
  //   if ($(window).width() <= 990) {
  //     $('#header').removeClass('header-has-sidebar');
  //   } else if ($('#sidebar').width() > 0) {
  //     $('#header').addClass('header-has-sidebar');
  //   }
  // });

  // var _this = null;
  // function isUA(){
  //   if ($(_this).text().indexOf('Safari') == 0) {
  //     $(_this).prepend('<img class="Safari" src="/images/ua/Safari.svg">')
  //   } else if ($(_this).text().indexOf('Mac OS') == 0 || $(_this).text().indexOf('iOS') == 0) {
  //     $(_this).prepend('<img class="Apple" src="/images/ua/Apple.svg">')
  //   } else if ($(_this).text().indexOf('Chrome') == 0) {
  //     $(_this).prepend('<img class="Chrome" src="/images/ua/Chrome.svg">')
  //   } else if ($(_this).text().indexOf('Firefox') == 0) {
  //     $(_this).prepend('<img class="Firefox" src="/images/ua/Firefox.svg">')
  //   } else if ($(_this).text().indexOf('Windows 10') == 0) {
  //     $(_this).prepend('<img class="Windows10" src="/images/ua/windows10.svg">')
  //   } else if ($(_this).text().indexOf('Windows 7') == 0 || $(_this).text().indexOf('Windows 8') == 0 || $(_this).text().indexOf('Windows 9') == 0) {
  //     $(_this).prepend('<img class="Windows7" src="/images/ua/windows7.svg">')
  //   } else if ($(_this).text().indexOf('Android') == 0) {
  //     $(_this).prepend('<img class="Android" src="/images/ua/Android.svg">')
  //   } else if ($(_this).text().indexOf('Ubuntu') == 0) {
  //     $(_this).prepend('<img class="Ubuntu" src="/images/ua/ubuntu.svg">')
  //   } else if ($(_this).text().indexOf('Microsoft Edge') == 0 || $(_this).text().indexOf('MSIE') == 0) {
  //     $(_this).prepend('<img class="Ubuntu" src="/images/ua/ie.png">')
  //   }
  // };
  // var addTipsTime = setInterval(function(){
  //   var text;
  //   if ($('#live2d-widget .per-tips').length == 0) {
  //     $('#live2d-widget').prepend('<div class="per-tips"></div >');
  //     if (jsonPath == '/live2dw/assets/hijiki.model.json')
  //       text = '喵~ 我是 <span style="color:#fdb9b9">hijiki&nbsp;🐱</span>...</br>';
  //     else
  //       text = '喵~ 我是 <span style="color:#fdb9b9">tororo&nbsp;🐱</span>...</br>';
  //     if (document.referrer !== '' && document.referrer !== 'https://lishaoy.net/') {
  //       var referrer = document.createElement('a');
  //       referrer.href = document.referrer;
  //       var domain = referrer.hostname.split('.')[1];
  //       if (referrer.hostname == 'lishaoy.net') {
  //         text += '欢迎来到&nbsp;<span style="color:#0099cc;">『' + document.title.split(' | ')[0] + '』</span>,感谢您继续参观本站 🙂';
  //       } else if (domain == 'baidu') {
  //         text += '来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
  //       } else if (domain == 'so') {
  //         text += '来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
  //       } else if (domain == 'google') {
  //         text += '来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
  //       } else {
  //         text += '来自<span style="color:#0099cc;">&nbsp;' + referrer.hostname + '&nbsp;</span>的朋友,欢迎来到<span style="color:#0099cc;">『' + document.title.split(' | ')[0] + '』</span>&nbsp;玩耍 🙂';
  //       }
  //     } else if (localStorage.getItem('ValineCache') !== ('' || null) && window.location.href == 'https://lishaoy.net/') {
  //       text += '<span style="color:#0099cc;"><strong>&nbsp;' + JSON.parse(localStorage.getItem('ValineCache')).nick + '&nbsp;</strong></span>欢迎回来！要继续看 👀 些什么吗';
  //     } else {
  //       if (window.location.href == 'https://lishaoy.net/') { //如果是主页
  //         var now = (new Date()).getHours();
  //         if (now > 23 || now <= 5) {
  //           text += '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
  //         } else if (now > 5 && now <= 7) {
  //           text += '早上好！一日之计在于晨，美好的一天就要开始了';
  //         } else if (now > 7 && now <= 11) {
  //           text += '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
  //         } else if (now > 11 && now <= 14) {
  //           text += '中午了，工作了一个上午，现在是午餐时间！';
  //         } else if (now > 14 && now <= 17) {
  //           text += '午后很容易犯困呢，今天的运动目标完成了吗？';
  //         } else if (now > 17 && now <= 19) {
  //           text += '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
  //         } else if (now > 19 && now <= 21) {
  //           text += '晚上好，今天过得怎么样？';
  //         } else if (now > 21 && now <= 23) {
  //           text += '已经这么晚了呀，早点休息吧，晚安~';
  //         } else {
  //           text += '快来逗我玩吧！';
  //         }
  //       } else {
  //         text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' | ')[0] + '』</span>';
  //       }
  //     }
  //     showMessage(text, 6000);
  //   } else {
  //     clearInterval(addTipsTime);
  //   }
  // },100);

  //   var addUVTime_g = setInterval(function () {
  //     if ($('.vhead:first .vsys>img').length == 0) {
  //       $('.vhead .vsys').each(function () {
  //         _this = this;
  //         isUA();
  //       });
  //     } else {
  //       clearInterval(addUVTime_g);
  //     }
  //   }, 100);
  //   var addUBZime_g = setInterval(function () {
  //     if ($('.vhead .vname[href="https://lishaoy.net"]~.bozhu').length == 0) {
  //       $('.vhead .vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
  //     } else {
  //       clearInterval(addUBZime_g);
  //     };
  //   }, 100);

  // $('.vsubmit.vbtn').on('click', function () {
  //   var addUVTime = setInterval(function () {
  //     if ($('.vhead:first .vsys>img').length == 0) {
  //       $('.vhead:first .vsys').each(function () {
  //         _this = this;
  //         isUA();
  //       });
  //     } else {
  //       clearInterval(addUVTime);
  //     }
  //   }, 1000);
  //   var addUBZime = setInterval(function () {
  //     if ($('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]~.bozhu').length == 0) {
  //       $('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
  //     } else {
  //       clearInterval(addUBZime);
  //     };
  //   }, 1000);
  // });
  // $(document).on('click','.vmore.vbtn',function(){
  //   var addUVTime = setInterval(function () {
  //     if ($('.vhead:last .vsys>img').length == 0) {
  //       $('.vhead .vsys').each(function () {
  //         if ($(this).html().indexOf('img') == -1){
  //           _this = this;
  //           isUA();
  //         }
  //       });
  //     } else {
  //       clearInterval(addUVTime);
  //     }
  //   }, 1000);
  //   var addUBZime = setInterval(function () {
  //     if ($('.vhead:last .vname[href="https://lishaoy.net"]~.bozhu').length  == 0) {
  //       $('.vhead .vname[href="https://lishaoy.net"]').each(function(){
  //         if ($(this).siblings('.bozhu').length == 0){
  //           $(this).after('<span class = "bozhu">博主</span>');
  //         }
  //       });
  //     } else {
  //       clearInterval(addUBZime);
  //     };
  //   }, 1000);
  // })
});
