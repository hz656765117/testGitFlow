$(function() {
  $("#fileupload_up").change(function(e) {
    if (1 == 1) {
      var freader = new FileReader();
      var file = e.target.files.item(0);
      /* $("#approval_addcon img").attr("src",_webPath+"images/loader.gif"); */
      freader.readAsDataURL(file);
      freader.onloadstart = function(e) {
      }
      freader.onload = function(e) {
        target = e.target.result;
        var result = file.name.split('.');
        var suffix = (result[(result.length) - 1]).toLocaleLowerCase();
        if (suffix != 'jpg' && suffix != 'png' && suffix != 'jpeg') {
          /* layer.open({ content: '只能上传jpg,jpeg,png后缀图片', time: 2 }); */
          alert('只能上传jpg,jpeg,png后缀图片');
          return;
        }
        if (target.indexOf('image') == -1) {
          target = target.replace('data:', 'data:image/' + result[1] + ';');
        }
        /*
         * num--; $(".num i").text(num);
         */
        var form = new FormData();
        form.append("file", file);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              var responseText = xhr.responseText;
              // console.log(responseText);
              var s = eval('(' + responseText + ')');
              if(!s.success) {
                alert(s.msg || '图片上传失败，请稍后再试');
                return;
              } 
                
              setFiles_(s.obj);
            }
          }
        }
        xhr.open("post", _basePath + "festival/uploadFile", true);
        xhr.send(form);
      }
    }
  });
})
function removeFujian(id) {
  $('#' + id).remove();
}
function setFiles_(s) {
  var $fileupload = $("#fileupload_1");
  html_ = '<li class="pic" id=' + s.id + '><img id="' + s.content + '" src="'
      + ImagePath + '' + s.content + '" width="60" height="60"><i name='
      + s.id + '></i></li>';
  $('#fileupload_1 > li:last-child').before(html_);
  initEvent();

}
