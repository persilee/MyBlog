function render(e,t){return e.replace(/(\\)?\{([^\{\}\\]+)(\\)?\}/g,function(e,o,r,n){if(o||n)return e.replace("\\","");var s,a,c=r.replace(/\s/g,"").split("."),l=t;for(s=0,a=c.length;s<a;++s)if(void 0===(l=l[c[s]])||null===l)return"";return l})}String.prototype.render=function(e){return render(this,e)};var re=/x/;function showHitokoto(){$.getJSON("https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json",function(e){showMessage(e.hitokoto,5e3)})}function showMessage(e,t){Array.isArray(e)&&(e=e[Math.floor(Math.random()*e.length+1)-1]),$(".per-tips").stop(),$(".per-tips").html(e).fadeTo(200,1),null===t&&(t=5e3),hideMessage(t)}function hideMessage(e){$(".per-tips").stop().css("opacity",1),null===e&&(e=5e3),$(".per-tips").delay(e).fadeTo(200,0)}console.log(re),re.toString=function(){return showMessage("哈哈，你打开了控制台，是想要看看我的秘密吗？",5e3),""},$(document).on("copy",function(){showMessage("你都复制了些什么呀，转载要记得加上出处哦",5e3)}),$.ajax({cache:!0,url:"../live2dw/data/perTips.json",dataType:"json",success:function(e){$.each(e.mouseover,function(e,t){$(document).on("mouseover",t.selector,function(){var e=t.text;Array.isArray(t.text)&&(e=t.text[Math.floor(Math.random()*t.text.length+1)-1]),showMessage(e=e.render({text:$(this).text()}),3e3)})}),$.each(e.click,function(e,t){$(document).on("click",t.selector,function(){var e=t.text;Array.isArray(t.text)&&(e=t.text[Math.floor(Math.random()*t.text.length+1)-1]),showMessage(e=e.render({text:$(this).text()}),3e3)})})}}),function(){var e;if(""!==document.referrer){var t=document.createElement("a");t.href=document.referrer,e='Hello! 来自 <span style="color:#0099cc;">'+t.hostname+"</span> 的朋友";var o=t.hostname.split(".")[1];"baidu"==o?e='Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&wd=")[1].split("&")[0]+"</span> 找到的我吗？":"so"==o?e='Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&q=")[1].split("&")[0]+"</span> 找到的我吗？":"google"==o&&(e='Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>")}else if("https://lishaoy.net/"==window.location.href){var r=(new Date).getHours();e=r>23||r<=5?"喵~ 你是夜猫子呀？这么晚还不睡觉，明天起的来嘛":r>5&&r<=7?"早上好！一日之计在于晨，美好的一天就要开始了":r>7&&r<=11?"上午好！工作顺利嘛，不要久坐，多起来走动走动哦！":r>11&&r<=14?"中午了，工作了一个上午，现在是午餐时间！":r>14&&r<=17?"午后很容易犯困呢，今天的运动目标完成了吗？":r>17&&r<=19?"傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~":r>19&&r<=21?"晚上好，今天过得怎么样？":r>21&&r<=23?"已经这么晚了呀，早点休息吧，晚安~":"嗨~ 快来逗我玩吧！"}else e='欢迎阅读<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>";showMessage(e,6e3)}(),window.setInterval(showHitokoto,3e4);