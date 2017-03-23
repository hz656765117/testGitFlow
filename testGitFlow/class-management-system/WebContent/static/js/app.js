//异步提交
function errorHandle(jqXHR, error, errorThrown) {
  var status = jqXHR.status;
  if (status == 405) {
    layer.msg('不支持的方法');
  } else if (status == 401) {
    //needLogin
    layer.msg('会话失效，请重新登录');
    setTimeout(location.reload(), 1000);
  } else if (status == 403) {
    var headerMsg = jqXHR.getResponseHeader('msg');
    layer.msg(headerMsg || '系统错误，请稍后再试');
  } else if (status == 400) {
    layer.msg('参数错误');
  } else {
    layer.msg('系统错误，请联系管理员');
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
    type : config.type || 'get',
    success : function(data) {
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
    error : function(jqXHR, error, errorThrown) {
      errorHandle(jqXHR, error, errorThrown);
      if (errorFunc)
        errorFunc();
    },
    complete : function() {
      if (!withoutLoading) {
        layer.close(loadingIndex);
      }

      if (complateFunc)
        complateFunc();
    }
  }
  $.ajax($.extend(config, settings));
}

//清空form表单
function clearForm(id) {
  $(':input', id).not(':button, :submit, :reset, :hidden, :radio, :checkbox')
      .val('').removeAttr('checked').removeAttr('selected');

  $(':input', id).filter(':radio').first().attr('checked', true);
  $(':input', id).filter(':checkbox').removeAttr('checked');
}

function clearTabForm(id) {
  $(':input', id).not(':button, :submit, :reset,:radio, :checkbox').val('')
      .removeAttr('checked').removeAttr('selected');

  $(':input', id).filter(':radio').first().attr('checked', true);
  $(':input', id).filter(':checkbox').removeAttr('checked');
}

/**
 * 文件上传
 */
function file_upload() {
  var $this = $(this);
  var config = $this.data('config');
  var beforeFunc = window[config.before_func];
  if (beforeFunc) {
    if (!beforeFunc()) {
      return;
    }
  }

  $this.prop('name', 'file');
  var $form = $('#ajax-upload-file');
  if (!$form.length) {
    $form = $('<form id="ajax-upload-file" style="display: none;" method="post" enctype="multipart/form-data"></form>');
    $('body').append($form);
  }

  $form.html(''); //清空参数
  var $parent = $this.parent();
  $form.append($this);

  var submitData = $this.data('data');
  if (submitData) {
    for ( var i in submitData) {
      $form.append('<input name="' + i + '" value="' + submitData[i] + '" />');
    }
  }

  // loading
  shadow($parent);
  $form.ajaxSubmit({
    url : config.url,
    dataType : 'json',
    success : function(data) {
      if (data.success) {
        if (config.success_func
            && typeof window[config.success_func] == 'function')
          window[config.success_func](data);
      } else {
        layer.msg(data.msg || '文件上传失败');
      }
    },
    error : errorHandle,
    complete : function() {
      $parent.append($this.clone());
      $this.remove();

      // unloading
      closeShadow($parent);
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
 * 图片上传
 * input file 移到创建的form表单中 提交完毕再移回去
 * TODO: 目前都是input file 外围包装一个a标签 所以直接$parent.append(this)
 * 需要再改进成通用的方式 有多个节点时 移回去位置会错乱
 */
function picUpload() {
  var $this = $(this);
  $this.prop('name', 'file');
  var $form = $('#ajax-upload');
  if (!$form.length) {
    $form = $('<form id="ajax-upload" style="display: none;" method="post" enctype="multipart/form-data"></form>');
    $('body').append($form);
  }

  $form.html(''); //清空参数

  var $parent = $this.parent();
  $form.append($this);

  // 测试 replaceWith
  //$this.replaceWith('<div id="ajax-upload-file-tmp" />');
  //测试 end

  var config = $this.data('config');
  var submitData = $this.data('data');
  for ( var i in submitData) {
    $form.append('<input name="' + i + '" value="' + submitData[i] + '" />');
  }

  var $inputImg = $(config.input_img);
  var $inputId = $(config.input_id);

  if (!$inputImg.length || !$inputId.length) {
    layer
        .msg('ajax upload file must define input_img and input_id with data-config attribute');
    return;
  }
  var oringnalSrc = $inputImg.prop('src');
  //	$.extend(data, config || {});
  $form.ajaxSubmit({
    url : config.url,
    dataType:'json',
    success : function(data) {
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
    error : errorHandle,
    complete : function() {
      $parent.append($this.clone());
    }
  });
}

function datepicker() {
  var $this = $(this);
  var option = $this.data('config') || {};
  var defaultOption = {
    dateFmt : 'yyyy-MM-dd', //日期格式
    isShowClear : 'true',
    onpicked : function() {
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
//向下排序
function paixux(e) {
  var cont = $(e).parent().parent().parent();
  if (cont.index() != $('tbody').find('tr').last().index()) {
    cont.next().after(cont.clone(true));
    cont.detach();
  }
};

function docReady() {
  //1、div calss initialize_onloading
  $('.initialize_onloading').each(function() {
    var $this = $(this);
    $this.removeClass('initialize_onloading').addClass('initialized');
    var config = $this.data('config');
    var $override = config.override ? $(config.override) : $this;

    config.success = function(html) {
      $override.html(html);
    }
    config.error = errorHandle;

    $.ajax(config);
  })

  //7、checkbox_exchange_dispaly
  $(document).on('change', '.checkbox_exchange_dispaly', function() {
    var $this = $(this);
    var display = $this.prop('checked');
    var id = $this.data('id');
    if (display) {
      $(id).show();
    } else {
      $(id).hide();
    }
  })

  $(document).on('click', '.ajax_delete', function() {
    var $this = $(this);
    var config = $this.data('config');
    layer.confirm($this.data('config').confirmMsg || '确认删除?', function(i) {
      layer.close(i);
      var successFunc = function() {
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

$(document).ready(function() {
  //form 表单滚动条设置    弹出层滚动条与 datepicker 有冲突 所有弹出层不要加滚动条
  //$('.form-horizontal').scrollUnique();

  //图片上传
  $(document).on('change', '.pic_upload', picUpload);
  // $('.pic_upload').unbind('change').change(picUpload);

  //文件上传
  $(document).on('change', '.file_upload', file_upload);
  // $('.file_upload').unbind('change').change(file_upload);

  //datepicker
  $(document).on('click', '.datepicker', datepicker);
  // $('.datepicker').each(datepicker);

  docReady();
});
