/**
 * v 0.3(生产用)
 * time: 2016-8-23
 * 新增:
 *   1、标签功能(ajax方法在927行);
 * 修复:
 *   1、删除键删除内容时弹框内联动问题;
 *   2、部门人员单独设置单选多选时不生效的bug;
 */
// 自引所需资源(css || js)
;(function () {
	var resources = ['css/viewrange.css']; // 需要被自动引入的资源css or js, 位置相对于当前文件;
	var jsPath = function () {
		var js = document.scripts;
		var jsName = 'viewrange.js'; // 主文件name，用于判断路径
		for (var i = 0; i < js.length; i++) {
			var curJs = js[i],
				curJsSrc = curJs.src,
				curJsName = curJsSrc.substring(curJsSrc.lastIndexOf('/') + 1, curJsSrc.length);
			if (curJsName.indexOf(jsName) === 0) {
				return curJsSrc.substring(0, curJsSrc.lastIndexOf('/') + 1);
			}
		}
	}();
	var head = document.getElementsByTagName('head')[0];
	for (var i in resources) {
		var fileType = resources[i].substring(resources[i].lastIndexOf('.') + 1, resources[i].length);
		if (fileType == 'css') {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = jsPath + resources[i];
			head.appendChild(link);
		} else if (fileType == 'js') {
			var script = document.createElement("script");
			script.src = jsPath + resources[i];
			document.body.appendChild(script);
		}
	}
})();

// 判断输入时间是否小于timeout，若小于则不做callback
(function ($) {
	$.fn.extend({
		donetyping: function (callback, timeout) {
			timeout = timeout || 1e3; // 1 second default timeout
			var timeoutReference,
				doneTyping = function (el) {
					if (!timeoutReference) return;
					timeoutReference = null;
					callback.call(el);
				};
			return this.each(function (i, el) {
				var $el = $(el);
				$el.is(':input') && $el.on('keyup keypress', function (e) {
					if (timeoutReference) clearTimeout(timeoutReference);
					timeoutReference = setTimeout(function () {
						doneTyping(el);
					}, timeout);
				}).on('blur', function () {
					doneTyping(el);
				});
			});
		}
	});
})(jQuery);

