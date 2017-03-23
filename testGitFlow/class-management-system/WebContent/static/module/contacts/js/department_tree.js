window.selectEditNode = null;
window.checkNodeList = null;
window.treeHandlerType = 0;
/* 取消全部选中节点 */
var cancelSelectedNode = function () {
    var treeList = $('.clear-checked');
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        var nodes = treeObj.getCheckedNodes();
        for (var node in nodes) {
            nodes[node].checked = false;
        }
        treeObj.updateNode(nodes);
    });
}
/* 节点构造函数 */
function ZtreeNode(id, pId, name) {//定义ztree的节点类
    this.id = id;
    this.pId = pId;
    this.name = name;
}

function showDepartmentEditDialog() {
	// var origTree = $.fn.zTree.getZTreeObj("tree"); // 查看部门用的ztree
	// var editTree = $.fn.zTree.getZTreeObj("editTree"); // 编辑部门用的ztree
	// var selectedNode = origTree.getSelectedNodes()[0];
	// if(selectedNode != undefined) {
	// 	// 取消勾选之前的选中节点
	// 	var nodes = editTree.getCheckedNodes();
	// 	if (nodes.length > 0) {
	// 		editTree.checkNode(nodes[0], false, true);
	// 	}
	// 	// 将查看用的ztree的选中节点传递到编辑用的ztree，因为树节点是异步加载，所以可能树节点在部门编辑树中不存在
	// 	var editNode = editTree.getNodeByParam("id", selectedNode.id, null);
	// 	if(editNode != undefined) {
	// 		editTree.selectNode(editNode);
	// 		editTree.checkNode(editNode, true, true);
	// 	}
	// }
	customDialog('#editMember');
}

/* 移动部门 */
var treeNodeMoveTo = function (p_node, d_name) {
    var treeList = $('.sync-tree');
    for (var i = 0; i < window.checkNodeList.length; i++) {
        treeList.each(function () {
            var self = $(this);
            var tId = self.attr('id');
            var treeObj = $.fn.zTree.getZTreeObj(tId);
            window.selectNode = window.checkNodeList[i];
            p_node = treeObj.getNodesByFilter(getNodeById, true);
            window.selectNode = window.selectEditNode;
            t_node = treeObj.getNodesByFilter(getNodeById, true);
            t_node.name = d_name;
            treeObj.updateNode(t_node);
            treeObj.moveNode(p_node, t_node, 'inner');
        });
    }
    window.selectNode = null;
}
/* 编辑部门 */
var editDepartment = function () {
    var editorDepartment_name_p_department = $('#editorDepartment_name_p_department');
    var editorDepartment_name = $('#editorDepartment_name');
    editorDepartment_name_p_department.val('');
    editorDepartment_name.val('');
    window.checkNodeList = null;
    var treeObj = $.fn.zTree.getZTreeObj("editTree");
    var selectNodes = treeObj.getCheckedNodes()[0];
    window.selectEditNode = selectNodes;
    if (selectNodes == null || selectNodes == 'undefined') {
        layer.msg('请选择需要编辑的部门');
        return;
    }
    var level = selectNodes.level;
    if (level != 0) {
        var p_selectNodes = selectNodes.getParentNode();
        editorDepartment_name_p_department.val('/' + p_selectNodes.name);
    } else {
        editorDepartment_name_p_department.val('/');
    }
    window.checkNodeList = null;
    window.checkNodeList = [selectNodes];
    editorDepartment_name.val(selectNodes.name);
    window.treeHandlerType = 2;
    customDialog('#editorDepartment');
};
var addDepartment = function (parameter) {
    var editorDepartment_name_p_department = $('#add_new_department_belong_department');
    var editorDepartment_name = $('#add_new_department_name');

    var treeObj = $.fn.zTree.getZTreeObj("editTree");
    var selectNode = treeObj.getCheckedNodes()[0];
    window.selectNode = selectNode;
	if (selectNode === undefined) {
		layer.msg('请选择需要操作的部门');
		return;
	}

    if( selectNode !== undefined ){
    	editorDepartment_name_p_department.val(selectNode.name);
    } else {
		editorDepartment_name_p_department.val('');
	}
    editorDepartment_name.val('');
    window.checkNodeList = null;
    window.treeHandlerType = 1;
    cancelSelectedNode();
    customDialog('#addDepartment');
};

