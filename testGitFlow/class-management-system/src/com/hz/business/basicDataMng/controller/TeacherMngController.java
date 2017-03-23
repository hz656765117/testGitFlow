package com.hz.business.basicDataMng.controller;

import java.io.IOException;
import java.util.HashMap;
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
import com.hz.business.basicDataMng.base.pojo.TeacherPO;
import com.hz.business.basicDataMng.service.TeacherService;


@Controller
@RequestMapping("/basicDataMng/teacherMng")
public class TeacherMngController extends BaseController{
	
	@Autowired
	public TeacherService teacherService;
	
	@RequestMapping("/index")
	public String toindex(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/teacherMng/jsp/index" ;
	}
	
    @RequestMapping("listTeacherMng")
    @ResponseBody
    public Map<String,Object> listAccounts(@ModelAttribute("search") SearchParam search, HttpServletRequest request) {
    	Map<String,Object> json = new HashMap<>();
        json.put("success", false);
   
        PageHelper.startPage(search.getPageNo(), search.getPageSize());
        Page<TeacherPO> activitys = (Page<TeacherPO>) teacherService.teacherListByUserId(search.getContent());
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
    @RequestMapping("/toCreateTeacher")
	public String toCreateActivity(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/teacherMng/jsp/createTeacher" ;
	}
    
    /**
     * 插入信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("/insertTeacher")
    @ResponseBody
    public JsonResult insertActivity(TeacherPO Teacher, HttpServletRequest request) {
        teacherService.insertTeacher(Teacher);
        return JsonResult.success("教师新增成功", Teacher);
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
    @RequestMapping("/toUpdateTeacher")
	public String toupdateActivity(HttpServletRequest request,String teacherKey ,HttpServletResponse response,Model model) throws IOException{
    	TeacherPO teacher = teacherService.getTeacherById(teacherKey);
    	model.addAttribute("teacher", teacher);
    	return  "basicDataMng/teacherMng/jsp/createTeacher" ;
	}
    
    /**
     * 保存修改信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("updateTeacher")
    @ResponseBody
    public JsonResult updateActivity(TeacherPO teacher, HttpServletRequest request) {
        teacherService.updateClassTeacher(teacher);
        return JsonResult.success("教师修改成功", teacher);
    }
	
    /**
     * 删除信息
     * @param keyArr
     * @param request
     * @return
     */
    @RequestMapping("deleteTeacher")
    @ResponseBody
    public JsonResult deleteTeacher(Integer[] keyArr, HttpServletRequest request) {
    	String ids = StringUtils.join(keyArr, ",");
    	teacherService.delClassTeacher(ids);
        return JsonResult.success("教师信息删除成功");
    }
	
     
}
