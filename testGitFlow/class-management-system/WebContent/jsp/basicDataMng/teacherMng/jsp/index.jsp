<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<link type="text/css" rel="stylesheet" href="${webPath}css/common.css?v=2017030902"/>
<link type="text/css" rel="stylesheet" href="${webPath}css/admin/index.css?v=2017030902"/>
<link type="text/css" rel="stylesheet" href="${webPath}css/user.css?v=2017030902">
<link rel="stylesheet" href="${webPath}js/ztree/css/zTreeStyle.css?v=2017030902" />
<script type="text/javascript" src="${webPath}js/jquery.divbox.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/js/layer/layer.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}js/public.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}js/visible.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/js/mustache/mustache.min.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/module/attend/js/app.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/module/attend/js/page.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}jsp/basicDataMng/teacherMng/js/teacher.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/js/box/viewrange/viewrange.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}js/ztree/js/jquery.ztree.all-3.5.min.js?v=2017030902"></script>
<style>
	.view-box{
		z-index:10005;
	}
	.ztree{
		height: auto;
	}
</style>
 <div class="bg-bai clearfix over-hidden parents">
	  <div class="" >
	  <div class="landtitle">
			<h3 class="col-xs-5">教师信息维护
			</h3>
		</div>
	   

	    <div class="mb10 mt10 searchVo">
				<form class=" form-inline form-inline-sm">
					<!-- 点击新建的时候是展示另外一个界面 -->
					<a role="button" class="btn btn-primary mr8" href="${webPath}basicDataMng/teacherMng/toCreateTeacher.do"  >新建</a>
<!-- 					<a href="javascript:void(0);" onclick="delConfirm('all')" class="btn btn-default mr18 hui"><i class="ico-del-link icon-bg">批量删除</i></a> -->
					<div class="form-group form-group-sm">
						<input class="form-control input-large" id="searchTxt" param="search.content" placeholder="按教师工号或者姓名查询">
					</div>
					<a role="button" class="btn btn-success btn-primary">查询</a>
				</form>
		</div>


			    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mytable caozuo  mb20 table">
					<tr>
							<th width="3%"><input type="checkbox" name="box_all" id="box_all"  onclick="check_all()" /><label for="checkbox"></label></th>
							<th class="text-left" width="10%">教师工号</th>
							<th class="text-left" width="27%">教师姓名</th>
							<th  class="text-left" width="20%">性别</th>
							<th  class="text-left" width="20%">身份证号</th>
							<th class="text-center" width="20%"></th>
					</tr>
					<tbody id="container">
					</tbody>
			   </table>
				<div id="page"></div>
				<!-- 以下是每一行数据的模板，这个每个地方需要更具业务不同进行修改 -->
			   <textarea id="template" class="template" style="display: none">
				   {{#obj}}
				   	<tr>
					      <td class="text-center"><input type="checkbox" name="box" id="box" value="{{academyKey}}" /></td>
					      <td class="text-left">
 						{{teacherKey}}
						</td>
					      <td class="text-left"><span class="hui" >
					      {{name}}
					      </span></td>
					       <td class="text-left"><span class="hui" >
					      {{sexStr}}
					      </span></td>
					       <td class="text-left"><span class="hui" >
					      {{idcardNumber}}
					      </span></td>
					       <td><p class="clearfix text-right  pr8">
					   		       <a class="ico-del icon-caozuo f0 fr mr10" href="javascript:void(0);" onclick="delConfirm('single','{{academyKey}}');" title="删除" >删除</a>
					   		       <a class="ico-edit icon-caozuo f0 fr mr10" href="javascript:void(0);"onclick="getById('{{academyKey}}');" title="编辑" >编辑</a>
				   		    </p>
				   		   </td>
					  </tr>
				   {{/obj}}
			   </textarea>

		</div>
   </div>
 </div>

<!-- 选择判断是否的选择面板 -->
 <div class="pop-up w360  bg-hui01" id="alertdiv7">
	<div class="pt30 pb30 text-center">
		<p id="p_result7" class="hei01 f16 mt16">确认删除所选中的?</p>
	</div>
	<p class="text-center mb40">
		<a href="javascript:void(0);" id="ok" class="f20 bai bg-lv-cur display-ib lh38 h38 bd-lv br4 text-center w158">确 定</a>
		<span><a href="javascript:void(0);"onclick="$('#alertdiv7').CloseDiv()" class="f20 hui display-ib w158 btn-bg02 bd-hui01 lh38 h38 br4 text-center ml6">取消</a></span>
	</p>
</div>
 <script type="text/javascript">
		//checkbox选择所有点击事件触发的方法
		function check_all(){
			$("input[name='box']").each(function(){
				$(this).attr("checked",$("#box_all").attr("checked")=='checked');
			});
		}

		//点击删除时触发此方法，此方法主要给嘻嘻提示框绑定删除方法和打开提示框
		function delConfirm(type,id){
			$('#ok').attr("onclick","delete_all('"+type+"',"+id+")");
			$('#alertdiv7').OpenDiv();
		}
		//删除执行方法
		function delete_all(type,id){
			var ids='';
			if(type=='all'){//删除所有，此时删除所有选中的行的数据
				$("input[name='box']").each(function(){
					if($(this).attr("checked")=='checked'){
						ids+=$(this).val()+",";
					}
				});
				ids = ids.substring(0,ids.length-1);
			}else{//删除单个
				ids=id;
			}
			//提示至少删除一行
			if(ids=='' || ids==null){
                layer.alert('请至少选择一行');
				return ;
			}
			//执行删除方法
			var url="${webPath}basicDataMng/teacherMng/deleteTeacher.do?keyArr="+ids;
			$.post(url,function(json){
				if(json.success){
					$("#box_all").prop('checked', false);//去掉所有的行选择
					loadData(1); // 搜索查询默认查询第一页
					$('#alertdiv7').CloseDiv();//关闭提示框
				}
			});
		}
		//获取修改面板		
		function getById (id){
			var url="${webPath}basicDataMng/teacherMng/toUpdateTeacher.do?teacherKey="+id;
			location = url;
		}
 </script>