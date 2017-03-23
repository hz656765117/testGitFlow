/**
 * Created by lichuanjing on 2016/3/29.
 */
$Contacts = {};
(function (self) {
    self.selectNode = null;
    self.checkedNode = null;
    self.handler = 0;
    /* 对象集合 */
    self.getAddNodePanel = function () {
        return ( $('.add-node-panel'));
    };
    self.getEditNodePanel = function () {
        return ( $('.edit-node-panel') );
    };
    self.getEditTree = function () {
        return ($('.edit-tree'));
    };
    self.getSyncTree = function () {
        return ($('.sync-tree'));
    };
    self.getSelectedNode = function () {
        var editTree = $.fn.zTree.getZTreeObj('edittTree');
        var selectNode = editTree.getSelectedNodes()[0];
        return selectNode;
    };
    self.getSelectedNodeId = function () {
        var editTree = $.fn.zTree.getZTreeObj('edittTree');
        var selectNode = editTree.getSelectedNodes()[0];
        return selectNode.id;
    };
    /* end 对象集合 */
    /* 判断 edit-tree 是否有选中 */
    self.editTreeIsSelect = function () {
        var editTree = $.fn.zTree.getZTreeObj('edittTree');
        var selectNode = editTree.getSelectedNodes();
        if (selectNode < 1) {
            return false;
        } else {
            return true;
        }
    };
    /* 获取sync-tree对象 */
    self.getTreeObjects = function () {
        var returns = [];
        var trees = $('.sync-tree');
        trees.each(function () {
            var myself = $(this);
            var t_id = myself.attr('id');
            var treeObject = $.fn.zTree.getZTreeObj(t_id);
            returns.push(treeObject);
        });
        return returns;
    }
    /* 根据节点id获取节点 */
    self.getNodeById = function (node) {
        return (node.id == self.getSelectedNodeId());
    };
    /* 显示添加面板 */
    self.showAddPanel = function () {
        customDialog('#addDepartment');
    };
    /* 显示编辑面板 */
    self.showEditPanel = function () {
        if (self.editTreeIsSelect()) {
            customDialog('#editorDepartment');
        } else {
            layer.msg('请选择需要操作的部门');
        }
    };
    /* 设置上移 */
    self.setSelectNodeMoveUp = function () {
        if (self.editTreeIsSelect()) {
            var selectNode = self.getSelectedNode();
            if (beforeMoveUp()) {
                var syncTrees = self.getSyncTree();
                syncTrees.each(function () {
                    var mySelf = $(this);
                    var id = mySelf.attr('id');
                    var this_tree = $.fn.zTree.getZTreeObj(id);
                    console.log(this_tree);
                    var this_node = this_tree.getNodesByFilter(self.getNodeById, true);
                    var this_pre_node = this_node.getPreNode();
                    this_tree.moveNode(this_node, this_pre_node, 'prev');
                });
                layer.msg('移动成功');
            }
        } else {
            layer.msg('请选择需要操作的部门');
        }
    };
    /* 设置下移 */
    self.setSelectNodeMoveDown = function () {
        if (self.editTreeIsSelect()) {
            var selectNode = self.getSelectedNode();
            if (beforeMoveDown()) {
                var syncTrees = self.getSyncTree();
                syncTrees.each(function () {
                    var mySelf = $(this);
                    var id = mySelf.attr('id');
                    var this_tree = $.fn.zTree.getZTreeObj(id);
                    var this_node = this_tree.getNodesByFilter(self.getNodeById, true);
                    var this_pre_node = this_node.getPreNode(this_node);
                    var index = this_tree.getNodeIndex();
                    if (index < 1) {
                        return;
                    }
                    this_tree.moveNode(this_pre_node, this_node, 'prev');
                });
                layer.msg('移动成功');
            }
        } else {
            layer.msg('请选择需要操作的部门');
        }
    }
})($Contacts);
/* 移动前需要保存 */
var beforeMoveUp = function (selectNode, preNode) {
    return true;
}
/* 移动前需要保存 */
var beforeMoveDown = function (selectNode, preNode) {
    return true;
}



