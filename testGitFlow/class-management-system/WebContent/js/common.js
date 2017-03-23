 //Map操作
 function Map(){
	 this.container = new Object();
	 }


	 Map.prototype.put = function(key, value){
	 this.container[key] = value;
	 };


	 Map.prototype.get = function(key){
	 return this.container[key];
	 };


	 Map.prototype.keySet = function() {
	 var keyset = new Array();
	 var count = 0;
	 for (var key in this.container) {
	 // 跳过object的extend函数
	 if (key == 'extend') {
	 continue;
	 }
	 keyset[count] = key;
	 count++;
	 }
	 return keyset;
	 };


	 Map.prototype.size = function() {
	 var count = 0;
	 for (var key in this.container) {
	 // 跳过object的extend函数
	 if (key == 'extend'){
	 continue;
	 }
	 count++;
	 }
	 return count;
	 };;


	 Map.prototype.remove = function(key) {
	 delete this.container[key];
	 };


	 Map.prototype.toString = function(){
	 var str = "";
	 for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
	 str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
	 }
	 return str;
	 };
	 
	 
	 
	//公共ajax 请求
function  ajaxComon(url,in_data,errorAjax,successAjax){
	 $.ajax({
	 	url : url,
	 	type : 'POST',
	 	data : in_data,
	 	async : false,
	 	dataType : 'json',
	 	error : errorAjax,
	 	success :successAjax
	 });
	 }	


/**
 * 如果为空 则返回""
 */

function getValueOfNull(val){
	return val==null?"":val;
}
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

//普通弹层
var layerindex;
var layoptions;
function alertdialog(id){
	layoptions={
		type: 1,
        title: false,
        fix: true,
        maxWidth:'560px',
        scrollbar:false,
        shade:[0.7,'#000'],
        closeBtn:false,
        maxmin: false,
        content: $("#alert"+id)
	};
    if ($('body').find('.layui-layer').length>0)//大于一个弹窗时设遮罩透明度
    {  
		layoptions.shade=[0.2,'#000'];
    }
  layerindex=layer.open(layoptions);
}




