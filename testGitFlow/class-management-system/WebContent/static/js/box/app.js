$(document).ready(function () {
	//左侧导航
	//如果此段代码不去掉，则左侧菜单会无法展开
	/*var thisPathName = window.location.pathname + location.search;
	$(".navbox li a").each(function () {
		var aUrl = $(this).attr("href");
		var htmldata = $("#data_url_for_menu").attr('data-menu');
		if (aUrl == thisPathName || htmldata == aUrl) {
			$(".navbox li ul").find(".current").removeClass("current");
			$(this).addClass("current");
			$(this).closest('ul').prev().addClass("cur");
			$(this).closest('ul').show();
		}
	});
	$(".navbox h3").click(function () {
		if ($(this).hasClass('cur')) {
			$(this).removeClass("cur").next("ul").slideUp(300);
		}
		else {
			$(this).addClass("cur").next("ul").slideDown(300);
			$(this).parent().siblings().find('h3').removeClass("cur");
			$(this).parent().siblings().find('h3').next().hide();
		}
	});
	$(".navbox li ul li.achild>a").click(function () {
		if ($(this).hasClass('cur')) {
			$(this).removeClass("cur").next("ul").slideUp(300);
		}
		else {
			$(this).addClass("cur").next("ul").slideDown(300);
		}
	});*/

})
/**
 * jquery 传递对象处理
 */
;
(function ($) {
	// copy from jquery.js
	var r20 = /%20/g,
		rbracket = /\[\]$/;
	$.extend({
		customParam: function (a) {
			var s = [],
				add = function (key, value) {
					// If value is a function, invoke it and return its value
					value = jQuery.isFunction(value) ? value() : value;
					s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
				};

			// If an array was passed in, assume that it is an array of form elements.
			if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {
				// Serialize the form elements
				jQuery.each(a, function () {
					add(this.name, this.value);
				});

			} else {
				for (var prefix in a) {
					buildParams(prefix, a[prefix], add);
				}
			}

			// Return the resulting serialization
			return s.join("&").replace(r20, "+");
		}
	});

	/* private method*/
	function buildParams(prefix, obj, add) {
		if (jQuery.isArray(obj)) {
			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (rbracket.test(prefix)) {
					// Treat each array item as a scalar.
					add(prefix, v);

				} else {
					buildParams(prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, add);
				}
			});

		} else if (obj != null && typeof obj === "object") {
			// Serialize object item.
			for (var name in obj) {
				buildParams(prefix + "." + name, obj[name], add);
			}

		} else {
			// Serialize scalar item.
			add(prefix, obj);
		}
	};
})(jQuery);
//字数限制

function textCount(obj, objnum) {

	$(obj).next().find(".textcount-num").text($(obj).val().length);
}
// 全选
function checkbox(e) {
	var checkValue = $('.table').find('.check-value');
	if (e.checked) {
		checkValue.each(function () {
			this.checked = true;
		});
	} else {
		checkValue.each(function () {
			this.checked = false;
		});
	}
	;
};
/**
 * 函数解释
 *
 * 1:预留函数
 * function beforeLoadPage() {}
 *
 *
 * 2:分页之后
 * @param data
 * function afterPagination(data){}
 *
 *
 * 3:没有结果特殊的处理
 * function afterNoResult(){}
 *
 * 4:tab切换之前，一般是用作改变searchVo搜索条件
 * function beforeTabRenderHtml(jqTabObj){}
 *
 */
/**
 * map处理
 */
var baseTemp = new Map();
var baseMap = new Map();
function Map() {
	this.elements = new Array();
	//向MAP中增加元素（key, value)
	this.put = function (_key, _value) {
		if (!this.get(_key))
			this.elements.push({
				key: _key,
				value: _value
			});
	}
	//获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function (_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	}
	//判断MAP中是否含有指定VALUE的元素
	this.containsValue = function (_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}
	this.keys = function () {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}
}
function formatDate(time, fmt) {
	if (fmt == null || typeof(fmt) == undefined) {
		fmt = "yyyy-MM-dd hh:mm:ss"
	}
	return time.Format(fmt);
}
function findTemplate(func) {
	return func.toString().split(/\n/).slice(2, -2).join('\n');
}
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/**
 * 初始化
 */
