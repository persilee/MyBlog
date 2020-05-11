$(function () {

  //新增看娘
  var jsonPaths = ['/live2dw/assets/hijiki.model.json', '/live2dw/assets/tororo.model.json'];
  var jsonPath = jsonPaths[Math.round(Math.random())];
  var opacityDefault = 0;
  var superSample = 0;
  var hOffset = 0;
  var vOffset = 0;
  if ($(window).width() <= 1024) {
    opacityDefault = 1;
    superSample = 1.6;
    hOffset = 6;
    vOffset = -116;
  } else {
    superSample = 1.8;
    opacityDefault = 0.8;
    hOffset = 0;
    vOffset = -126;
  }
  L2Dwidget.init({
    "pluginRootPath": "live2dw/",
    "pluginJsPath": "lib/",
    "pluginModelPath": "assets/",
    "model": {
      "jsonPath": jsonPath,
    },
    "display": {
      "superSample": superSample,
      "position": "left",
      "width": 90,
      "height": 220,
      "hOffset": hOffset,
      "vOffset": vOffset
    },
    "mobile": {
      "show": true,
      "scale": 0.8
    },
    "react": {
      "opacityDefault": opacityDefault,
      "opacityOnHover": 0.2
    }
  });

  // 将时间转为天数
  const padWithZeros = (vNumber, width) => {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
      numAsString = '0' + numAsString;
    }
    return numAsString;
  }
const dateFormat = (date) => {
  var vDay = padWithZeros(date.getDate(), 2);
  var vMonth = padWithZeros(date.getMonth() + 1, 2);
  var vYear = padWithZeros(date.getFullYear(), 2);
  // var vHour = padWithZeros(date.getHours(), 2);
  // var vMinute = padWithZeros(date.getMinutes(), 2);
  // var vSecond = padWithZeros(date.getSeconds(), 2);
  return {
    "counts": vDay,
    "text": vMonth + '月'
  };
}

  var timeAgo = function(date,data1) {
    try {
      var oldTime = date.getTime();
      var currTime = new Date().getTime();
      var diffValue = currTime - oldTime;
      var selectedMonth = date.getMonth() + 1;
      var selectedYear = date.getYear();
      var currYear = new Date().getYear();
      var currMonth = new Date().getMonth() + 1;
      var months = (currYear - selectedYear) * 12 + (currMonth - selectedMonth);
      date.setMonth(selectedMonth);
      date.setDate(0);
      var dayMany = date.getDate();
      var days = Math.floor(diffValue / (24 * 3600 * 1000));
      if (days === 0) {
        //计算相差小时数
        var leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        if (hours === 0) {
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000));
          if (minutes === 0) {
            //计算相差秒数
            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            return {
              "counts": seconds,
              "text": "秒前"
            };
          }
          return {
            "counts": minutes,
            "text": "分钟前"
          };
        }
        return {
          "counts": hours,
          "text": "小时前"
        };
      }
      if (days < 0){
        return {
          "counts": '😜',
          "text": "刚刚"
        };
      }
      if (days <= dayMany) {
        return {
          "counts": days,
          "text": "天前"
        };
      } else if (months<3) {
        return {
          "counts": months,
          "text": "月前"
        };
      }else {
        return dateFormat(data1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  $('.post-date').each(function(){
    $(this).find('.post-time-text').text(timeAgo(new Date($(this).data('datetime')), new Date($(this).data('datetime'))).text);
    $(this).find('.post-time-count').text(timeAgo(new Date($(this).data('datetime')), new Date($(this).data('datetime'))).counts);
  });



  //给归档加更新时间
  $('.archive .posts-collapse .post-title a>span.archive-title').each(function () {
    $(this).append('<span class="archive-updated"></span>').find('.archive-updated').html('更新于：<time class="updated">' + $(this).attr('updated') + '</time');
  });

  //给分类 li 加事件
  $('.category-all .category-list-item').on('click', function () {
    window.location.href = $(this).find('a').attr('href');
    return false;
  });
  // 调整 github logo 大小
  // $('.github-corner svg').width(60).height(60);
  //优化 用一次加载样式，避免多次重排、重绘
  $('.github-corner svg').css({"width":"60px","height":"60px"});

  POWERMODE.colorful = true; // ture 为启用礼花特效
  POWERMODE.shake = false; // false 为禁用震动特效
  document.body.addEventListener('input', POWERMODE);

  //让 header 适应 暗色 背景
  $('#header').addClass('dark').addClass('animated');
  $('.sidebar-toggle').on('click', function () {
    $('#header').toggleClass('header-has-sidebar');
  });

  $('.popup-trigger.faa-parent.animated-hover').on('click', function () {
    // $('.github-corner').hide();
    $('#main').hide();
    $('.sidebar-toggle').hide();
    $('.back-to-top.back-to-top-on').hide();
    $('#sidebar').hide();
    $('#header').removeClass('slideInDown');
    $('.local-search-popup .local-search-header').addClass('search-middle');
  });
  $('.popup-btn-close').on('click', function () {
    // $('.github-corner').show();
    $('#main').show();
    $('.sidebar-toggle').show();
    $('#sidebar').show();
    $('.back-to-top.back-to-top-on').show();
  })
  $('#local-search-input').on('change keydown', function () {
    $('.local-search-popup .local-search-header').removeClass('search-middle');
  });

  // 防抖动函数
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  // 简单的节流函数
  function throttle(func, wait, mustRun) {
    var timeout,
      startTime = new Date();
    return function () {
      var context = this,
        args = arguments,
        curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        func.apply(context, args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  };
  //给页面新增滚动进度条
  function scroll_fn() {
    var document_height = $(document).height();
    var scroll_so_far = $(window).scrollTop();
    var window_height = $(window).height();
    var max_scroll = document_height - window_height;
    var scroll_percentage = scroll_so_far / (max_scroll / 100);
    window.requestAnimationFrame(function(){
      $('#load').css('width', scroll_percentage + '%');
      if (scroll_percentage >= 99.5) {
        $('#load').hide();
      } else {
        $('#load').show();
      }
      if (scroll_so_far > 57) {
        $('#header').addClass('light-header').removeClass('dark');
      } else {
        $('#header').removeClass('light-header').addClass('dark');
      }
    });
  }
  // 鼠标往下滚动 隐藏 header , 鼠标往上滚动 显示 header
  var p = 0,
    t = 0;
  $(document).on("scroll", function (e) {
    throttle(scroll_fn,1000 / 60,100)();
    //用 window.requestAnimationFrame（）让读操作和写操作分离，把所有的写操作放到下一次重新渲染。
    p = $(this).scrollTop();
    if (t <= p) { //下滚
      if ($(window).scrollTop() > 10) {
        if (!$('#header').hasClass('slideOutUp')) $('#header').addClass('slideOutUp').removeClass('slideInDown');
        if ($('#load').hasClass('header')) $('#load').removeClass('header');
      }
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (typeof showMessage == 'function') showMessage('喵~ 页面到底了，点击右下角箭头 ⬆️ ，可回到顶部', 3000);
      }
    } else { //上滚
      if (!$('#load').hasClass('header')) $('#load').addClass('header');
      if ($('#header').hasClass('slideOutUp')) $('#header').removeClass('slideOutUp').addClass('slideInDown');
    }
    setTimeout(function () {
      t = p;
    }, 0);
  });
  $(window).resize(function () {
    //优化 添加 requestAnimationFrame
    throttle(scroll_fn, 1000 / 60, 100)();
    if ($(window).width() <= 990) {
      $('#header').removeClass('header-has-sidebar');
    } else if ($('#sidebar').width() > 0) {
      $('#header').addClass('header-has-sidebar');
    }
  });

  var _this = null;
  function UA(){
      if ($(_this).text().indexOf('Safari') == 0) {
        $(_this).prepend('<img class="Safari" src="/images/ua/Safari.svg">')
      } else if ($(_this).text().indexOf('Mac') == 0 || $(_this).text().indexOf('iOS') == 0) {
        $(_this).prepend('<img class="Apple" src="/images/ua/Apple.svg">')
      } else if ($(_this).text().indexOf('Chrome') == 0) {
        $(_this).prepend('<img class="Chrome" src="/images/ua/Chrome.svg">')
      } else if ($(_this).text().indexOf('Firefox') == 0) {
        $(_this).prepend('<img class="Firefox" src="/images/ua/Firefox.svg">')
      } else if ($(_this).text().indexOf('Windows 10') == 0) {
        $(_this).prepend('<img class="Windows10" src="/images/ua/windows10.svg">')
      } else if ($(_this).text().indexOf('Windows') == 0 || $(_this).text().indexOf('Windows 7') == 0 || $(_this).text().indexOf('Windows 8') == 0 || $(_this).text().indexOf('Windows 9') == 0) {
        $(_this).prepend('<img class="Windows7" src="/images/ua/windows7.svg">')
      } else if ($(_this).text().indexOf('Android') == 0) {
        $(_this).prepend('<img class="Android" src="/images/ua/Android.svg">')
      } else if ($(_this).text().indexOf('Ubuntu') == 0) {
        $(_this).prepend('<img class="Ubuntu" src="/images/ua/ubuntu.svg">')
      } else if ($(_this).text().indexOf('Linux') == 0) {
        $(_this).prepend('<img class="Linux" src="/images/ua/Linux.svg">')
      } else if ($(_this).text().indexOf('Microsoft Edge') == 0 || $(_this).text().indexOf('MSIE') == 0) {
        $(_this).prepend('<img class="IE" src="/images/ua/IE.png">')
      } else if ($(_this).text().indexOf('Sogou') == 0) {
        $(_this).prepend('<img class="sogou" src="/images/ua/sogou.svg">')
      } else if ($(_this).text().indexOf('XiaoMi') == 0) {
        $(_this).prepend('<img class="xiaomi" src="/images/ua/xiaomi.svg">')
      }
  };
  function isUA(){
    if($(window).width() <= 520){
      $(_this).text($(_this).text().split(' ').shift());
      UA();
    }else{
      UA();
    }
  };
  var addTipsTime = setInterval(function(){
    var text;
    if ($('#live2d-widget .per-tips').length == 0) {
      $('#live2d-widget').prepend('<div class="per-tips"></div >');
      if (jsonPath == '/live2dw/assets/hijiki.model.json')
        text = '喵~ 我是 <span style="color:#fdb9b9">hijiki&nbsp;🐱</span>...</br>';
      else
        text = '喵~ 我是 <span style="color:#fdb9b9">tororo&nbsp;🐱</span>...</br>';
      if (document.referrer !== '' && document.referrer !== 'https://h.lishaoy.net/') {
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        var domain = referrer.hostname.split('.')[1];
        if (referrer.hostname == 'h.lishaoy.net') {
          text += '欢迎来到&nbsp;<span style="color:rgba(239, 47, 17, 0.8);">『' + document.title.split(' | ')[0] + '』</span>,感谢您继续参观本站 🙂';
        } else if (domain == 'baidu') {
          text += '来自 百度搜索 的朋友<br>你是搜索 <span style="color:rgba(239, 47, 17, 0.8);">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        } else if (domain == 'so') {
          text += '来自 360搜索 的朋友<br>你是搜索 <span style="color:rgba(239, 47, 17, 0.8);">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        } else if (domain == 'google') {
          text += '来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:rgba(239, 47, 17, 0.8);">『' + document.title.split(' - ')[0] + '』</span>';
        } else {
          text += '来自<span style="color:rgba(239, 47, 17, 0.8);">&nbsp;' + referrer.hostname + '&nbsp;</span>的朋友,欢迎来到<span style="color:rgba(239, 47, 17, 0.8);">『' + document.title.split(' | ')[0] + '』</span>&nbsp;玩耍 🙂';
        }
      } else if (localStorage.getItem('ValineCache') !== ('' || null) && window.location.href == 'https://h.lishaoy.net/') {
        text += '<span style="color:rgba(239, 47, 17, 0.8);"><strong>&nbsp;' + JSON.parse(localStorage.getItem('ValineCache')).nick + '&nbsp;</strong></span>欢迎回来！要继续看 👀 些什么吗';
      } else {
        if (window.location.href == 'https://h.lishaoy.net/') { //如果是主页
          var now = (new Date()).getHours();
          if (now > 23 || now <= 5) {
            text += '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
          } else if (now > 5 && now <= 7) {
            text += '早上好！一日之计在于晨，美好的一天就要开始了';
          } else if (now > 7 && now <= 11) {
            text += '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
          } else if (now > 11 && now <= 14) {
            text += '中午了，工作了一个上午，现在是午餐时间！';
          } else if (now > 14 && now <= 17) {
            text += '午后很容易犯困呢，今天的运动目标完成了吗？';
          } else if (now > 17 && now <= 19) {
            text += '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
          } else if (now > 19 && now <= 21) {
            text += '晚上好，今天过得怎么样？';
          } else if (now > 21 && now <= 23) {
            text += '已经这么晚了呀，早点休息吧，晚安~';
          } else {
            text += '快来逗我玩吧！';
          }
        } else {
          text = '欢迎阅读<span style="color:rgba(239, 47, 17, 0.8);">『' + document.title.split(' | ')[0] + '』</span>';
        }
      }
      showMessage(text, 6000);
    } else {
      clearInterval(addTipsTime);
    }
  },100);

    var addUVTime_g = setInterval(function () {
      if ($('.vhead:first .vsys>img').length == 0) {
        $('.vhead .vsys').each(function () {
          _this = this;
          isUA();
        });
      } else {
        clearInterval(addUVTime_g);
      }
    }, 100);
    var addUBZime_g = setInterval(function () {
      if ($('.vhead .vname[href="https://h.lishaoy.net"]~.bozhu').length == 0) {
        $('.vhead .vname[href="https://h.lishaoy.net"]').after('<span class = "bozhu">博主</span>');
      } else if ($('.vhead .vname[href="https://lishaoy.net"]~.bozhu').length == 0) {
        $('.vhead .vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
      } else {
        clearInterval(addUBZime_g);
      };
    }, 100);

  $('.vsubmit.vbtn').on('click', function () {
    var addUVTime = setInterval(function () {
      if ($('.vhead:first .vsys>img').length == 0) {
        $('.vhead:first .vsys').each(function () {
          _this = this;
          isUA();
        });
      } else {
        clearInterval(addUVTime);
      }
    }, 1000);
    var addUBZime = setInterval(function () {
      if ($('.vhead').eq(0).find('.vname[href="https://h.lishaoy.net"]~.bozhu').length == 0 && $('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]~.bozhu').length == 0) {
        $('.vhead').eq(0).find('.vname[href="https://h.lishaoy.net"]').after('<span class = "bozhu">博主</span>');
        $('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
      } else {
        clearInterval(addUBZime);
      };
    }, 1000);
  });
  $(document).on('click','.vmore.vbtn',function(){
    var addUVTime = setInterval(function () {
      if ($('.vhead:last .vsys>img').length == 0) {
        $('.vhead .vsys').each(function () {
          if ($(this).html().indexOf('img') == -1){
            _this = this;
            isUA();
          }
        });
      } else {
        clearInterval(addUVTime);
      }
    }, 1000);
    var addUBZimeMore = setInterval(function () {
      if ($('.vhead:last .vname[href="https://h.lishaoy.net"]~.bozhu').length == 0 && $('.vhead:last .vname[href="https://lishaoy.net"]~.bozhu').length == 0) {
        $('.vhead .vname[href="https://lishaoy.net"]').each(function () {
          if ($(this).siblings('.bozhu').length == 0) {
            $(this).after('<span class = "bozhu">博主</span>');
          }
        });
        $('.vhead .vname[href="https://h.lishaoy.net"]').each(function(){
          if ($(this).siblings('.bozhu').length == 0){
            $(this).after('<span class = "bozhu">博主</span>');
          }
        });
      } else {
        clearInterval(addUBZimeMore);
      };
    }, 1000);
  })

  //百度统计
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a6c4f77e87e7fd898fd9fff81505d737";
    var s = document.getElementsByTagName("script")[0];
    var l = document.getElementsByTagName("script").length;
    var s = document.getElementsByTagName("script")[l - 1];
    s.parentNode.insertBefore(hm, s);
  })();
  //<!-- Global site tag (gtag.js) - Google Analytics -->
  // <script async src = "https://www.googletagmanager.com/gtag/js?id=UA-120619444-2">< /script>
  (function () {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-120619444-1');
  })();
  // service worker 缓存
  "serviceWorker" in navigator ? navigator.serviceWorker.register('/sw.js').then(function () {
    navigator.serviceWorker.controller ? console.log("Assets cached by the controlling service worker.") : console.log("Please reload this page to allow the service worker to handle network operations.")
  }).catch(function (e) {
    console.log("ERROR: " + e)
  }) : console.log("Service workers are not supported in the current browser.");
  $('img.hidden').parent('a.fancybox').css('display','none');
});

