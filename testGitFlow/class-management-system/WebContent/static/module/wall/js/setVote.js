//全选
function check_all() {
	if ($("input[name='box_all']").attr("checked") == 'checked') {
		$("input[name='box']").attr("checked", true);
	} else {
		$("input[name='box']").attr("checked", false);
	}
}

function initQue() {
	//默认显示文字选项
	$("input[name=vote]:eq(0)").click();
	customDialog("#alert2");
}

//新增问题
function addQuestion() {

	var choice = $("input[name='questionType']:checked").val();
	if ($.trim(choice).length == 0) {
		layer.msg("请选择题目类型！");
		return;
	}
	var title = $("#title").val();
	if ($.trim(title).length == 0) {
		layer.msg("请输入题目标题！");
		return;
	}

	var max = null;
	var min = null;
	//选项类型(1:文字,2:图片)
	var type = $("input[name='vote']:checked").val();
	var className = "";
	if (type == 1) {//选择文字类型
		className = ".10";
	} else if (type == 2) {//选择图片类型
		className = ".20";
	}
	//题目类型为多选
	if (choice == 2) {
		max = $("#max").val();
		min = $("#min").val();
		if ($.trim(max).length == 0 || max < 2) {
			layer.msg('最多投票数必须大于1 !');
			return;
		}
		if($.trim(min).length == 0 || min < 1){
			layer.msg('最少投票数不能为空 !');
			return;
		}
		if (max < min) {
			layer.msg('最多投票数必须大于最小票数!');
			return;
		}
		if ($(className).size() < max) {
			layer.msg("最多投票数不能多于选项数！");
			return;
		}
	}

	var isShow = 0, isAnonymity = 0;
	if ($('#isShow').attr("checked") != "checked") {
		isShow = 1;
	}
	if ($('#isAnonymity').attr("checked") != "checked") {
		isAnonymity = 1;
	}

	var options = [];
	var allMap = {};

	//必须要有一个选项
	if ($(className).size() < 2) {
		layer.msg("一个题目至少2个选项！");
		return;
	}
	//每一个题目的选项数不能超过5个
	if ($(className).size() > 15) {
		layer.msg("不能超过15选项！");
		return;
	}
	var returnFlag = false;
	$(className).each(function (n, e) {
		var count = n + 1;
		var textValue = $(this).find("input").val();
		var textAreaValue = $(this).find("textarea").val();
		var picUrl = $(this).find("img").attr("id");
		if ($.trim(textValue).length == 0) {
			layer.msg('第'+ count + '个选项不能为空！');
			returnFlag = true;
			return false;
		} else if ($.trim(textValue) in allMap) {
			layer.msg('第'+ count + '个选项不能重复！');
			returnFlag = true;
			return false;
		}
		if(type == 2 && ($.trim(picUrl).length == 0 || picUrl == "picUrl")){
			layer.msg('第'+ count +'张图片不能为空！');
			returnFlag = true;
			return false;
		}
		allMap[$.trim(textValue)] = $.trim(textValue);

		var item = {};
		item.textValue = $.trim(textValue);
		item.textAreaValue = $.trim(textAreaValue);
		item.picUrl = picUrl;
		options.push(item);
	});
	if (returnFlag) {
		return;
	}
	var wallVoteQuestion = {
		activityId: $("#activityId").val(),
		choice: choice,//题目类型
		maxOptionNumber: max===null?0:max,//最多投票
		minOptionNumber: min===null?0:min,//最少投票
		title: title,//题目标题
		description: $("#description").val(),//题目描述
		type: type,//选项类型
		options: JSON.stringify(options),//选项内容
		isShow: isShow,//允许成员查看投票结果
		isAnonymity: isAnonymity//允许成员匿名投票
	}

	$.ajax({
		url: _webPath + "/module/wall/wallVoteQuestion/ajax/insertVote",
		contentType: "application/json; charset=utf-8",
		type: "post",
		cache: false,
		data: JSON.stringify(wallVoteQuestion),
		success: function (res) {
			if (res.success) {
				location.href = _webPath + "/module/wall/wallVoteQuestion/index?activityId=" + $("#activityId").val();
			} else {
				layer.msg(res.msg);
			}

		},
		error: function () {
			layer.msg("网络繁忙！添加失败")
		}
	});
}