$(function () {
	initCoreBaseInfo();
	if ($.isFunction(window.beforeLoadPage)) {
		beforeLoadPage();
	}
	if ("undefined" != typeof Boxjs && "undefined" != typeof Boxjs.searchVo) {
		Boxjs.noResult = $('#noResult').remove().val();
		loadData(1);
	}
});
/**
 * 公用的渲染模板
 */
var baseTemplate = {
	trTemplate: '<tr data-row-id="{{id}}" index="{{index}}" ' // tr属性定义，data-row-id结合index可以为表单自动填充，index可以快速查找该行的对象
}
/**
 * 加载搜索条件
 */
function searchParam(pageNo) {
	var params = {
		'search.pageSize': Boxjs.pageSize,
		'search.pageNo': pageNo
	};
	$('.' + Boxjs.searchVo + ' .form-control').each(function (i, n) {
		if ($(n).attr('param') != undefined) {
			params[$(n).attr('param')] = $(n).val() || $(n).attr('value');
		}
	});
	return params;
}
/**
 * 加载查询信息
 */
function loadData(pageNo) {
	var params = searchParam(pageNo);
	data(params, pageNo);
}
/**
 * 加载数据 注意后端代码一定要用renderPageJson的方式
 */
function data(condition, pageNo) {
	$.ajax({
		url: Boxjs.listUrl,
		data: condition,
		type: 'get',
		success: function (data) {
			if ($.isFunction(window.firstPageDeal)) {
				window.firstPageDeal(data);
			}
			Boxjs.loadedCache = data.obj;
			if (!data.obj) {
				noResult();
				return;
			}
			Boxjs.currPageNo = pageNo;
			Boxjs.currentPageCount = data.obj.length;// 当前页面的数据条数

			for (var i = 0; i < data.obj.length; i++) {
				data.obj[i].index = i;
			}
			renderPagination(data);
			if ($.isFunction(window.afterPagination)) {
				afterPagination(data);
			}
		},
		error: function () {
			$('#container').html('');
			$('#page').hide();
			if ($.isFunction(window.errorLoadDataCallBack)) {
				errorLoadDataCallBack();
			}
			layer.msg('查询失败，请稍后重试');
		}
	})
}
function noResult() {
	var length = $('#container').prev().find('th').length;
	output = Mustache.render(Boxjs.noResult, {
		len: length
	});
	$('#container').html(output);
	$('#page').hide();
	if ($.isFunction(window.afterNoResult)) {
		afterNoResult();
	}
}
/**
 * 分页内容
 *
 * @param data:ajax返回数据
 */
function renderPagination(data) {

	if (data.obj.length == 0) {
		if (('undefined' == typeof Boxjs.keepOrginHtml) || Boxjs.keepOrginHtml == false) {
			noResult();
			return;
		}

	}
	var totalPage = data.obj.totalPages;
	var curPage = data.obj.pageNum;
	if (!(undefined == totalPage)) {
		Boxjs.totalPage = totalPage;
	}
	if (data.obj.length > 0 && ('undefined' != typeof data.obj[0].id)) {
		if (Boxjs.template) {
			Boxjs.template = Boxjs.template.replace(/<tr/g,baseTemplate.trTemplate);
		}
	}
	if (totalPage > 1 && Boxjs.noPageShow != true) {
		$('#page').show();
		showpageFun2($("#page"),curPage,totalPage,"loadData");
	} else {// 搜索的时候进入
		$('#page').hide();
	}
	if ("undefined" == typeof formatTem) {
		formatTem = {};
	}
	var output = Mustache.render(Boxjs.template, $.extend(data, formatTem));
	$('#container').html(output);
	var callback = window['afterAppend'];
	if (typeof callback == 'function') {
		callback();
	}
}
/**
 * 取消事件绑定 一般处理子集事件 比如div绑定了事件 div下的button等不要时间
 * 调用方法$(document).on('click', '.gameDiv .delbtn', function(e) {e.stopPropagation();})
 */
function stopBubble(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation(); //非IE浏览器
		//e.preventDefault();
	} else {
		window.event.cancelBubble = true; //IE浏览器
	}
	return false;
}
/**
 * 初始化加载
 */
