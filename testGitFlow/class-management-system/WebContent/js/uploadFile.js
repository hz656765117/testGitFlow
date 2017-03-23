$(function(){
	
	
	
	

$("#fileupload_up").change(function(e) {
//	console.log(1);
	if (1==1) {
		var freader = new FileReader();
		var file = e.target.files.item(0);
	/* 	$("#approval_addcon img").attr("src",_webPath+"images/loader.gif"); */
		freader.readAsDataURL(file);
		freader.onloadstart = function(e) {
		}
		freader.onload = function(e) {
			target = e.target.result;
			var result = file.name.split('.');
			var suffix = (result[(result.length) - 1]).toLocaleLowerCase();
			if (suffix != 'txt' &&suffix != 'docx' &&suffix != 'ppt' && suffix != 'pptx' && suffix != 'xls'&& suffix != 'xlsx'&& suffix != 'pdf'&& suffix != 'doc') {
				/* layer.open({  content: '只能上传jpg,jpeg,png后缀图片', time: 2 }); */
				alert( '仅支持doc.docx.ppt.pptx.txt.xlsx.xls.pdf.类型文件');
				return;
			}
			if (target.indexOf('image') == -1) {
				target = target.replace('data:', 'data:image/' + result[1] + ';');
			}
			/* num--;
			$(".num i").text(num); */
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
//							console.log("1111111");
							$("#p_result").html("仅支持doc.docx.ppt.pptx.txt.xlsx.xls.pdf.类型文件！");
							$("#alertdiv8").OpenDiv();
						} else {
							sid = s.picid;
							imgUrl_GG=s.picUrl;
//							console.log(imgUrl_GG);
							setFiles_(s);
						}
					}
				}
			}
			xhr.open("post", _basePath+"announcement/uploadFile", true);
			xhr.send(form);
		}
	}
});
})
function removeFujian(id){
	$('#'+id).remove();
}
/*function uploadEvent(){
	$("fileupload_").trigger("click");
}*/
