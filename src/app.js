/**
 * 
 * @authors Tony.Deng (dengtongyu123@163.com)
 * @date    2018-05-23 09:56:40
 * @version $Id$
 */

var tpl = function(obj) {
	var html = '<div class="pop_box">' +
		'<div class="pop_main">' +
		'<div class="pop_icon">' +
		'<img src="{{img}}">' +
		'</div>' +
		'<p>{{massge}}</p>' +
		'<a href="https://www.google.cn/chrome/" target="_blank">下载浏览器(官网)</a>' +
		'<a href="http://www.chromeliulanqi.com/" target="_blank">下载浏览器(镜像)</a>' +
		'<a id="visit-btn" href="javascript:;">继续访问</a>' +
		'</div>' +
		'</div>';
	html = html.replace('{{img}}', obj.img);
	html = html.replace('{{massge}}', obj.massge);
	return html;
};

var style = ".pop_box{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#fff;z-index:100;}.pop_box>.pop_main{width:100%;height:100%;text-align:center;overflow:hidden;font-family: 'Microsoft YaHei';}.pop_box>.pop_main>.pop_icon{width:40%;max-width:150px;max-height:150px;margin:10% auto 0;}.pop_box>.pop_main>.pop_icon>img{width:100%}.pop_box>.pop_main>p{color:#666;font-size:14px;margin:30px}.pop_box>.pop_main>a{width:30%;height:36px;max-width:150px;max-height:36px;line-height:36px;display:block;margin:0 auto 15px;text-decoration:none;color:#1296db;border:2px solid #1296db;border-radius:5px;background-color:#fff;font-size:14px;-webkit-tap-highlight-color:rgba(255,255,255,0);-webkit-focus-ring-color:rgba(0,0,0,0);outline:none;cursor:pointer;font-family:'Microsoft YaHei';}.pop_box>.pop_main>a:hover{color:#fff;background-color:#1296db}.pop_box>.pop_main>a:active{color:#fff;background-color:#1296db}";

var config = {
	img: 'https://vipweb.bs2cdn.yy.com/vipinter_e6d16e528b1541618b7c9c97d251e9da.png',
	massge: '您的浏览器版本过低，可能会影响网页的正常显示',
	refuse: '',
	ie: 0,
	continueFunction: null
}

var ua = navigator.userAgent.toLowerCase();

var isShow = false;

var alertNode = null,
	styleNode = null,
	continueBtn = null;


var isString = function(str) {
	if (typeof str == 'string') return true;

	return false;
}

var isArray = function(arr) {
	if (arr instanceof Array) return true;

	return false;
}

var isFunction = function(fn) {
	if (typeof fn == 'function') return true;

	return false;
}

var extend = function(target, source) {
	for (var obj in source) {
		target[obj] = source[obj];
	}
	return target;
}

var createDom = function(html) {
	var tempDom = document.createElement('div');
	tempDom.innerHTML = html;
	var dom = tempDom.childNodes
	return dom[0];
};

//绑定监听事件
var addEventHandler = function(target, type, fn) {
	if (target.addEventListener) {
		target.addEventListener(type, fn);
	} else {
		target.attachEvent("on" + type, fn);
	}
}

//移除监听事件
var removeEventHandler = function(target, type, fn) {
	if (target.removeEventListener) {
		target.removeEventListener(type, fn);
	} else {
		target.detachEvent("on" + type, fn);
	}
}

var cssSupports = function(prop) {
	var div = document.createElement('div');
	if (prop in div.style) return true;
	return false;
};

var insertStyle = function(str) {
	var sty = document.createElement('style');
	sty.type = 'text/css';
	if (sty.styleSheet) {
		sty.styleSheet.cssText = str;
	} else {
		sty.innerHTML = str;
	}

	document.getElementsByTagName('head')[0].appendChild(sty);
	return sty;
}

var continueFunction = function(event) {
	hide();

	if (isFunction(config.continueFunction)) config.continueFunction(event);
}

var use = function(options) {
	config = extend(config, options);

	isShow = false;

	if (config.refuse && isString(config.refuse)) {
		isShow = isShow || (!cssSupports(config.refuse));
	}

	if (isArray(config.refuse) && config.refuse.length > 0) {
		for (var i = 0; i < config.refuse.length; i++) {
			isShow = isShow || (!cssSupports(config.refuse[i]));
		}
	}

	if (config.ie > 0) {
		var re = new RegExp('msie [6-' + config.ie + ']');
		isShow = isShow || re.test(ua);
	}

	if (isShow) {
		show();
	}
	
}


var show = function() {
	styleNode = insertStyle(style);

	var html = tpl(config);
	alertNode = createDom(html);
	document.getElementsByTagName('body')[0].appendChild(alertNode);

	continueBtn = document.getElementById('visit-btn');
	addEventHandler(continueBtn, 'click', continueFunction)
}

var hide = function() {
	removeEventHandler(continueBtn, 'click', continueFunction);
	document.getElementsByTagName('body')[0].removeChild(alertNode);
	document.getElementsByTagName('head')[0].removeChild(styleNode);
	alertNode = styleNode = continueBtn = null;
}

var status = function() {
	return {
		isShow: isShow
	}
}

exports.use = use;
exports.show = show;
exports.hide = hide;
exports.status = status;
