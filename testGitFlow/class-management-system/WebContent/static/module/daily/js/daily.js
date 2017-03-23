
var grid ;
$(function(){
	grid = $("#grid-data").bootgrid({
	    ajax: true,
	    rowCount:20,
	    post: function ()
	    {
	        return {
	        	departName:$("#deptName").val(),
	        	name:$("#personName").val(),
	        	readComment:$("#readComment option:selected").val()
	        };
	    },
	    url: "/module/daily/ajax/getList",
	    formatters: {
	        "caozuo":function(column, row){
	        	return  "<p class=\"clearfix text-right operate\">"+
                        "<a class=\"iconfont f30\" href=\"javascript:void(0)\" title=\"查看\" onclick=\"getDetail("+row.id+");\">&#xe63a;</a>"+
                        "<a class=\"iconfont\" href=\"javascript:void(0)\" title=\"删除\" onclick=\"confirmDel("+row.id+");\">&#xe61e;</a>"+
	                    "</p> ";
	        }
	    }
	    
	}).on("loaded.rs.jquery.bootgrid", function (e)
    {
		  $('.table tr').hover(function(){
			    $(this).find('.operate').show();
			    },function(){
			    $(this).find('.operate').hide();
              });
    });
	
});

//加载表格
function searchList(){
		 grid.bootgrid("reload"); 
}


//查看详情信息

function  getDetail(id){
	customDialog('#alert1');
	//查看日报基本信息
	 var config = {
	     url:"/module/daily/ajax/detail",
	     data:{id:id},
	     success:function(data){
	    	 var dto =  data.obj;
	    	 $("#personNameSpan").text(dto.personName);//发起人
	    	 $("#deptNameSpan").text(dto.deptNames);//部门
	    	 $("#doTimeSpan").text(dto.doTime);//报告
	    	 $("#createtimeSpan").text(dto.createtime);//发起时间
	    	 $("#typeSpan").text(dto.typeName);//类型
	    	 $("#statusSpan").text(dto.readCommentName);//状态
	    	 $("#summarySpan").text(dto.summary);//内容
	    	 $("#planSpan").text(dto.plan);//计划
	    	 $("#experienceSpan").text(dto.experience);//心得
	     }	 
	 };
	 ajaxSubmit(config);
	//查看日报评论信息 
	  config = {
		     url:"/module/daily/ajax/getCommentLogList",
		     data:{dailyId:id},
		     success:function(data){
		    	 var html ="";
		    	 var list =  data.obj;
		    	$.each(list,function(i){
		    		var dto = list[i];
					html +="<tr >";
					html +="<td class=\"text-center hei01\">" +dto.personName + "</td>";
					html +="<td class=\"text-center hei01\">" +dto.createtime + "</td>";
					html+="<td class=\"text-center hei01\">"+dto.content+"</td>";
					html+="</tr>";
		    		
		    	});
		    	$("#logTbody").html(html);
		     }	 
		 };
	  ajaxSubmit(config);
}


function confirmDel(id)
{
	layer.confirm('确认删除该审批记录?',function(){
		  config = {
				     url:"/module/daily/ajax/delete",	
				     data:{id:id},
				     success:function(data){
				    	layer.alert(data.msg);
				    	if(data.success){
				    		grid.bootgrid("remove",id); 
				    	}
				     }	 
				 };
		  ajaxSubmit(config);
	});


	
}

function exportPage(){
	var departName = $("#deptName").val();
	var name = $("#personName").val();
	var readComment = $("#readComment option:selected").val();
	window.location.href = "/module/daily/export?departName="+departName+"&name="+name+"&readComment"+readComment;
}