//显示修改框
function edit(e) {
	$("#updateButton").show();
	//进行中的项目不能修改
	var questionId = $(e).data("id");
	var status = $(e).data("type");
	if (status == 1 || status == 2) {
		$("#updateButton").hide();
	}
	$.ajax({
		url: _webPath + "/module/wall/wallVoteQuestion/ajax/getVoteQuestionById",
		type: "post",
		cache: false,
		data: {
			id: questionId
		},
		success: function (res) {
			if (res.success) {
				var html = "";
				var question = res.obj.question;
				var list = res.obj.list;

				//基本信息回填
				$("#id").val(question.id);
				$("input[name=questionTypeUpdate]:eq(" + (question.choice - 1) + ")").attr("checked", 'checked');//题目类型
				$("input[name=questionTypeUpdate]:eq(" + (question.choice - 1) + ")").click();
				$("#titleUpdate").val(question.title);//标题
				$("#descriptionUpdate").val(question.description);//题目描述
				$("#maxUpdate").val(question.maxOptionNumber != null?question.maxOptionNumber : "");//最多投票
				$("#minUpdate").val(question.minOptionNumber != null?question.minOptionNumber : "");//最少投票
				$("input[name=voteUpdate]:eq(" + (question.type - 1) + ")").attr("checked", 'checked');//选项类型
				$("input[name=voteUpdate]:eq(" + (question.type - 1) + ")").click();

				hideNotSelect(status,question.choice,question.type);
				if (question.isShow == 0) {//允许成员查看投票结果
					$("input[name=isShowUpdate]:eq(0)").attr("checked", 'checked');
				}
				if (question.isAnonymity == 0) {//允许成员匿名投票
					$("input[name=isAnonymityUpdate]:eq(0)").attr("checked", 'checked');
				}

				//选项信息回填
				$(".100").remove();
				$(".200").remove();

				//选项回填
				if (question.type == 1) {//文字类型
					for (var int = 0; int < list.length; int++) {
						var id = int + 1000;
						var option = list[int];
						var content = option.content;
						html = '<div class="vote-type-font col-sm-12 mt10 100"><label class="col-sm-3 plr-n control-label">选项：</label><div class="col-sm-7 plr-n"><div class="col-sm-6 plr-n"><input class="ver-2 form-control" type="text" value="'+ content+'" maxlength="500" placeholder="请输入选项内容"></div><div class="col-sm-4 plr-n mt4"><a href="javascript:void(0)" onclick="addFontVoteDescript(this)" id="'+id+'" class="add-font-vote-descript ml5 display-in pl6 pt6 pb6 blue">添加简介</a><a href="javascript:void(0)" style="display: none;" onclick="deleteFontVoteDescript(this)" class="delete-font-vote-descript ml5 display-in pl6 pt6 pb6 blue">删除简介</a><a href="javascript:void(0)" class="delete-font-vote-icon ml5 display-in pt4" onclick="deleteFontVoteItem(this)" title="删除选项"><i class="icon f20 iconfont"></i></a></div><div hidden="" class="col-sm-12 plr-n"><div class="col-sm-10 plr-n mt10"><textarea class="form-control" rows="2" maxlength="100" placeholder="请输入选项简介">'+option.description+'</textarea></div></div></div></div> ';

						//循环一次append一次是为了如果有简介能马上触发
						$("#add_option").before(html);
						var value = option.description;
						if (value != null && value != "") {
							$("#" + id).click();
						}
					}
				} else if (question.type == 2) {//图片类型
					for (var int = 0; int < list.length; int++) {
						var id = int + 1000;
						var option = list[int];
						var content = option.content;
						html = '<div class="vote-type-img col-sm-12 mt20 200"> <div class="col-sm-12 plr-n">' +
							' <div class="col-sm-2 text-right mt4"> <label class="f14 mr-16">选项：</label> </div> ' +
							'<div class="col-sm-2 upload-area mt-12"> <div class="display-in pos-rel"> ' +
							'<div class="upload-icon upload_image" data-config=' + '{"module":"WALL_VOTE","url":"${webPath}web/fileUpload/uploadImage","success_func":"imgUploadSucc","before_func":"beforeImgUpload"}' + '></div> ' +
							'<div class="upload-show"> <img src="' + _imgPath + option.imageUrl + '" style="width: 55px;height: 55px;" id="' + option.imageUrl + '" alt="图片"/>' +
							'<a class="pos-abs bg-hui02 reupload upload_image" data-config=' + '{"module":"WALL_VOTE","url":"${webPath}web/fileUpload/uploadImage","success_func":"imgUploadSucc","before_func":"beforeImgUpload"}' + ' style="bottom:-0px;left: 0px;width: 55px;"href="javascript:void(0)">重新上传</a>' +
							'</div> </div> </div> <div class="col-sm-4 plr-n"> ' +
							'<input class="ver-2 form-control" type="text" placeholder="请输入选项内容(14字以内)" maxlength="14" value="' + content + '"> </div>' +
							'<div class="col-sm-2 plr-n mt4"> <a href="javascript:void(0)" onclick="addFontVoteDescript(this)" id="' + id + '" class="add-font-vote-descript ml5 display-in pl6 pt6 pb6 blue">添加简介</a> ' +
							'<a href="javascript:void(0)" style="display: none;"onclick="deleteFontVoteDescript(this)" class="delete-font-vote-descript ml5 display-in pl6 pt6 pb6 blue">删除简介</a>' +
							'<a href="javascript:void(0)" class="delete-font-vote-icon ml5 display-in pt4" onclick="deleteFontVoteItem(this)" title="删除选项"><i class="icon f20 iconfont"></i>' +
							'</a> </div> <div hidden="" class="col-sm-12 plr-n"><div class="col-sm-6 col-sm-offset-4 plr-n mt10">' +
							'<textarea class="form-control" rows="2" maxlength="100" placeholder="请输入选项简介">' + option.description +
							'</textarea> </div> </div> </div> </div>';
						//循环一次append一次是为了如果有简介能马上触发
						$("#add_option_file").before(html);
						var value = option.description;
						if (value != null && value != "") {
							$("#" + id).click();
						}
					}
					var childs = $('.200').children();
					childs.each(function () {
						$(this).find('.upload-icon').hide();
						$(this).find('.upload-icon').parent().find('.upload-show').show();
					});
				}

				customDialog("#alert3");
			} else {
				layer.msg("加载题目失败！");
			}
		}
	});
}

