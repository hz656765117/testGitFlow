
function searchHelp(pageNumber){
   var title = 	$.trim($("#title").val());
  var  url = _webPath+"search/searchHelp";
   var  parameters = {};
   parameters["title"] = title;
   parameters["pageNumber"] = pageNumber;
  // parameters["coreName"] = "helps";
  $.ajax({
	 	url : url,
	 	type : 'POST',
	 	data : parameters,
	 	dataType : 'json',
	 	success :function(ret){
	       $("#title_list").html("");
	       var html = "";
	       var data = ret.obj;
	       $.each(data,function(i){
	    	   var id = data[i].id;
	    	   var title = data[i].title;
	    	   var name = data[i].name;
	    	   var remark = data[i].remark==null?"":data[i].remark;
	    	   html = html+ "<dl class='help-dl'>"+
	                        "<dt><a href='"+_webPath+"helps/helps_content_"+id+".html'  title='"+title+"' target='_parent'>"+title+"</a><span class='help-lm'>栏目:"+name+"</span></dt>"+
	                        "<dd>"+remark+"</dd>"+
	                        "</dl>";
	       })
	       if(html ==""){
	    	   html = "<div  class='pt12 f14 hui text-center' >无记录</div>"
	       }
	       $("#title_list").html(html);
	       showpageFun2($("#page"),ret.attributes.pageNum, ret.attributes.pages, "searchHelp"); 
	       
	 	}
	 });

}




function searchNews(pageNumber){
	   var title = 	$.trim($("#title").val());
	  var  url = _webPath+"search/searchNews";
	   var  parameters = {};
	   parameters["title"] = title;
	   parameters["pageNumber"] = pageNumber;
	  // parameters["coreName"] = "helps";
	  $.ajax({
		 	url : url,
		 	type : 'POST',
		 	data : parameters,
		 	dataType : 'json',
		 	success :function(ret){
		       $("#title_list").html("");
		       var html = "";
		       var data = ret.obj;
		       $.each(data,function(i){
		    	   var id = data[i].id;
		    	   var title = data[i].title;
		    	   var name = data[i].name;
		    	   var remark = data[i].remark==null?"":data[i].remark;
		    	   html = html+ "<dl class='help-dl'>"+
		                        "<dt><a href='"+_webPath+"news/detail-"+id+".html'  title='"+title+"' target='_parent'>"+title+"</a></dt>"+
		                        "</dl>";
		       })
		       if(html ==""){
		    	   html = "<div  class='pt12 f14 hui text-center' >无记录</div>"
		       }
		       $("#title_list").html(html);
		       showpageFun2($("#page"),ret.attributes.pageNum, ret.attributes.pages, "searchHelp"); 
		       
		 	}
		 });

	}