// viewrange主体方法
(function ($) {
	var configAll = null; // 全局参数
	var allowzTreeInit = true; // 是否允许初始化树（一次性参数）
	var valueCheck = ''; // 判断输入的值是否有变化
	var defaults = { // 插件默认值
		selectType: 'checkbox', // 选择方式(单选、多选，全局，单独配置人员和部门时请设为null); 'checkbox' || 'radio' || null
		noSearch: false, // 是否需要搜索; true || false
		departEnable: true, // 部门; true || false
		departSelect: 'checkbox', // 选择方式(单独部门为单选多选); 'checkbox' || 'radio'
		personEnable: true, // 人员; true || false
		personSelect: 'checkbox', // 选择方式(单独人员为单选多选); 'checkbox' || 'radio'
		tagEnable: false, // 标签; true || false
		tagSelect: 'checkbox', // 选择方式(单独标签为单选多选); 'checkbox' || 'radio'
		bomBox: true, // 弹框; true || false
		resetClass: null, // 外层class， 用于重写样式; 'abc'
		appendPlace: null, // 按钮的可选结果去处; '.abc' || '#abc'
		initParam: null, // 若未设置初始化回调函数，则使用这里的初始化参数调用默认的初始化回调函数，如 {'module': "meet", 'contentId': 123456 }
		initial: undefined, // 初始值回填方法（如果有 && viewrange 则默认显示指定范围的）; fn
		viewrange: '全公司', // 可选范围tab; string || null
		boxViewText: null, // 弹框中的文字
		selectEn: undefined // 选择结束后可用的回调方法; fn
	};

	$.fn.viewRange = function (params) {
		return new MyViewRange(this, params);
	};

	var MyViewRange = function (elememt, params) {
		var vr = this;
		vr.$el = elememt;
		vr.init(params);
	};

	//初始化
	MyViewRange.prototype.init = function (params) {
		var vr = this;
		vr.opts = $.extend({}, defaults, params);
		vr.el = {};
		if (vr.$el.is('input') && !vr.$el.is('input[type=button]')) { // 绑定的元素为input时
			if (vr.$el.prop('viewrange')) { // 重绑定
				var $vInput = vr.$el.clone().removeClass('reviewrange-input');
				$vInput.val('');
				var $vFrame = vr.$el.closest('.reviewrange-frame');
				if ($vFrame.prev('ul').hasClass('reviewrange-tab')) {
					$vFrame.prev('ul').before($vInput);
					$vFrame.prev('ul').remove();
					vr.$el.closest('.reviewrange-frame').remove();
				} else {
					$vFrame.before($vInput);
					vr.$el.closest('.reviewrange-frame').remove();
				}
				vr.$el = $vInput;
			}

			// 页面绑定的元素为input，初始化搭建html结构
			vr.el.$input = vr.$el; // 绑定的input元素
			var wrapHtml = '<div class="reviewrange-frame">'
				+ '<ul class="reviewrange-object">'
				+ '<li class="reviewrange-search"></li>'
				+ '</ul>'
				+ '<div class="reviewrange-match">'
				+ '<ul class="match-cont"></ul>'
				+ '</div>'
				+ '</div>';
			vr.el.$input.wrap(wrapHtml); // 包裹 html
			vr.el.$input.addClass('reviewrange-input');
			vr.el.$input.prop('viewrange', 'webrischa');

			// 获取外层 DOM
			var $frame = vr.el.$input.closest('.reviewrange-frame');
			var $tab = $(''
				+ '<ul class="reviewrange-tab">'
				+ '    <li class="vcur">' + vr.opts.viewrange + '</li>'
				+ '    <li>指定对象</li>'
				+ '</ul>');
			var $more = $('<a class="reviewrange-more" href="javascript:void(0);"></a>');
			// 点击弹出弹框
			$more.click(function () {
				clear(); // 清空数据
				// 全局赋值
				configAll = $.extend({}, vr.opts, vr.el);
				// 数据传递
				var $clone = vr.el.$parent.siblings('li').clone(true);
				viewBoxShow($clone); // 显示弹框
			});
			// 根据参数确定是否添加部分内容
			vr.opts.bomBox && $frame.append($more);
			vr.opts.resetClass && $frame.addClass(vr.opts.resetClass);

			if (vr.opts.viewrange) {
				var $rframe = vr.el.$input.closest('.reviewrange-frame');
				$tab.find('li').click(function () {
					$(this).addClass('vcur').siblings().removeClass('vcur')
					var index = $(this).index();
					if (index == 0) {
						$rframe.hide();
					} else if (index == 1) {
						$rframe.show();
					}
				});
				$rframe.before($tab);
				$rframe.hide();
			}

			// 对象赋值
			vr.el.$parent = vr.el.$input.parent();
			vr.el.$object = vr.el.$parent.parent();
			vr.el.$frame = vr.el.$object.parent();
			vr.el.$match = vr.el.$object.next();
			vr.el.$list = vr.el.$match.children();
			// 赋值后根据参数判断部分元素的显隐和添加
			vr.opts.noSearch && vr.el.$parent.hide(); // 是否隐藏搜索
			// 加入初始值
			if (vr.opts.initial) {
				vr.opts.initial(vr.el.$parent, personChecked);
			} else if (vr.opts.initParam) {
				defaultInitVisiable(vr.opts.initParam.module, vr.opts.initParam.contentId, vr.el.$parent, personChecked)
			}
			// 事件
			vr.el.$frame.on('click', function (e) {
				e.stopPropagation();
			});
			// 搜索框输入
			vr.el.$input.donetyping(function () {
				inputDone(vr.el);
			}, 300);
			// 输入框focus事件
			vr.el.$input.focus(function () {
				// 全局参数赋值
				configAll = $.extend({}, vr.opts, vr.el);
				inputFocus(vr.el);
			});
			// 键盘
			vr.el.$input.keydown(function (event) {
				inputKyeDown(event, vr.el);
			});
		} else {
			if (vr.$el.prop('viewrange')) return;
			// 页面绑定的元素不是input
			$more = vr.$el;
			// 确定值存放的地方
			if (vr.opts.appendPlace) {
				vr.el.$object = $(vr.opts.appendPlace);
			} else {
				vr.el.$object = $('<ul class="reviewrange-object" style="display:none"></ul>');
				$more.after(vr.el.$object);
			}
			//加入初始值
			if (vr.opts.initial) {
				vr.opts.initial(vr.el.$object);
			} else if (vr.opts.initParam) {
				defaultInitVisiable(vr.opts.initParam.module, vr.opts.initParam.contentId, vr.el.$object)
			}

			// 弹框
			vr.$el.prop('viewrange', 'webrischa');
			$more.on('click', function () {
				clear(); // 清空
				// 赋值
				configAll = $.extend({}, vr.opts, vr.el);
				// 传递
				var clone = $more.next().children().clone(true);
				viewBoxShow(clone);
			});
		}
		// initEnd
	};

	/**
	 * 清空之前选中的结果
	 */
	MyViewRange.prototype.clearAll = function () {
		// input输入框的情况
		this.$el.closest('.reviewrange-object').find('li').not('.reviewrange-search').remove();
		// 非input输入框的情况
		this.$el.next('.reviewrange-object').find('li').remove();
	};

	/**
	 * 获取当前选中结果
	 */
	MyViewRange.prototype.getSelectedItem = function () {
		var selected = {
			persons: [],
			departments: [],
			personHtml: [],
			departmentHtml: []
		};

		var $liSelected;

		if (this.$el.is('input')) {
			// input输入框的情况
			var index = this.$el.closest('.reviewrange-frame').prev('.reviewrange-tab').find('.vcur').index();
			if (index == 0) {
				return {
					persons: [-9],
					departments: [-9],
					personHtml: ['全体成员'],
					departmentHtml: ['全体成员']
				};
			}
			$liSelected = this.$el.closest('.reviewrange-object').find('li').not('.reviewrange-search');
		} else {
			// 非input输入框的情况
			$liSelected = this.$el.next('.reviewrange-object').find('li');
		}

		$liSelected.each(function () {
			var $this = $(this);
			var data = $this.data('data');
			if (data.type == 'person') {
				selected.persons.push(data.id);
				selected.personHtml.push(data.html);
			} else {
				selected.departments.push(data.id);
				selected.departmentHtml.push(data.html);
			}
		});

		if (selected.persons.length || selected.departments.length)
			return selected;
		return null;
	};

	$(document).on('click', function () {
		$('.reviewrange-match').hide();
		$('li.click-select').removeClass('click-select');
	});

	// input输入方法
	function inputDone(el) {
		var value = $.trim(el.$input.val().toLocaleLowerCase());
		if (value && value != valueCheck) {
			getAjax(value, 1, el); //值，页码
		} else if (!value) {
			el.$match.hide();
			el.$list.html('');
		}
	}

	// input 聚焦方法
	function inputFocus(el) {
		//删除其他几个对象的值和……（多对象绑定）
		$('.reviewrange-input').not(el.$input).val('');
		$('.reviewrange-match').not(el.$match).hide();
		$('.reviewrange-match .match-cont').not(el.$list).html('');
		$('.reviewrange-search').not(el.$parent).prev().removeClass('deleted');
		$('li.click-select').removeClass('click-select');
		//是否显示匹配框
		var value = $.trim(el.$input.val().toLocaleLowerCase());
		//逻辑（输入框当有内容时再focus，直接显示之前匹配框的值
		if (value) el.$match.show();
	}

	// 清空方法
	function clear() {
		//删除其他几个对象的值和……
		$('.reviewrange-input').val('');
		$('.reviewrange-match').hide();
		$('.reviewrange-match .match-cont').html('');
		$('.reviewrange-search').prev().removeClass('deleted'); //取消可能的预删除状态
	}

	// input Keydown事件
	function inputKyeDown(event, el) {
		valueCheck = $.trim(el.$input.val().toLocaleLowerCase());
		if (event.keyCode == 8) {
			//删除键
			keyDelete(el);
		} else if (event.keyCode == 13) {
			//回车键
			event.preventDefault();
			keyEnter(el);
		} else if (event.keyCode == 38) {
			//方向键向上
			event.preventDefault();
			keyUp(el);
		} else if (event.keyCode == 40) {
			//方向键向下
			event.preventDefault();
			keyDown(el);
		} else if (el.$parent.prev().hasClass('deleted')) {
			el.$parent.prev().removeClass('deleted'); //取消预删除状态
		}
	}

	// 键盘事件
	// 删除
	function keyDelete(el) {
		var value = el.$input.val();
		if (value == '' && el.$parent.prev().length > 0 && !el.$parent.prev().hasClass('deleted')) {
			el.$parent.prev().addClass('deleted'); //预删除
		} else if (el.$parent.prev().hasClass('deleted')) {
			el.$parent.prev().remove(); //删除
			bomBoxShowed && personChecked();
		}
	}

	// 回车
	function keyEnter(el) {
		if ($('li.click-select').is(':visible')) {
			var data = $('li.click-select').data('data');
			select(data, el);
			$('li.click-select').hide().removeClass('click-select');
		}
	}

	// 方向键向上
	function keyUp(el) {
		if (el.$match.is(':visible')) {
			var index = $('li.click-select').index();
			if (index > 0) {
				index--;
				el.$list.children().eq(index).addClass('click-select').siblings().removeClass('click-select');
				if (!$('li.click-select').is(':visible')) {
					for (var i = index; i >= 0; i--) {
						if (el.$list.children().eq(i).is(':visible')) {
							el.$list.children().eq(i).addClass('click-select').siblings().removeClass('click-select');
							break;
						}
					}
				}
				var top = $("li.click-select").position().top;
				if (top >= 248) {
					el.$match.scrollTop(top - 248);
				}
			}
		}
	}

	// 方向键向下
	function keyDown(el) {
		if (el.$match.is(':visible')) {
			var length = el.$list.children().length;
			var index = $('.click-select').index();
			if (index < length) {
				index++;
				el.$list.children().eq(index).addClass('click-select').siblings().removeClass('click-select');
				if (!$('.click-select').is(':visible')) {
					for (var i = index; i < length; i++) {
						if (el.$list.children().eq(i).is(':visible')) {
							el.$list.children().eq(i).addClass('click-select').siblings().removeClass('click-select');
							break;
						}
					}
				}
				var top = $(".click-select").position().top;
				if (top > 248) {
					el.$match.scrollTop(top - 248);
				}
			}
		}
	}

	// 搜索ajax
	function getAjax(value, page, el) { //值， 页码, 对象
		var detach = el.$parent.prevAll('li').length > 0 ? true : false;
		var $scroll = el.$match;
		$scroll.off('scroll');
		$.ajax({
			url: ctx + '/contactPlugin/search/group?appid=TXL',
			data: {
				search: value,
				page: page,
				departEnable: configAll.departEnable,
				personEnable: configAll.personEnable,
				tagEnable: configAll.tagEnable
			},
			success: function (data) {
				var departments = data.obj.departments;
				var persons = data.obj.personPage;
				var tags = data.obj.tags; // 没有请返回null
				if (!configAll.departEnable) departments = null;
				if (!configAll.personEnable) persons = null;
				if (!configAll.tagEnable) tags = null;
				// 页码为1,清空匹配列表
				if (page == 1) el.$list.html('');

				var $ul = $('<ul></ul>');
				if (departments) {
					for (var i in departments) {
						var department = departments[i];
						var $li = $('<li><span class="matchname">' + department.name + '</span></li>');
						$li.data('search', {
							name: department.name
						}).data('data', {
							type: 'department',
							id: department.id,
							html: department.name
						});
						$li.on('click', function () {
							var data = $(this).data('data');
							select(data, el);
							$(this).hide();
							el.$input.focus();
						});
						$ul.append($li);
					}
				}

				if (persons) {
					for (var i in persons.items) {
						var person = persons.items[i];
						var $li = $('<li><span class="matchname">' + person.name + '</span><span class="info">' + (person.mobileFir ? person.mobileFir : '') + '</span></li>');
						$li.data('search', {
							name: person.name,
							pinyin: person.pinyin,
							pinyin_jp: person.pinyinFirstLetter,
							mobile: person.workNum
						}).data('data', {
							type: 'person',
							id: person.id,
							html: person.name
						});
						$li.on('click', function () {
							var data = $(this).data('data');
							select(data, el);
							$(this).hide();
							el.$input.focus();
						});
						$ul.append($li);
					}
				}

				if (tags) {
					for (var i in tags) {
						var tag = tags[i];
						var $li = $('<li><span class="matchname">' + tag.name + '</span></li>');
						$li.data('search', {
							name: tag.name
						}).data('data', {
							type: 'tag',
							id: tag.id,
							html: tag.name
						});
						$li.on('click', function () {
							var data = $(this).data('data');
							select(data, el);
							$(this).hide();
							el.$input.focus();
						});
						$ul.append($li);
					}
				}

				// 滚动加载
				if (persons && persons.isHasNextPage) {
					//bind slide event
					$scroll.on('scroll', function () {
						if ($ul.height() - $scroll.scrollTop() < 400) {
							getAjax(value, persons.page + 1, el);
						}
					});
				}
				// 去重
				detach && removal($ul, el);
				el.$list.append($ul.children()); // 把值推到匹配列表中
				el.$match.show();
			}
		});
	}

	// 搜索匹配去重规则
	function removal(element, el) {
		el.$parent.prevAll().each(function () {
			var existData = $(this).data('data');
			if (existData) {
				element.children().each(function () {
					var curData = $(this).data('data');
					if (curData.id == existData.id && curData.type == existData.type) {
						$(this).hide();
					}
				});
			}
		});
	}

	// 初始化构建弹框
	var $bomBox = '';
	var box = {};
	var bomBoxShowed = false;
	// 确定按钮
	var $define = $('<a class="view-btn-define" href="javascript:void(0);">确定</a>');
	// 搭建弹框主体
	function viewBoxInit() {
		$bomBox = $(''
			+ '<div class="view-box" id="viewrange-box" style="display:none">'
			+ '    <div class="view-mark"></div>'
			+ '    <div class="view-box-main">'
			+ '        <div class="view-box-top">'
			+ '            <label class="view-box-title">可见范围：</label>'
			+ '            <div class="view-box-input">'
			+ '                <div class="reviewrange-frame">'
			+ '                    <ul class="reviewrange-object">'
			+ '                        <li class="reviewrange-search">'
			+ '                            <input type="text" class="reviewrange-input" placeholder="在此输入搜索条件">'
			+ '                        </li>'
			+ '                    </ul>'
			+ '                    <div class="reviewrange-match">'
			+ '                        <ul class="match-cont"></ul>'
			+ '                    </div>'
			+ '                </div>'
			+ '            </div>'
			+ '        </div>'
			+ '        <div class="box">'
			+ '            <ul class="tab_menu">'
			+ '                <li>部门</li>'
			+ '                <li>成员</li>'
			+ '                <li>标签</li>'
			+ '            </ul>'
			+ '            <div class="tab_box">'
			+ '                <div class="bumen">'
			+ '                    <span class="dept-loading" id="dept-loading-icon"></span>'
			+ '                    <ul id="tree-bm" class="ztree"></ul>'
			+ '                </div>'
			+ '                <div class="rymen">'
			+ '                    <ul class="ztree bulist" id="tree-ry"></ul>'
			+ '                    <div class="rylists">'
			+ '                        <ul class="rylist" id="re_view_range_person"></ul>'
			+ '                        <span class="dept-loading" id="dept-loading-icon"></span>'
			+ '                    </div>'
			+ '                </div>'
			+ '                <div class="bqmen">'
			+ '                    <ul class="taglist" id="re_view_range_tag"></ul>'
			+ '                </div>'
			+ '            </div>'
			+ '        </div>'
			+ '        <div class="view-box-bottom"></div>'
			+ '    </div>'
			+ '</div>');
		$cancel = $('<a class="view-btn-cancel" href="javascript:void(0);">取消</a>');
		$close = $('<a class="view-box-close" href="javascript:void(0);"></a>');
		// 赋值
		box.$input = $bomBox.find('.reviewrange-input');
		box.$parent = box.$input.parent();
		box.$object = box.$parent.parent();
		box.$frame = box.$object.parent();
		box.$match = box.$object.next();
		box.$list = box.$match.children();
		// 事件
		box.$frame.on('click', function (event) {
			event.stopPropagation();
		});
		// 输入
		box.$input.donetyping(function () {
			inputDone(box);
		}, 300);
		// 输入框focus事件
		box.$input.focus(inputFocus(box));
		//box内搜索键盘
		box.$input.keydown(function (event) {
			inputKyeDown(event, box)
		});
		// tab切换
		$bomBox.find('.tab_menu li').on('click', function () {
			var index = $(this).index();
			$(this).addClass('current').siblings().removeClass('current');
			$bomBox.find('.tab_box').children().eq(index).show().siblings().hide();
		});
		// 弹框关闭事件
		$cancel.on('click', viewBoxHide);
		$close.on('click', viewBoxHide);
		// 添加
		$bomBox.find('.view-box-main').append($close);
		$bomBox.find('.view-box-bottom').append($cancel);
		$('body').append($bomBox);
	}

	// 隐藏弹框
	function viewBoxHide() {
		bomBoxShowed = false;
		$bomBox.hide();
		$define.remove();
		box.$input.val('');
		box.$parent.siblings().remove();
		box.$list.html('');
	}

	// 弹出弹框
	function viewBoxShow(trans) {
		//初始化弹框
		allowzTreeInit && viewBoxInit();
		//初始化树
		allowzTreeInit && zTreeInit();
		// 弹框搜索输入
		if (configAll.noSearch) {
			box.$parent.addClass('hide');
		} else {
			box.$parent.removeClass('hide');
		}

		showTab(); // 显示可选标签
		box.$parent.before(trans);
		personChecked();
		$define.click(function () {
			box.$parent.prev().hasClass('deleted') && box.$parent.prev().removeClass('deleted'); // 取消可能的预删除状态
			var clone = box.$parent.siblings('li').clone(true); // 克隆
			if (configAll.$parent && configAll.$parent.is('li')) {
				configAll.$parent.siblings('li').remove();
				configAll.$parent.before(clone);
				configAll.$object.scrollTop(100000000);
			} else {
				configAll.$object.children().remove();
				configAll.$object.append(clone);
				configAll.$object.scrollTop(100000000);
			}
			if (configAll.selectEn) {
				var selectArray = [];
				$.each(clone, function (i, item) {
					var obj = $(item).data('data');
					selectArray.push(obj);
				})
				configAll.selectEn(selectArray);
			}
			viewBoxHide(); //隐藏弹框
		});
		$bomBox.find('.view-box-title').html(configAll.boxViewText || '可见范围：');
		$bomBox.find('.view-box-bottom').prepend($define);
		bomBoxShowed = true;
		$bomBox.show();
		box.$object.scrollTop(100000000);
	}

	function showTab() {
		// 部门人员可选
		if (configAll.departEnable) {
			// 部门可选
			$bomBox.find('.tab_menu').children().eq(0).show().addClass('current').siblings().removeClass('current');
			$bomBox.find('.tab_box').children().eq(0).show().siblings().hide();
		} else {
			// 部门不可选
			$bomBox.find('.tab_menu').children().eq(0).hide();
			$bomBox.find('.tab_box').children().eq(0).hide();
		}

		if (configAll.personEnable && configAll.departEnable == false) {
			$bomBox.find('.tab_menu').children().eq(1).show().addClass('current').siblings().removeClass('current');
			$bomBox.find('.tab_box').children().eq(1).show().siblings().hide();
		} else if (configAll.personEnable && configAll.departEnable) {
			$bomBox.find('.tab_menu').children().eq(1).show();
			$bomBox.find('.tab_box').children().eq(1).hide();
		} else if (configAll.personEnable == false) {
			$bomBox.find('.tab_menu').children().eq(1).hide();
			$bomBox.find('.tab_box').children().eq(1).hide();
		}

		if (configAll.tagEnable && configAll.departEnable == false && configAll.personEnable == false) {
			$bomBox.find('.tab_menu').children().eq(2).show().addClass('current').siblings().removeClass('current');
			$bomBox.find('.tab_box').children().eq(2).show().siblings().hide();
		} else if (configAll.tagEnable) {
			$bomBox.find('.tab_menu').children().eq(2).show();
			$bomBox.find('.tab_box').children().eq(2).hide();
		} else if (configAll.tagEnable == false) {
			$bomBox.find('.tab_menu').children().eq(2).hide();
			$bomBox.find('.tab_box').children().eq(2).hide();
		}
	}

	/*
	 *  选中部门或者人员
	 *  @param data {type: 'person' or 'department', id: '', html: ''}
	 */
	function select(data, el) {
		if (configAll.selectType == 'radio') {
			// 全局单选
			if (el.$parent.prev().length > 0) {
				var removeData = el.$parent.prev().data('data');
				unselect(removeData, el);
			}
		} else if (configAll.selectType == 'checkbox') {

		} else if (configAll.departSelect == 'radio' && data.type == 'department') {
			// 部门单选
			clearRange('department', el);
		} else if (configAll.personSelect == 'radio' && data.type == 'person') {
			// 人员单选
			clearRange('person', el);
		} else if (configAll.tagSelect == 'radio' && data.type == 'tag') {
			// 标签单选
			clearRange('tag', el);
		}
		//
		var $li = $('<li></li>');
		var $icon = $('<span></span>');
		var $p = $('<p class="labelvalue">' + data.html + '</p>');
		var $close = $('<span class="closeicon"></span>');
		$li.data('data', data);
		$close.click(function () {
			var $input = $(this).closest('li').siblings('li').find('input');
			var $parent = $input.parent();
			var $list = $parent.parent().next().children();
			el = {$parent: $parent, $list: $list};
			unselect(data, el);
		});
		$li.append($p, $close);
		el.$parent.before($li);
		el.$object.scrollTop(100000000);
		el.$input.val(''); //清除input的值
		el.$match.hide();
		bomBoxShowed && personChecked();
	}

	// 单选多选
	function clearRange(type, el) {
		if (el.$parent.prev().length > 0) {
			el.$parent.prevAll().each(function () {
				var removeData = $(this).data('data');
				if (removeData.type == type) {
					unselect(removeData, el);
				}
			});
		}
	}

	/*
	 *  取消选中部门或者人员
	 *  @param data {type: 'person' or 'department', id: '', html: ''}
	 */
	function unselect(data, el) {
		el.$parent.prevAll().each(function () {
			var existData = $(this).data('data');
			if (existData) {
				if (existData.id == data.id && existData.type == data.type) {
					$(this).remove();
					el.$list.children().each(function () {
						var curData = $(this).data('data');
						if (curData.id == existData.id && curData.type == existData.type) {
							$(this).show();
							return false;
						}
					})
				}
			}
		});
		bomBoxShowed && personChecked();
	}

	// 部门人员勾选判断
	function personChecked() {
		// 去勾
		// 人员
		$('.rylist').find('li').each(function () {
			$(this).find('input').removeAttr('checked');
		});
		// 标签
		$('.taglist').find('li').each(function () {
			$(this).find('input').removeAttr('checked');
		})
		// 部门
		var treeObj = $.fn.zTree.getZTreeObj('tree-bm'); // 第一颗树
		if (treeObj)
			treeObj.checkAllNodes(false);

		// 重新勾选
		box.$parent.prevAll().each(function () {
			var data = $(this).data('data');
			if (data) {
				if (data.type == 'person' || data.type == 'tag') {
					$('#' + data.type + "_" + data.id).find('input[type=checkbox]').attr('checked', 'checked');
				} else {
					var nodes = treeObj.getNodesByParam('id', data.id, null);
					if (nodes.length)
						treeObj.checkNode(nodes[0], true, false);
				}
			}
		});
	}

	//树
	function zTreeInit() {
		allowzTreeInit = false;
		// 树参数
		var departSetting = {
			async: {
				enable: true,
				url: ctx + "/contactPlugin/listDepartment?appid=TXL",
				autoParam: ["id=pid"],
				dataFilter: filter,
				type: 'get'
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
			},
			view: {
				showIcon: false,
				selectedMulti: true
			},
			check: {
				enable: true,
				chkStyle: 'checkbox',
				chkboxType: {
					"Y": "",
					"N": ""
				}
			},
			callback: {
				onAsyncSuccess: ztreeOnAsyncSuccess,
				onCheck: checkDept
			}
		};

		var personSetting = {
			async: {
				enable: true,
				url: ctx + "/contactPlugin/listDepartment?appid=TXL",
				autoParam: ["id=pid"],
				dataFilter: filter,
				type: 'get'
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
			},
			view: {
				showIcon: false,
				selectedMulti: false
			},
			callback: {
				onClick: listPerson,
				onAsyncSuccess: ztreeOnAsyncSuccess
			}
		};

		var init = [];
		var deptListAuthorized = [];
		var forbiddenIds = [];

		function ztreeOnAsyncSuccess(event, treeId, treeNode, msg) {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			if (!init[treeId]) {
				init[treeId] = true;
				var nodes = treeObj.getNodes();
				treeObj.selectNode(nodes[0]);
				treeObj.expandNode(nodes[0], true, false, false);
				if (!init['listPerson']) {
					init['listPerson'] = true;
					listPerson(event, treeId, treeNode);

				}
			}

			// 子账号管理权限范围特殊处理
			if (treeId == "tree-bm") {
				var nodes = (treeNode == undefined ? treeObj.getNodes() : treeNode.children);
				for (var i = 0; i < nodes.length; i++) {
					var flag = false;
					var boolean = false;
					//判断该非权限部门是否禁用
					if (null != forbiddenIds) {
						for (var j = 0; j < forbiddenIds.length; j++) {
							if (nodes[i].id == forbiddenIds[j]) {
								flag = true;
								break;
							}
						}
						if (flag) {
							treeObj.setChkDisabled(nodes[i], true);
						}
					}
				}
			}
			personChecked();
		}

		function filter(treeId, parentNode, responseData) {
			// deptListAuthorized = responseData.obj.deptListAuthorized;
			// var departList = responseData.obj.departList;
			var attributes = responseData.attributes;
			if (null != attributes) {
				forbiddenIds = responseData.attributes.forbiddenIds;
			}
			var departList = responseData.obj;
			if (!departList)
				return null;
			for (var i = 0, l = departList.length; i < l; i++) {
				departList[i].isParent = !departList[i].isLeaf;
				var name = departList[i].name.replace(/\.n/g, '.');
				departList[i].title = name;
				name = name.length > 8 ? name.substring(0, 8) + '...' : name;
				departList[i].name = name;
			}
			$('#dept-loading-icon').remove();
			return departList;
		}

		function checkDept(e, treeId, treeNode) {
			if (treeNode.checked) {
				select({
					type: 'department',
					id: treeNode.id,
					html: treeNode.name
				}, box);
			} else {
				unselect({
					type: 'department',
					id: treeNode.id,
					html: treeNode.name
				}, box);
			}
		}

		var department;
		var page = 1;
		var pageSize = 50;

		function listPerson(e, treeId, treeNode) {
			page = 1;

			if (treeNode && treeNode.parentId != 0) {
				department = treeNode.id;
			} else {
				department = null;
			}

			$('#re_view_range_person').html('');
			queryPerson();
			$('.rylists').unbind('scroll').scroll(scroll);
		}

		function scroll() {
			var $this = $(this);
			var height = $('#re_view_range_person').height() - 300;
			var bottom = height - $(this).scrollTop();
			if (bottom < 50) {
				queryPerson();
			}
		}

		function queryPerson() {
			var param = {};
			param.pageSize = pageSize || 50;
			param.page = page || 1;
			if (department) {
				param.department = department;
			}
			$('.rylists').unbind('scroll');
			var needRebindScroll = true;

			$.ajax({
				url: ctx + '/contactPlugin/listPersonByDepartment?appid=TXL',
				data: param,
				async: false,
				success: function (data) {
					var persons = data.obj.items;
					for (var i in persons) {
						var person = persons[i];
						var $li = $(''
							+ '<li id="person_' + person.id + '">'
							+ '    <label class="clearfix">'
							+ '        <img src="' + (person.logo || imgPath + '/headImg/logo.png') + '">'
							+ '        <span>' + person.name + '</span>'
							+ '        <input type="checkbox">'
							+ '    </label>'
							+ '</li>');
						$li.find('span').eq(0).data('data', {
							type: 'person',
							id: person.id,
							html: person.name
						});
						$('#re_view_range_person').append($li);
						$li.find('input[type=checkbox]').on('click', function () {
							var $this = $(this);
							var data = $this.prev().data('data');
							if (($this).is(':checked')) {
								select(data, box);
							} else {
								unselect(data, box);
							}
						})
					}
					page++;
					personChecked();
					needRebindScroll = data.obj.isHasNextPage;
				},
				complete: function () {
					if (needRebindScroll) {
						$('.rylists').unbind('scroll').scroll(scroll);
					}
				}
			});
		}

		$.fn.zTree.init($("#tree-bm"), departSetting);
		$.fn.zTree.init($("#tree-ry"), personSetting);
		//获取标签
		$.ajax({
			type: 'GET',
			url: ctx + '/contactPlugin/listTag?appid=TXL',
			async: false,
			success: function (data) {
				var obj = data.obj;
				if (obj != null) {
					for (var i = 0; i < obj.length; i++) {
						var tagInfoDTO = obj[i];
						var $li = $(''
							+ '<li id="tag_' + tagInfoDTO.id + '">'
							+ '    <label>'
							+ '        <span>' + tagInfoDTO.name + '</span>'
							+ '        <input type="checkbox">'
							+ '    </label>'
							+ '</li>');
						$li.data('data', {
							type: 'tag',
							id: tagInfoDTO.id,
							html: tagInfoDTO.name
						});
						$('#re_view_range_tag').append($li);
						$li.find('input[type=checkbox]').on('click', function () {
							var $this = $(this);
							var data = $this.closest('li').data('data');
							if ($this.is(':checked')) {
								select(data, box);
							} else {
								unselect(data, box);
							}
						})
					}
				}
			}
		});
	}

	// 处理键盘事件 禁止后退键（Backspace)
	function forbidBackSpace(e) {
		var ev = e || window.event;
		var obj = ev.target || ev.srcElement;
		var t = obj.type || obj.getAttribute('type');
		var vReadOnly = obj.readOnly;
		var vDisabled = obj.disabled;
		vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
		vDisabled = (vDisabled == undefined) ? true : vDisabled;
		var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
		var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
		if (flag2 || flag1) return false;
	}

	document.onkeydown = forbidBackSpace;

	/**
	 * 加载初始化值。参数 module 和 contentId，通过插件的 initParam 参数传入
	 */
	function defaultInitVisiable(module, contentId, el, fn) {
		if (typeof contentId == 'undefined' || contentId == '') {
			$('.reviewrange-btn span').eq(0).click();
			return;
		}
		$.ajax({
			url: ctx + '/common/visible/list',
			data: {
				module: module,
				content: contentId
			},
			success: function (data) {
				console.log(data);
				var list = data.obj;
				if (list && list[0].id != '-9') {
					var $html = $('<ul></ul>');
					$.each(list, function (i, e) {
						var $li = $('<li><p class="labelvalue">' + e.name + '</p><span class="closeicon"></span></li>');
						$li.data('data', {
							type: e.type,
							id: e.id,
							html: e.name
						});
						$li.find('.closeicon').click(function () {
							$(this).parent().remove();
							fn(); //personCheck
						});
						$html.append($li);
					});
					//console.log($html.children());
					$(el).before($html.children());
					$(el).closest('.reviewrange-frame').show().prev('.reviewrange-tab').find('li:last').addClass('vcur').siblings().removeClass('vcur');
				}
			}
		})
	}

})(window.jQuery);

