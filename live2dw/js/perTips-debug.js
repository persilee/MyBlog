function render(template, context) {

  var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '');
    }

    var variables = token.replace(/\s/g, '').split('.');
    var currentObject = context;
    var i, length, variable;

    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i];
      currentObject = currentObject[variable];
      if (currentObject === undefined || currentObject === null) return '';
    }
    return currentObject;
  });
}
String.prototype.render = function (context) {
  return render(this, context);
};

var re = /x/;
re.toString = function () {
  showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 6000);
  return '';
};

$(document).on('copy', function () {
  showMessage('你都复制了些什么呀，转载要记得加上出处哦', 6000);
});

var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0, pos);
$.ajax({
  cache: true,
  url: localhostPaht + "/live2dw/data/perTips.json",
  dataType: "json",
  success: function (result) {
    $.each(result.mouseover, function (index, tips) {
      $(document).on("mouseover", tips.selector, function () {
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        text = text.render({ text: $(this).text() });
        showMessage(text, 6000);
        return false;
      });
    });
    $.each(result.click, function (index, tips) {
      $(document).on("click", tips.selector, function () {
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        text = text.render({ text: $(this).text() });
        showMessage(text, 6000);
        return false;
      });
    });
  }
});

window.setInterval(showHitokoto, 30000);

function showHitokoto() {
  $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json', function (result) {
    showMessage(result.hitokoto, 6000);
  });
}

function showMessage(text, timeout) {
  if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
  $('.per-tips').stop();
  $('.per-tips').html(text).fadeTo(200, 1);
  if (timeout === null) timeout = 6000;
  hideMessage(timeout);
}
function hideMessage(timeout) {
  $('.per-tips').stop().css('opacity', 1);
  if (timeout === null) timeout = 6000;
  $('.per-tips').delay(timeout).fadeTo(200, 0);
}
