!function(e,t,a){var r,o=[];e.requestAnimationFrame=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)},function(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),r="function"==typeof e.onclick&&e.onclick,e.onclick=function(e){var a,n;r&&r(),a=e,(n=t.createElement("div")).className="heart",o.push({el:n,x:a.clientX-5,y:a.clientY-5,scale:1,alpha:1,color:"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}),t.body.appendChild(n)},function e(){for(var a=0;a<o.length;a++)o[a].alpha<=0?(t.body.removeChild(o[a].el),o.splice(a,1)):(o[a].y--,o[a].scale+=.004,o[a].alpha-=.013,o[a].el.style.cssText="left:"+o[a].x+"px;top:"+o[a].y+"px;opacity:"+o[a].alpha+";transform:scale("+o[a].scale+","+o[a].scale+") rotate(45deg);background:"+o[a].color+";z-index:99999");requestAnimationFrame(e)}()}(window,document);