function delPic() {
	$("#imgId").attr("src",_webPath + "/images/nopic.jpg");
	picId = 0;
	$("#upfile").attr("value", "");
}

/**
 * 上传封面图片前处理函数
 * @returns {boolean}
 */
function beforeImgUpload(){
	return true;
}


/**
 * 上传封面图片后
 */
function imgUploadSucc(data) {
	$("#imgId").attr("src", _imgPath + data.url);
	$("#picUrl").val(data.url);
};

/**
 * 上传图片前处理函数
 * @returns {boolean}
 */
function beforebgImgUpload(){
	var length = $('#fileupload_1').find('li').length;
	if (length > 9){
		$('#addBtnFlag').hide();
		return false;
	}
	return true;
}

/**
 * 上传背景图片后
 */
function bgImgUploadSucc(data){
	var sid = data.id;
	var imgUrl=data.url;
	setFiles_Img(sid,imgUrl);
}

function setFiles_Img(sid,imgUrl){
	html_='<li class="pic" id='+ imgUrl +'><img id="'+ sid +'" src="'+ _imgPath + imgUrl +'" width="60" height="60"><i name='+sid+'></i></li>';
	$('#fileupload_1 > li:last-child').before(html_);
	var length = $('#fileupload_1').find('li').length;
	if (length > 9){
		$('#addBtnFlag').hide();
	}
	initEvent();
}