function initCoreBaseInfo() {
	if ("undefined" != typeof Boxjs && "undefined" != typeof Boxjs.searchVo) {
		$(document).on('click', '.' + Boxjs.searchVo + ' .btn-primary', function () {
			if ($.isFunction(window.validBeforeLoadPage)) {
				var boo = validBeforeLoadPage();
				if (!boo) {
					return;
				}
			}
			loadData(1); // 搜索查询默认查询第一页
		});
	}
	$(document).on('click', '.deleteOne', function () {
		var dbId = $(this).parents('tr').attr('data-row-id');
		layer.confirm('确定要删除它了?', function (index) {
			deleteOne(dbId, index);
		});// 处理取消时间
	});
	/* tab切换,注意不能对mastache模板内容remove 因为CDT.temp只有一个*/
	$(document).on('click', '.tabPannel', function () {
		//layer.closeAll(); // 防止tab页切换了，错误信息还没有消失
		beforeTabRenderHtml($(this));
		$(this).addClass('cur').siblings().removeClass('cur');
		var moduleto = $(this).attr('moduleto');
		Boxjs.template = $('#' + moduleto).val();
		loadData(1);
	});
	if ($('.upload_image').length > 0) {
		initImageFile();
	}
	if ($('.file_upload').length > 0) {
		loadMultipart();
	}

	$(document).on('click', '.upload_image', function (e) {
		stopBubble(e);
		if ($().length == 0) {
			initImageFile();
		}
		var configs = $(this).attr('data-config');
		var defaultConfig = {before_func: 'beforeImageUpload', success_func: 'imageUploadSuccess'};
		var mconfig = $.extend(defaultConfig, JSON.parse(configs))
		var $file = $('#file_upload_image');
		$file.attr('data-config', JSON.stringify(mconfig));
		var beforeFunc = window[mconfig.before_func];
		if (!beforeFunc($(this))) {
			return;
		} else {
			var upload_id = $(this).attr('id');
			if (upload_id) {
				$('#file_upload_image').attr('upload_id', upload_id);
			}
			$file.click();
		}
	});
	$(document).on('click', '#file_upload', function () {
		var myconfig = JSON.parse($('#file_upload').attr('data-config'));
		var beforeFunc = window[myconfig.before_func];
		if (!beforeFunc()) {
			//$parent.append($this.clone());
			//$this.remove();
			return;
		} else {
			var $file = $('#multipart_file_upload');
			$file.click();
		}
	});
	$(document).on('change', '#multipart_file_upload', function () {
		var myconfig = JSON.parse($('#file_upload').attr('data-config'));
		var $this = $('#file_upload');
		var $parent = $this.parent();
		var mfile = $('#multipart_file_upload').attr('data-config', myconfig);
		$form = $('#multipart-ajax-upload-file');
		file_upload($form, myconfig);
	});
	$(document).on('change', '#file_upload_image', function () {
		var uploadForm = '\
			<form id="ajax-upload-file" style="display: none;" method="post" enctype="multipart/form-data">\
			 	<input name="type" value="201"/>\
			</form>';
		var $parent = $(this).parent();
		var $form = $(uploadForm);
		var $this = $(this);
		var config = $this.data("config");
		var url = ctx + '/fileUpload/uploadImage';
		$this.prop('name', 'file');
		$form.append($this);
		shadow($parent);
		if (config.url && config.url.length > 0) {
			url = config.url;
		}
		$form.ajaxSubmit({
			url: url,
			dataType: 'json',
			data: config,
			async: false,
			success: function (data) {
				if (typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {

				} else {
					data = JSON.parse(data);
				}

				if (data.success) {
					if (config.success_func
						&& typeof window[config.success_func] == 'function') {
						var upload_id = $this.attr('upload_id');
						window[config.success_func](data, upload_id);
					}
				} else {
					layer.msg(data.msg || '文件上传失败');
				}
			},
			error: errorHandle,
			complete: function () {
				$parent.append($this.clone());
				$this.remove();
				closeShadow($parent);
			}
		});
	});

}
function deleteOne(dbId, index) {
	$.ajax({
		url: Boxjs.deleteUrl,
		type: 'post',
		data: {
			id: dbId
		},
		success: function (data) {
			if (!data.success) {
				layer.msg(data.msg);
			} else {
				if (Boxjs.currentPageCount == 1 && Boxjs.currPageNo > 1) { // 当前页面只有一条数据的时候
					Boxjs.currPageNo = Boxjs.currPageNo - 1;
				}
				layer.close(index);
				loadData(Boxjs.currPageNo);// 删除之后直接去渲染列表内容
			}
		}
	});
}
function initImageFile() {
	var fileHtml = '<input id="file_upload_image" type="file"  name="file" style="display:none;"/>';
	if ($('#file_upload_image').length == 0) {
		$('body').append(fileHtml);
	}
}

function beforeImageUpload() {
	return true;
}
// 异步提交
function errorHandle(jqXHR, error, errorThrown) {
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
	} else {
		layer.msg('请上传符合规定的文件！');
	}
}

