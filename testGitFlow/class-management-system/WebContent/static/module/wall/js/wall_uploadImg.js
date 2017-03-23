/*$(function(){
 $("#fileupload_up").change(function(e) {
 if (1==1) {
 var freader = new FileReader();
 var file = e.target.files.item(0);
 freader.readAsDataURL(file);
 freader.onloadstart = function(e) {
 }
 freader.onload = function(e) {
 target = e.target.result;
 var result = file.name.split('.');
 var suffix = (result[(result.length) - 1]).toLocaleLowerCase();
 if (suffix != 'jpg' &&suffix != 'png' &&suffix != 'jpeg') {
 alert( '只能上传jpg,jpeg,png后缀图片');
 return;
 }
 if (target.indexOf('image') == -1) {
 target = target.replace('data:', 'data:image/' + result[1] + ';');
 }
 var form = new FormData();
 form.append("file", file);
 var xhr = new XMLHttpRequest();
 xhr.onreadystatechange = function() {
 if (xhr.readyState == 4) {
 if (xhr.status == 200) {
 var responseText = xhr.responseText;
 //						console.log(responseText);
 var s = eval('(' + responseText + ')');
 if (s == '-1') {
 } else {
 sid = s.picid;
 imgUrl_GG=s.picUrl;
 //							console.log(imgUrl_GG);
 setFiles_Img(s);
 }
 }
 }
 }
 xhr.open("post", _webPath+"wall/uploadFile", true);
 xhr.send(form);
 }
 }
 });
 })*/
function uploadpic_img() {
	new AjaxUpload('#addBtnFlag', {
		name: 'file',
		action: _webPath + 'wall/uploadFile',
		onChange: function (file, ext) {
		},
		onSubmit: function (file, ext) {
			if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF)$/.test(ext))) {
				$("#p_result").html('您上传的图片格式不对，请重新选择！');
				openDiv(8);
				return false;
			}
		},
		onComplete: function (file, response) {
			// response = response.replace(/<[^>]+>/g, '');
			var result = eval(response);
			if (result.success != null && result.success) {
				sid = result.picid;
				imgUrl_GG = result.picUrl;
				setFiles_Img(result);
			} else {
				$("#p_result").html('上传图片过程中,系统出现错误！');
				openDiv(8);
			}
		}
	});
}
function removeFujian(id) {
	$('#' + id).remove();
}
function setFiles_Img(s) {
	html_ = '<li class="pic" id=' + s.picid + '><img id="' + s.picUrl + '" src="' + _imgPath + '' + s.picUrl + '" width="60" height="60"><i name=' + s.picid + '></i></li>';
	$('#fileupload_1 > li:last-child').before(html_);
	initEvent();
}