/* 上移 */
var moveDepartmentUp = function () {
    var tree = $.fn.zTree.getZTreeObj("editTree");
    var selectNodes = tree.getCheckedNodes();
    if (selectNodes.length < 1) {
        layer.msg('请选择需要操作的部门');
        return;
    }
    var selectNode = selectNodes[0];
    var index = tree.getNodeIndex(selectNode);
    if (index < 1) {
        return;
    }
    var preNode = selectNode.getPreNode();
    if (beforeMoveUp(selectNode, preNode)) {
        treeNodeUp(selectNode);
    }
};
/* 下移 */
var moveDepartmentDown = function () {
    var tree = $.fn.zTree.getZTreeObj("editTree");
    var selectNodes = tree.getCheckedNodes();
    if (selectNodes.length < 1) {
        layer.msg('请选择需要操作的部门');
        return;
    }
    var selectNode = selectNodes[0];
    var nextNode = selectNode.getNextNode();
    if (nextNode == 'undefined' || nextNode == null) {
        return;
    }
    if (beforeMoveDown(selectNode, nextNode)) {
        treeNodeDown(selectNode);
    }
};
//添加
var treeNodeAdd = function (newNode) {
    if (window.selectNode == null) {
        layer.msg('请选择归属部门');
    }
    var treeList = $('.sync-tree');
    var returns = [];
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        p_node = treeObj.getNodesByFilter(getNodeById, true);
        var childZNode = new ZtreeNode(newNode[0].id, p_node.id, newNode[0].name);
        var return_item = (treeObj.addNodes(p_node, childZNode, false));
        window.selectNode == null;
        returns.push(return_item);
    });
    return returns;
}
/* 上移 */
var treeNodeUp = function (selectNode) {
    window.selectNode = selectNode;
    var treeList = $('.sync-tree');
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        var t_node = treeObj.getNodesByFilter(getNodeById, true);
        if( t_node != null ){
        	var pre_node = t_node.getPreNode();
            var index = treeObj.getNodeIndex(t_node);
            if (index < 1) {
                return;
            }
            treeObj.moveNode(pre_node, t_node, 'prev');
        }
    });
    window.selectNode = null;
}
/* 下移 */
var treeNodeDown = function (selectNode) {
    window.selectNode = selectNode;
    var treeList = $('.sync-tree');
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        var t_node = treeObj.getNodesByFilter(getNodeById, true);
        if( t_node != null ){
        	var pre_node = t_node.getNextNode();
            treeObj.moveNode(t_node, pre_node, 'prev');
        }
    });
    window.selectNode = null;
}
/* 删除部门 */
var treeNodeRemove = function (selectNode) {
    window.selectNode = selectNode;
    var treeList = $('.sync-tree');
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        var t_node = treeObj.getNodesByFilter(getNodeById, true);
    });
}

var deleteDepartment = function () {
    var canDelete = true;
    initNumberVerify();
    $('#input_verify').val("");
    var delete_move_department = $('#delete_move_department');
    delete_move_department.val('');
    var treeObject = $.fn.zTree.getZTreeObj("editTree");
    var selectNode = treeObject.getCheckedNodes()[0];
    if (selectNode == 'undefined' || selectNode == null) {
        layer.msg('请选择需要操作的部门');
        return;
    }
    if (selectNode.length < 1) {
        layer.msg('请选择需要操作的部门');
        return;
    }
    var nodes = treeObject.getNodes();
    if( selectNode.id == nodes[0].id ){
    	layer.msg('根部门不能删除');
        return;
    }
    window.selectNode = selectNode;
    /* 校验是否有子部门 */
    if (checkHasChildDepartment(selectNode)) { //如果有
        customDialog('#canNotDeleteDepartMent');
    } else {//如果没有
    	if( checkHasPerson(selectNode) ){
    		customDialog('#canDeleteDepartMentWithPerson');
    	}else{
    		customDialog('#canDeleteDepartMent');
    	}
    }
};

