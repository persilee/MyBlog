
POWERMODE.colorful = true; // ture 为启用礼花特效
POWERMODE.shake = false; // false 为禁用震动特效
document.body.addEventListener('input', POWERMODE);

// 页面滚动进度条
$(function () {

  $('#header').addClass('dark');

  $('.sidebar-toggle').on('click',function(){

      $('#header').toggleClass('header-has-sidebar');


  });

  function scroll_fn() {
    document_height = $(document).height();
    scroll_so_far = $(window).scrollTop();
    window_height = $(window).height();
    max_scroll = document_height - window_height;
    scroll_percentage = scroll_so_far / (max_scroll / 102);
    $('#load').width(scroll_percentage + '%');
    var document_width = $(document).width();
    if (scroll_so_far && document_width >= 768) {
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
    if ($(window).width() <= 990){
      $('#header').removeClass('header-has-sidebar');
    } else if ($('#sidebar').width() > 0){
      $('#header').addClass('header-has-sidebar');
    }
  });

  setTimeout(() => {
    $('.vhead .vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
  }, 500);

  $('.vsubmit.vbtn').on('click',function(){
    setTimeout(() => {
      console.log('aaa');
      if (!$('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]~.bozhu')){
        $('.vhead').eq(0).find('.vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>');
      }

    }, 1000);
  });


});