function ajaxSubmit(config, withoutLoading) {
	var errorFunc = config.error;
	var successFunc = config.success;
	var complateFunc = config.complete;

	if (!withoutLoading) {
		var loadingIndex = layer.load();
	}

	var settings = {
		type: config.type || 'get',
		success: function (data) {
			if (data.needLogin) {
				layer.msg('会话失效，请重新登录');
				setTimeout(location.reload(), 100);
				return;
			} else if (!data.success) {
				layer.msg(data.msg || '操作失败');

				if (config.failure) {
					config.failure();
				}
				return;
			}

			if (successFunc) {
				successFunc(data);
			}
		},
		error: function (jqXHR, error, errorThrown) {
			errorHandle(jqXHR, error, errorThrown);
			if (errorFunc)
				errorFunc();
		},
		complete: function () {
			if (!withoutLoading) {
				layer.close(loadingIndex);
			}

			if (complateFunc)
				complateFunc();
		}
	}
	$.ajax($.extend(config, settings));
}

// 清空form表单
function clearForm(id) {
	$(':input', id).not(':button, :submit, :reset, :hidden, :radio, :checkbox')
		.val('').removeAttr('checked').removeAttr('selected');

	$(':input', id).filter(':radio').first().attr('checked', true);
	$(':input', id).filter(':checkbox').removeAttr('checked');
}
/**
 * 文件上传
 */
function file_upload(form, myconfig) {
	// 如果定义了就用定义的属性，如果未定义就用默认属性和默认属性值
	// loading
	shadow($('#file_upload').parent());
	var mfile = $('#multipart_file_upload');
	form.ajaxSubmit({
		url: myconfig.url,
		dataType: 'json',
		success: function (data) {
			if (data.success) {
				if (myconfig.success_func
					&& typeof window[myconfig.success_func] == 'function')
					window[myconfig.success_func](data);
				mfile.attr('first', true);
				$('#multipart-ajax-upload-file').remove();
				loadMultipart();
			} else {
				layer.msg(data.msg || '文件上传失败');
			}
		},
		error: errorHandle,
		complete: function () {
			//$parent.append($this.clone());
			//$this.remove();
			// unloading
			closeShadow($('#file_upload').parent());
		}
	});
}

function shadow(object) {
	if ($(object).hasClass('load')) {
		$(object).find('.imgupload').show();
	} else {
		$(object).addClass('load');
		var span = '<span class="imgupload"></span>'
		$(object).append(span);
	}
}

function closeShadow(object) {
	$(object).find('.imgupload').hide();
}

/**
 * 图片上传 input file 移到创建的form表单中 提交完毕再移回去 TODO: 目前都是input file 外围包装一个a标签
 * 所以直接$parent.append(this) 需要再改进成通用的方式 有多个节点时 移回去位置会错乱
 */
