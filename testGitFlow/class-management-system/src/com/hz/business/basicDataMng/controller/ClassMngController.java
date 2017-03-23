package com.hz.business.basicDataMng.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.box.base.page.Page;
import com.box.base.page.PageHelper;
import com.hz.business.base.controller.BaseController;
import com.hz.business.base.model.JsonResult;
import com.hz.business.base.model.SearchParam;
import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.base.pojo.ClassPO;
import com.hz.business.basicDataMng.base.pojo.MajorPO;
import com.hz.business.basicDataMng.service.ClassAcademyService;
import com.hz.business.basicDataMng.service.ClassMajorService;
import com.hz.business.basicDataMng.service.ClassService;


@Controller
@RequestMapping("/basicDataMng/classMng")
public class ClassMngController extends BaseController{
	
	@Autowired
	public ClassAcademyService classAcademyService;
	@Autowired
	public ClassMajorService classMajorService;
	@Autowired
	public ClassService classService;
	
	@RequestMapping("/index")
	public String toindex(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/classMng/jsp/index" ;
	}
	
    @RequestMapping("listClassMng")
    @ResponseBody
    public Map<String,Object> listAccounts(@ModelAttribute("search") SearchParam search, HttpServletRequest request) {
    	Map<String,Object> json = new HashMap<>();
        json.put("success", false);
   
        PageHelper.startPage(search.getPageNo(), search.getPageSize());
        Page<ClassPO> activitys = (Page<ClassPO>) classService.classListByUserId(search.getContent());
        if(activitys.isEmpty()) {
            return json;
        }

        
        json.put("success", true);
        json.put("obj", activitys);
        json.put("curPage", search.getPageNo());
        json.put("totalPage",  activitys.isEmpty() ? 1 : activitys.getPages());
        return json;
    }
    
    /**
     * 获取创建面板
     * @param request
     * @param response
     * @param model
     * @return
     * @throws IOException
     */
    @RequestMapping("/toCreateClass")
	public String toCreateActivity(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
    	List<AcademyPO> list=classAcademyService.academyListByUserId(null);
		model.addAttribute("academyList", list);
    	return  "basicDataMng/classMng/jsp/createClass" ;
	}
    
    /**
     * 插入信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("/insertClass")
    @ResponseBody
    public JsonResult insertActivity(ClassPO classPO, HttpServletRequest request) {
        classService.insertClass(classPO);
        return JsonResult.success("班级信息新增成功", classPO);
    }
    
    /**
     * 获取修改面板
     * @param request
     * @param id
     * @param response
     * @param model
     * @return
     * @throws IOException
     */
    @RequestMapping("/toUpdateClass")
	public String toupdateClass(HttpServletRequest request,String classKey ,HttpServletResponse response,Model model) throws IOException{
    	List<AcademyPO> list=classAcademyService.academyListByUserId(null);
    	ClassPO classPO = classService.getClassById(classKey);
    	model.addAttribute("academyList", list);
    	model.addAttribute("classPO", classPO);
    	return  "basicDataMng/classMng/jsp/createClass" ;
	}
    
    /**
     * 保存修改信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("updateClass")
    @ResponseBody
    public JsonResult updateActivity(ClassPO classPO, HttpServletRequest request) {
        classService.updateClassInfo(classPO);
        return JsonResult.success("班级信息修改成功", classPO);
    }
	
    /**
     * 删除信息
     * @param keyArr
     * @param request
     * @return
     */
    @RequestMapping("deleteClass")
    @ResponseBody
    public JsonResult deleteActivity(Integer[] keyArr, HttpServletRequest request) {
    	String ids = StringUtils.join(keyArr, ",");
    	classService.delClassInfo(ids);
        return JsonResult.success("班级信息删除成功");
    }
	
    
    /**
     * 根据学院主键获取专业信息
     * @param keyArr
     * @param request
     * @return
     */
    @RequestMapping("majorList")
    @ResponseBody
    public JsonResult majorList(String academyKey, HttpServletRequest request) {
    	List<MajorPO> list=classMajorService.majorListByAcademyKey(academyKey);
        return JsonResult.success(list);
    }
     
}