/**
 * 加载初始化值
 *
 * @deprecated 废弃，替换函数是 {@link defaultInitVisiable}
 */
function initVisiable(module, contentId, el, fn) {
	if (typeof contentId == 'undefined') {
		$('.reviewrange-btn span').eq(0).click();
		return;
	}
	$.ajax({
		url: ctx + '/common/visible/list',
		data: {
			module: module,
			content: contentId
		},
		success: function (data) {
			console.log(data);
			var list = data.obj;
			if (list && list[0].id != '-9') {
				var $html = $('<ul></ul>');
				$.each(list, function (i, e) {
					var $li = $('<li><p class="labelvalue">' + e.name + '</p><span class="closeicon"></span></li>');
					$li.data('data', {
						type: e.type,
						id: e.id,
						html: e.name
					});
					$li.find('.closeicon').click(function () {
						$(this).parent().remove();
						fn(); //personCheck
					});
					$html.append($li);
				});
				//console.log($html.children());
				$(el).before($html.children());
				$(el).closest('.reviewrange-frame').show().prev('.reviewrange-tab').find('li:last').addClass('vcur').siblings().removeClass('vcur');
			}
		}
	})
}

/**
 * 获取当前选中结果
 *
 * @deprecated 废弃，替换函数是 {@link MyViewRange.prototype.getSelectedItem}
 */
function getSelectedItem(id) { //'#abc'
	var selected = {
		persons: [],
		departments: [],
		personHtml: [],
		departmentHtml: []
	};
	var index = $('#' + id).find('.reviewrange-tab').find('.vcur').index();
	if (index == 0) {
		selected = {
			persons: [-9],
			departments: [-9],
			personHtml: ['全体成员'],
			departmentHtml: ['全体成员']
		};
	} else {
		$('#' + id + ' .reviewrange-object li').not('.reviewrange-search').each(function () {
			var $this = $(this);
			var data = $this.data('data');
			if (data.type == 'person') {
				selected.persons.push(data.id);
				selected.personHtml.push(data.html);
			} else {
				selected.departments.push(data.id);
				selected.departmentHtml.push(data.html);
			}
		});
	}

	if (selected.persons.length || selected.departments.length)
		return selected;

	layer.msg('未选择可见部门或者人员');
	return null;
}