var canDeleteDepartMentWithPerson = function () {
    var input_verify = $('#input_verify').val();
    if ($.trim(input_verify) == '' || $.trim(input_verify) == 'undefined' || $.trim(input_verify) == null) {
        layer.msg('请输入验证码');
        return;
    }
    var num_verify = $('#num_verify').text();
    if ( $.trim(input_verify).toUpperCase() == $.trim(num_verify).toUpperCase() ) {
    	closedialog('#canDeleteDepartMentWithPerson');
        /* 请求 */
    	var loadingIndex = layer.load();
        if (beforeDelDepartmentWithPerson(loadingIndex)) {
            removeSelectNode();
            layer.msg('删除成功');
        } else {
            layer.msg('删除失败');
        }
    }else{
    	layer.msg('验证码输入错误');
    }
}

var canDeleteDepartMent = function () {
	closedialog('#canDeleteDepartMent');
	/* 请求 */
	var loadingIndex = layer.load();
    if (beforeDelDepartment(loadingIndex)) {
        removeSelectNode();
        layer.msg('删除成功');
    } else {
        layer.msg('删除失败');
    }
}

/* 移除选择的部门 */
var removeSelectNode = function () {
    var treeList = $('.sync-tree');
    treeList.each(function () {
        var self = $(this);
        var tId = self.attr('id');
        var treeObj = $.fn.zTree.getZTreeObj(tId);
        t_node = treeObj.getNodesByFilter(getNodeById, true);
        treeObj.removeNode(t_node);
    });
    window.selectNode = null;
}

var initNumberVerify = function () {
    var verifyChart = generateMixed(4);
    window.verifyChart = verifyChart;
    $('#num_verify').html(verifyChart);
}

function generateMixed(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

/* 根据id获取节点 */
var getNodeById = function (node) {
    return (node.id == window.selectNode.id);
}
/* 添加部门 */
var addNewDepartment = function () {
	closedialog('#addDepartment');
    var addNewDepartment = $('#add_new_department_name').val();
    if ($.trim(addNewDepartment) == 'undefined' || $.trim(addNewDepartment) == null || $.trim(addNewDepartment) == '') {
        layer.msg('请填写部门名称');
        return;
    }

    if (window.selectNode == null) {
        layer.msg('请选择归属部门');
        return;
    }

    /* 这个需要特别注意 id 是程序开发赋值的 */
    var p_node = window.selectNode;
    var loadingIndex = layer.load();
    var addNodeId = beforeAddNode(loadingIndex,p_node, addNewDepartment);
    if ( addNodeId > 0 ) {
    	var newNode = [{id:addNodeId,pId:p_node.id,name: addNewDepartment}];
        var successNodes = treeNodeAdd(newNode);
        if (successNodes == null && successNodes.length < 1) {
            layer.msg('添加失败');
        } else {
            layer.msg('添加成功');
        }
    }
}
/* 编辑部门 移动 */
var editNewDepartment = function () {
	closedialog('#editorDepartment');
    var addNewDepartment = $('#editorDepartment_name').val();
    if ($.trim(addNewDepartment) == 'undefined' || $.trim(addNewDepartment) == null || $.trim(addNewDepartment) == '') {
        layer.msg('请填写部门名称');
        return;
    }
    if (window.checkNodeList == null) {
        layer.msg('请选择归属部门');
        return;
    }
    if (window.checkNodeList.length < 1) {
        layer.msg('请选择归属部门');
        return;
    }
    var treeObj = $.fn.zTree.getZTreeObj("editTree");
    var selectNode = treeObj.getCheckedNodes()[0];
    window.selectNode = selectNode;
    var p_department = window.selectNode;
    var loadingIndex = layer.load();
    if (beforEditNode(loadingIndex,p_department.getParentNode(), addNewDepartment)) {
        treeNodeMoveTo(p_department, addNewDepartment);
    } else {
        layer.msg('编辑失败');
    }
}
/* 储存待添加的部门 */
var reServeCheckedNodes = function () {
    var treeObj = $.fn.zTree.getZTreeObj('tree-bm');
    var checkNodes = treeObj.getCheckedNodes();
    if (checkNodes.length < 1) {
        layer.msg('请选择归属部门');
    }
    window.checkNodeList = checkNodes;
    window.selectNode = checkNodes[0];
    $('#add_new_department_belong_department').val(checkNodes[0].name);
    closedialog('#showDepartmentBm');
}
/* 判断是否有成员勾选 */
var checkedHockMember = function () {
    var memberList = $('#memberList');
    var chks = memberList.find("input[type=checkbox]:checked");
    if (chks.length < 1) {
        layer.msg('请勾选需要操作的成员');
        return false;
    }
    return true;
}
/* 返回选中的成员 */
var getCheckedHockMember = function () {
    var memberList = $('#memberList');
    var chks = memberList.find("input[type=checkbox]:checked");
    return chks;
}
/* 这一部分是初始化tree */
var setting = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick
		  }
};