function picUpload() {
	var $this = $(this);
	$this.prop('name', 'file');
	var $form = $('#ajax-upload');
	if (!$form.length) {
		$form = $('<form id="ajax-upload" style="display: none;" method="post" enctype="multipart/form-data"></form>');
		$('body').append($form);
	}

	$form.html(''); // 清空参数

	var $parent = $this.parent();
	$form.append($this);

	// 测试 replaceWith
	// $this.replaceWith('<div id="ajax-upload-file-tmp" />');
	// 测试 end

	var config = $this.data('config');
	var submitData = $this.data('data');
	for (var i in submitData) {
		$form
			.append('<input name="' + i + '" value="' + submitData[i]
				+ '" />');
	}

	var $inputImg = $(config.input_img);
	var $inputId = $(config.input_id);

	if (!$inputImg.length || !$inputId.length) {
		layer
			.msg('ajax upload file must define input_img and input_id with data-config attribute');
		return;
	}
	var oringnalSrc = $inputImg.prop('src');
	// $.extend(data, config || {});
	$form.ajaxSubmit({
		url: config.url,
		success: function (data) {
			if (typeof data == 'string') {
				var d = eval("(" + data + ")");
			} else {
				var d = data;
			}

			if (d.success) {
				$inputImg.attr('src', d.url);
				$inputId.val(d.url);
			} else {
				layer.msg(d.msg || '文件上传失败');
				$inputId.val('');
				$inputImg.attr('src', oringnalSrc);
			}
		},
		error: errorHandle,
		complete: function () {
			$parent.append($this);
		}
	});
}

function datepicker() {
	var $this = $(this);
	var option = $this.data('config') || {};
	var defaultOption = {
		dateFmt: 'yyyy-MM-dd', // 日期格式
		isShowClear: 'true',
		onpicked: function () {
			$this.blur();
		} // 选择日期后让datapicker失去焦点以触发onchange事件
	};
	$.extend(defaultOption, option);
	WdatePicker(defaultOption);
}

function paixus(e) {
	var cont = $(e).parent().parent().parent();
	if (cont.index() != 0) {
		cont.prev().before(cont.clone(true));
		cont.detach();
	}
};
// 向下排序
function paixux(e) {
	var cont = $(e).parent().parent().parent();
	if (cont.index() != $('tbody').find('tr').last().index()) {
		cont.next().after(cont.clone(true));
		cont.detach();
	}
};

function docReady() {
	// 1、div calss initialize_onloading
	$('.initialize_onloading').each(function () {
		var $this = $(this);
		$this.removeClass('initialize_onloading').addClass('initialized');
		var config = $this.data('config');
		var $override = config.override ? $(config.override) : $this;

		config.success = function (html) {
			$override.html(html);
		}
		config.error = errorHandle;

		$.ajax(config);
	})

	// 7、checkbox_exchange_dispaly
	$(document).on('change', '.checkbox_exchange_dispaly', function () {
		var $this = $(this);
		var display = $this.prop('checked');
		var id = $this.data('id');
		if (display) {
			$(id).show();
		} else {
			$(id).hide();
		}
	})

	$(document).on('click', '.ajax_delete', function () {
		var $this = $(this);
		var config = $this.data('config');
		layer.confirm($this.data('config').confirmMsg || '确认删除?', function (i) {
			layer.close(i);
			var successFunc = function () {
				layer.msg('删除成功');
				var callback = window[$this.data('config').success_func];
				if (typeof callback == 'function') {
					callback();
				}
			};
			config.success = successFunc;
			ajaxSubmit(config);
		})
	})
}

$(document).ready(function () {
	// form 表单滚动条设置 弹出层滚动条与 datepicker 有冲突 所有弹出层不要加滚动条
	// $('.form-horizontal').scrollUnique();

	// 图片上传
	$(document).on('change', '.pic_upload', picUpload);
	// $('.pic_upload').unbind('change').change(picUpload);

	// datepicker
	$(document).on('click', '.datepicker', datepicker);
	// $('.datepicker').each(datepicker);

	docReady();
});
function loadMultipart() {
	var pageConfig = $('#file_upload').data('config');
	var defaultConfig = {
		module: pageConfig.module,
		url: ctx + '/fileUpload/uploadFile',
		file_type: 'file',
		before_func: 'beforeUpload',
		success_func: 'uploadSuccess'
	};
	var myconfig = $.extend(defaultConfig, pageConfig);
	$('#file_upload').attr('data-config', JSON.stringify(myconfig));
	var $form = $('<form id="multipart-ajax-upload-file" style="display: none;" method="post" enctype="multipart/form-data"></form>');
	$('body').append($form);
	$form.html('').append('<input id="multipart_file_upload" first=true type="file"  name="file" style="display:none;"/>');
	$form.append('<input name="module" value="' + myconfig.module + '">');
}