//根据状态隐藏未选中的checkbox按钮
function hideNotSelect(status,choice,type){
	if (status == 1 || status == 2) {
		$("input[name=questionTypeUpdate]:eq(" + (choice - 1) + ")").parent().siblings().remove();
		$("input[name=voteUpdate]:eq(" + (type - 1) + ")").parent().siblings().remove();
	}
}
//修改投票
function updateQuestion() {

	var choice = $("input[name='questionTypeUpdate']:checked").val();
	if ($.trim(choice).length == 0) {
		layer.msg("请选择题目类型！");
		return;
	}
	var title = $("#titleUpdate").val();
	if ($.trim(title).length == 0) {
		layer.msg("请输入题目标题！");
		return;
	}

	var max = null;
	var min = null;
	//选项类型(0:文字,1:图片)
	var type = $("input[name='voteUpdate']:checked").val();
	var index = $('.3').length;
	if (index > 15) {
		layer.msg("一个题目最多15个选项");
		return;
	}

	var className = "";
	if (type == 1) {//选择文字类型
		className = ".100";
	} else if (type == 2) {//选择图片类型
		className = ".200";
	}
	//题目类型为多选
	if (choice == 2) {
		max = $("#maxUpdate").val();
		min = $("#minUpdate").val();
		if ($.trim(max).length == 0 || max < 2) {
			layer.msg('最多投票数必须大于1 !');
			return;
		}
		if($.trim(min).length == 0 || min < 1){
			layer.msg('最少投票数不能为空 !');
			return;
		}
		if (min > max) {
			layer.msg('最多投票数必须大于最小票数!');
			return;
		}
		if ($(className).size() < max) {
			layer.msg("最多投票数不能多于选项数！");
			return;
		}
	}

	var isShow = 0, isAnonymity = 0;
	if ($('#isShowUpdate').attr("checked") != "checked") {
		isShow = 1;
	}
	if ($('#isAnonymityUpdate').attr("checked") != "checked") {
		isAnonymity = 1;
	}

	var options = [];
	var allMap = {};
	var returnFlag = false;
	//必须要有一个选项
	if ($(className).size() < 2) {
		layer.msg("一个题目至少2个选项！");
		return;
	}
	//文字类型
	$(className).each(function (n, e) {
		var count = n + 1;
		var textValue = $(this).find("input").val();
		var textAreaValue = $(this).find("textarea").val();
		var picUrl = $(this).find("img").attr("id");
		if ($.trim(textValue).length == 0) {
			layer.msg('第'+ count + '个选项不能为空！');
			returnFlag = true;
			return false;
		} else if ($.trim(textValue) in allMap) {
			layer.msg('第'+ count + '个选项不能重复！');
			returnFlag = true;
			return false;
		}
		if(type == 2 && $.trim(picUrl).length == 0){
			layer.msg('第'+ count +'张图片不能为空！');
			returnFlag = true;
			return false;
		}
		allMap[$.trim(textValue)] = $.trim(textValue);

		var item = {};
		item.textValue = $.trim(textValue);
		item.textAreaValue = $.trim(textAreaValue);
		item.picUrl = picUrl;
		options.push(item);
	});
	if (returnFlag) {
		return;
	}

	var wallVoteQuestion = {
		activityId: $("#activityId").val(),
		choice: choice,//题目类型
		maxOptionNumber: max===null?0:max,//最多投票
		minOptionNumber: min===null?0:min,//最少投票
		title: title,//题目标题
		description: $("#descriptionUpdate").val(),//题目描述
		type: type,//选项类型
		options: JSON.stringify(options),//选项内容
		isShow: isShow,//允许成员查看投票结果
		isAnonymity: isAnonymity,//允许成员匿名投票
		id:$("#id").val()
	}
	$.ajax({
		url: _webPath + "/module/wall/wallVoteQuestion/ajax/updateVote",
		contentType: "application/json; charset=utf-8",
		type: "post",
		cache: false,
		data: JSON.stringify(wallVoteQuestion),
		success: function (res) {
			if (res.success) {
				location.href = _webPath + "/module/wall/wallVoteQuestion/index?activityId=" + $("#activityId").val();
			} else {
				layer.msg(res.msg);
			}

		},
		error: function () {
			layer.msg("网络繁忙！修改投票失败")
		}
	});
}

