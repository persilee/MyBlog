$(function(){var e=["/live2dw/assets/hijiki.model.json","/live2dw/assets/tororo.model.json"][Math.round(Math.random())],s=0;s=$(window).width()<=1024?1:.8,L2Dwidget.init({pluginRootPath:"live2dw/",pluginJsPath:"lib/",pluginModelPath:"assets/",model:{jsonPath:e},display:{superSample:1.8,position:"left",width:90,height:220,hOffset:8,vOffset:-126},mobile:{show:!0,scale:.5},react:{opacityDefault:s,opacityOnHover:.2}}),$(".archive .posts-collapse .post-title a>span.archive-title").each(function(){$(this).append('<span class="archive-updated"></span>').find(".archive-updated").html('更新于：<time class="updated">'+$(this).attr("updated")+"</time")}),$(".category-all .category-list-item").on("click",function(){return window.location.href=$(this).find("a").attr("href"),!1}),$(".github-corner svg").width(60).height(60),POWERMODE.colorful=!0,POWERMODE.shake=!1,document.body.addEventListener("input",POWERMODE),$("#header").addClass("dark").addClass("animated"),$(".sidebar-toggle").on("click",function(){$("#header").toggleClass("header-has-sidebar")}),$(".popup-trigger.faa-parent.animated-hover").on("click",function(){$(".sidebar-toggle").hide(),$(".back-to-top.back-to-top-on").hide(),$("#sidebar").hide(),$("#header").removeClass("slideInDown"),$(".local-search-popup .local-search-header").addClass("search-middle")}),$(".popup-btn-close").on("click",function(){$(".sidebar-toggle").show(),$("#sidebar").show(),$(".back-to-top.back-to-top-on").show()}),$("#local-search-input").on("change keydown",function(){$(".local-search-popup .local-search-header").removeClass("search-middle")});var t=0,a=0;function n(){var e=$(document).height(),s=$(window).scrollTop(),t=s/((e-$(window).height())/100);$("#load").width(t+"%"),t>=100?$("#load").hide():$("#load").show();$(document).width();s>57?$("#header").addClass("light-header").removeClass("dark"):$("#header").removeClass("light-header").addClass("dark")}$(document).on("scroll",function(e){t=$(this).scrollTop(),a<=t?($(window).scrollTop()>10&&$("#header").addClass("slideOutUp").removeClass("slideInDown"),$(window).scrollTop()==$(document).height()-$(window).height()&&showMessage("喵~ 页面到底了，点击右下角箭头 ⬆️ ，可回到顶部",3e3)):$("#header").removeClass("slideOutUp").addClass("slideInDown"),setTimeout(function(){a=t},0)}),$(window).scroll(function(){n()}),$(window).resize(function(){n(),$(window).width()<=990?$("#header").removeClass("header-has-sidebar"):$("#sidebar").width()>0&&$("#header").addClass("header-has-sidebar")});var i=null;function o(){0==$(i).text().indexOf("Safari")?$(i).prepend('<img class="Safari" src="/images/ua/Safari.svg">'):0==$(i).text().indexOf("Mac OS")||0==$(i).text().indexOf("iOS")?$(i).prepend('<img class="Apple" src="/images/ua/Apple.svg">'):0==$(i).text().indexOf("Chrome")?$(i).prepend('<img class="Chrome" src="/images/ua/Chrome.svg">'):0==$(i).text().indexOf("Firefox")?$(i).prepend('<img class="Firefox" src="/images/ua/Firefox.svg">'):0==$(i).text().indexOf("Windows 10")?$(i).prepend('<img class="Windows10" src="/images/ua/windows10.svg">'):0==$(i).text().indexOf("Windows 7")||0==$(i).text().indexOf("Windows 8")||0==$(i).text().indexOf("Windows 9")?$(i).prepend('<img class="Windows7" src="/images/ua/windows7.svg">'):0==$(i).text().indexOf("Android")?$(i).prepend('<img class="Android" src="/images/ua/Android.svg">'):0==$(i).text().indexOf("Ubuntu")?$(i).prepend('<img class="Ubuntu" src="/images/ua/ubuntu.svg">'):0!=$(i).text().indexOf("Microsoft Edge")&&0!=$(i).text().indexOf("MSIE")||$(i).prepend('<img class="Ubuntu" src="/images/ua/ie.png">')}var l=setInterval(function(){var s;if(0==$("#live2d-widget .per-tips").length){if($("#live2d-widget").prepend('<div class="per-tips"></div >'),s="/live2dw/assets/hijiki.model.json"==e?'喵~ 我是 <span style="color:#fdb9b9">hijiki&nbsp;🐱</span>...</br>':'喵~ 我是 <span style="color:#fdb9b9">tororo&nbsp;🐱</span>...</br>',""!==document.referrer&&"https://lishaoy.net/"!==document.referrer){var t=document.createElement("a");t.href=document.referrer;var a=t.hostname.split(".")[1];"lishaoy.net"==t.hostname?s+='欢迎来到&nbsp;<span style="color:#0099cc;">『'+document.title.split(" | ")[0]+"』</span>,感谢您继续参观本站 🙂":s+="baidu"==a?'来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&wd=")[1].split("&")[0]+"</span> 找到的我吗？":"so"==a?'来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&q=")[1].split("&")[0]+"</span> 找到的我吗？":"google"==a?'来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>":'来自<span style="color:#0099cc;">&nbsp;'+t.hostname+'&nbsp;</span>的朋友,欢迎来到<span style="color:#0099cc;">『'+document.title.split(" | ")[0]+"』</span>&nbsp;玩耍 🙂"}else if(null!==localStorage.getItem("ValineCache")&&"https://lishaoy.net/"==window.location.href)s+='<span style="color:#0099cc;"><strong>&nbsp;'+JSON.parse(localStorage.getItem("ValineCache")).nick+"&nbsp;</strong></span>欢迎回来！要继续看 👀 些什么吗";else if("https://lishaoy.net/"==window.location.href){var n=(new Date).getHours();s+=n>23||n<=5?"你是夜猫子呀？这么晚还不睡觉，明天起的来嘛":n>5&&n<=7?"早上好！一日之计在于晨，美好的一天就要开始了":n>7&&n<=11?"上午好！工作顺利嘛，不要久坐，多起来走动走动哦！":n>11&&n<=14?"中午了，工作了一个上午，现在是午餐时间！":n>14&&n<=17?"午后很容易犯困呢，今天的运动目标完成了吗？":n>17&&n<=19?"傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~":n>19&&n<=21?"晚上好，今天过得怎么样？":n>21&&n<=23?"已经这么晚了呀，早点休息吧，晚安~":"快来逗我玩吧！"}else s='欢迎阅读<span style="color:#0099cc;">『'+document.title.split(" | ")[0]+"』</span>";showMessage(s,6e3)}else clearInterval(l)},100),r=setInterval(function(){0==$(".vhead:first .vsys>img").length?$(".vhead .vsys").each(function(){i=this,o()}):clearInterval(r)},100),d=setInterval(function(){0==$('.vhead .vname[href="https://lishaoy.net"]~.bozhu').length?$('.vhead .vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>'):clearInterval(d)},100);$(".vsubmit.vbtn").on("click",function(){var e=setInterval(function(){0==$(".vhead:first .vsys>img").length?$(".vhead:first .vsys").each(function(){i=this,o()}):clearInterval(e)},1e3),s=setInterval(function(){0==$(".vhead").eq(0).find('.vname[href="https://lishaoy.net"]~.bozhu').length?$(".vhead").eq(0).find('.vname[href="https://lishaoy.net"]').after('<span class = "bozhu">博主</span>'):clearInterval(s)},1e3)}),$(document).on("click",".vmore.vbtn",function(){var e=setInterval(function(){0==$(".vhead:last .vsys>img").length?$(".vhead .vsys").each(function(){-1==$(this).html().indexOf("img")&&(i=this,o())}):clearInterval(e)},1e3),s=setInterval(function(){0==$('.vhead:last .vname[href="https://lishaoy.net"]~.bozhu').length?$('.vhead .vname[href="https://lishaoy.net"]').each(function(){0==$(this).siblings(".bozhu").length&&$(this).after('<span class = "bozhu">博主</span>')}):clearInterval(s)},1e3)})});