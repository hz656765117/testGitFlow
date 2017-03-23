var flag = false;
Boxjs = {
	template : null,
	loadedCache : null,
	listUrl : ctx+'/basicDataMng/majorMng/listMajorMng.do', // 搜索路由
	pageSize : 10,
	searchVo : 'searchVo',// 搜索条件的父元素 下面所有param='vo.xxx' 都会自动放入搜索条件，后端vo对象接收即可
	deleteUrl : ctx+'/account/delete',
	noPageShow : false
// 没有分页的时候不显示
};
$(function() {
	Boxjs.template = $('#template').remove().val();// 渲染模板内容，删除后放到Boxjs.template
});

Date.prototype.Format = function (fmt) { //author: meizz 
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
formatTem = {
    appNamesStr : function() {
		if (this.appNames) {
			if (this.appNames.length>20) {
				return this.appNames.substring(0,20) + "....";
			} else {
				return this.appNames;
			}

		}
		return '';
	},
	createDateStr : function() {
        if (this.createDate) {
            var timeStr = new Date(this.createDate).Format("yyyy-MM-dd hh:mm:ss");
            return timeStr;
        }
        return '';
    }
};