//点击图标删除
/*删除*/
function deleteOne(e) {
	var id = $(e).data('id');
	var status = $(e).data("type");
	var activityId = $("#activityId").val();
	layer.confirm('确认删除数据？', function () {
		if (status == 1) {
			layer.msg("进行中的投票，不能删除！");
			return;
		}
		if (status == 2) {
			layer.msg("已结束的投票，不能删除！");
			return;
		}
		$.ajax({
			url: _webPath + "/module/wall/wallVoteQuestion/ajax/deleteBatchVote",
			type: "POST",
			data: {
				ids: id,
				activityId : activityId
			},
			success: function (data) {
				if (data.success) {
					loadData(Boxjs.currPageNo);
					layer.msg("删除成功！");
				} else {
					layer.msg(data.msg);
					location.reload();
				}
			},
			error: function () {
				layer.msg("网络繁忙！删除失败");
				return;
			}
		});
	});
}

//批量删除
function bacthDelate() {
	layer.confirm('确定删除吗?', function (index) {
		var boxArray = $('tbody').find("input[type='checkbox']:checked");
		if (boxArray.length == 0) {
			layer.msg("请选择要删除的题目！");
			return;
		}
		var ids = "";
		var isPerform = true;
		boxArray.each(function (index, element) {
			//进行中或结束不能删除
			if (element.name == 1 || element.name == 2) {
				isPerform = false;
			}
			if (index < boxArray.length - 1) {
				ids += element.id + ",";
			} else {
				ids += element.id;
			}

		});
		if (!isPerform) {
			layer.msg("选中的投票中有进行中或已结束的,不能删除!");
			return;
		}
		$.ajax({
			url: _webPath + "/module/wall/wallVoteQuestion/ajax/deleteBatchVote",
			type: "post",
			cache: false,
			data: {
				ids: ids
			},
			success: function (res) {
				if (res.success) {
					location.href = _webPath + "/module/wall/wallVoteQuestion/index?activityId=" + $("#activityId").val();
				} else {
					layer.msg("删除题目失败！");
				}
			},
			error: function () {
				layer.msg("网络繁忙！删除失败");
				return;
			}
		})
		layer.close(index);
	});
}