var setting_bm = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
		  check   : {
	        enable   : true,
	        chkStyle : "radio",
	        radioType: "all"
		  }
};

var setting_edit = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
		  check   : {
	        enable   : true,
	        chkStyle : "radio",
	        radioType: "all"
		 }
};



var setting_delete = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
	      check   : {
	        enable  : true,
	        chkStyle: "checkbox",
	      }
};


var setting_right = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
		  check: {
	        enable: true,
	        chkStyle: "checkbox",
	        chkboxType: {
	          "Y": "",
	          "N": ""
	        }
		 }
};



var setting_shift = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
		  check   : {
	        enable  : true,
	        chkStyle: "checkbox",
	        chkboxType: { "Y": "", "N": "" }
		  }
};

/* 转移-树 */

var setting_seldepart = {
		  async: {
		    enable: true,
		    url : ctx + "/module/department/getRootAndChildDepart",
		    autoParam: ["id=pid"],
		    dataFilter : filter,
		    type: 'get'
		  },
		  simpleData: {
		    enable: true,
		    idKey: "id",
		    pIdKey: "pid",
		    rootPId: 0
		  },
		  view: {
		    showIcon: false,
		    selectedMulti: true
		  },
		  callback: {
		    onAsyncSuccess: ztreeOnAsyncSuccess,
		    onClick       : zTreeOnClick,
		    onCheck       : zTreeOnCheck
		  },
	      check   : {
	    	enable   : true,
	        chkStyle : "checkbox",
	        radioType: "all"
	     }
};

/* 默认选中事件 */
function zTreeOnClick(event, treeId, treeNode) {
  window.selectNode = treeNode;
  treeNode.checked = true;
  var treeObj = $.fn.zTree.getZTreeObj(treeId);
  treeObj.updateNode(treeNode);
  if( treeId == "tree" ){
  	  pageInit(treeNode.id);//默认加载一个节点数据
  }
}

function zTreeOnCheck(event, treeId, treeNode) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	if(treeNode.checked) {
	  treeObj.selectNode(treeNode,false,false);
	} else {
	  treeObj.cancelSelectedNode(treeNode);
	}
}


var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
    return false;
}


function beforeEditName(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.selectNode(treeNode);
    return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
}
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.selectNode(treeNode);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
    showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}
function beforeRename(treeId, treeNode, newName, isCancel) {
    className = (className === "dark" ? "" : "dark");
    showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("tree");
        setTimeout(function () {zTree.editName(treeNode)}, 10);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
}
function showRemoveBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
}
function showRenameBtn(treeId, treeNode) {
    return !treeNode.isLastNode;
}
function showLog(str) {
    console.log(str);
}
function getTime() {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}
$('body').on('click', function () {
    $("#div_caozuo").hide();
})
var newCount = 1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button edit' id='addBtn_" + treeNode.tId
        + "' title='title define' onfocus='this.blur();'></span>";
    //sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function (e) {
        var pointX = e.pageX;
        var pointY = e.pageY;
        $("#div_caozuo").css({'left': pointX, 'top': pointY}).show();
        e.stopPropagation();
    });
};
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};
function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
}

