/**
 * jQuery的Ajax请求全局设置，防止重复提交请求
 * 参见：http://www.zhihu.com/question/19805411
 *
 * @author yulewei
 */
var ajaxPendingRequests = {};
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	if (!options.abortOnRetry) {
		return;
	}
	var key = {url: options.url, data: options.data};
	var keyStr = JSON.stringify(key);
	if (ajaxPendingRequests[keyStr]) {
		jqXHR.abort(); // 丢弃重复的请求
	} else {
		ajaxPendingRequests[keyStr] = true;
	}

	var completeOrig = options.complete;
	options.complete = function (jqXHR, textStatus) {
		ajaxPendingRequests[keyStr] = null;
		if ($.isFunction(completeOrig)) {
			completeOrig(jqXHR, textStatus);
		}
	};
});

/**
 * 显示layer等待加载层
 */
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	if (!options.showLoading) {
		return;
	}

	var loadingIndex;
	var beforeSendOrig = options.beforeSend;
	options.beforeSend = function (jqXHR, settings) {
		loadingIndex = layer.load();
		if ($.isFunction(beforeSendOrig)) {
			beforeSendOrig(jqXHR, settings);
		}
	};

	var completeOrig = options.complete;
	options.complete = function (jqXHR, textStatus) {
		layer.close(loadingIndex);
		if ($.isFunction(completeOrig)) {
			completeOrig(jqXHR, textStatus);
		}
	};
});

$.ajaxSetup({
	cache: false,
	error: function (jqXHR, textStatus, errorMsg) {
		var status = jqXHR.status;
		if (status == 405) {
			layer.msg('不支持的方法');
		} else if (status == 401) {
			// needLogin
			layer.msg('会话失效，请重新登录');
			setTimeout(location.reload(), 1000);
		} else if (status == 403) {
			var headerMsg = jqXHR.getResponseHeader('msg');
			layer.msg(headerMsg || '系统错误，请稍后再试');
		} else if (status == 400) {
			layer.msg('参数错误');
		} else if (status >= 500 && status <= 599) {
			layer.msg('系统错误，请联系管理员！');
		}
	}
});