var obj;
function beforeImgUpload(e) {
	obj = e;
	return true;
}

function imgUploadSucc(data, id) {
	if (obj.hasClass("reupload")) {
		obj.parent().find("img").attr("src", _imgPath + data.url);
		return;
	}
	obj.hide();
	obj.parent().find('.upload-show').show();
	obj.parent().find("img").each(function () {
		$(this).attr("src", _imgPath + data.url);
		$(this).attr("id", data.url);
	});
}

//投票分析
function dataAnalysis(e) {
	$('#analyse').html("");
	var id = $(e).data("id");
	var url = _webPath + "/module/wall/wallVoteQuestion/ajax/getAnalyseById";
	$.ajax({
		url: url,
		data: {
			questionId: id
		},
		type: 'post',
		cache: false,
		dataType: 'json',
		success: function (data) {
			if (data.success) {
				customDialog("#alert1");
				var question = data.obj;
				var ok = 0;
				var choiceList = question.optionsList;
				var array = [];
				var all = 0;
				for (var j = 0; j < choiceList.length; j++) {
					var opnum = choiceList[j].opNumbers;
					var allnum = choiceList[j].allNumbers;
					var percentage = choiceList[j].percentage;
					var all = allnum;
					var selectTag = choiceList[j].content.replace(/&nbsp;/ig, "");
					if (selectTag.length > 9) {
						selectTag = selectTag.substring(0, 9) + "...";
					}
					array.push("['" + selectTag + "(" + Math.round(percentage) + "%, " + opnum + "人)'," + opnum + "]");
				}
				var datas = '[' + array.join(',') + ']';
				var datas2 = eval("(" + datas + ")");
				if (all > 0) {
					ok++;
					$('#analyse').append("<div style='width:450px;height:300px;overflow:hidden;' class='' id='container_" + question.id + "' style='min-width: 410px; min-height:315px; max-width: 600px; margin: 0 auto'></div>");
					//导出
					$('#analyse').append("<a style='cursor:pointer' class='blue ml10 mb20'  onclick='exportRecord(" + id + ")'>导出投票结果</a>");
					$("#container_" + question.id).highcharts({
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false
						},
						title: {
							text: '1、' + question.title,
							align: 'left',
							useHTML: true,
							style: {
								whiteSpace: 'normal'

							}
						},
						legend: {
							align: 'right',
							verticalAlign: 'middle',
							itemWidth: 150,
							width: 250
						},
						tooltip: {
							formatter: function () {
								return '<b>' + e.point.name.substring(0, 20) + '</b>: ';
							}
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false
								},
								showInLegend: true
							}
						},
						series: [{
							type: 'pie',
							name: '选择了',
							data: datas2
						}]
					});
				} else {

				}
				if (ok == 0) {
					$('#analyse').append("<div style='margin:80px 0 80px;font-size:14px;text-align:center;'>暂无提交的问卷</div>");
				}
			} else {
				layer.msg(data.error);
			}
		},
		error: function () {
			layer.msg("会话已过期,请重新登陆");
			location.href = _webPath + "login/";
		}
	});
}

/*排序*/
function exchangePosition(current,upwardFlag) {
	var questionId = current.data('id');
	var activityId = $("#activityId").val();
	$.ajax({
		url: _webPath + "/module/wall/wallVoteQuestion/ajax/exchangePosition",
		type: "post",
		cache: false,
		showLoading:true,
		data: {
			activityId: activityId,
			questionId: questionId,
			upwardFlag: upwardFlag
		},
		success: function (res) {
			if (res.success) {
				loadData(Boxjs.currPageNo);
			} else {
				layer.msg("排序失败！");
			}
		},
		error: function () {
			layer.msg("网络繁忙！排序失败");
			return;
		}
	})
}

/**
 * 导出
 */
function exportRecord(id) {
	window.location = _webPath + "/module/wall/wallVoteQuestion/export?questionId=" + id;
}

