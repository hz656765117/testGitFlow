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
import com.hz.business.basicDataMng.base.pojo.MajorPO;
import com.hz.business.basicDataMng.service.ClassAcademyService;
import com.hz.business.basicDataMng.service.ClassMajorService;


@Controller
@RequestMapping("/basicDataMng/majorMng")
public class MajorMngController extends BaseController{
	
	@Autowired
	public ClassAcademyService classAcademyService;
	@Autowired
	public ClassMajorService classMajorService;
	
	@RequestMapping("/index")
	public String toindex(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/majorMng/jsp/index" ;
	}
	
    @RequestMapping("listMajorMng")
    @ResponseBody
    public Map<String,Object> listAccounts(@ModelAttribute("search") SearchParam search, HttpServletRequest request) {
    	Map<String,Object> json = new HashMap<>();
        json.put("success", false);
   
        PageHelper.startPage(search.getPageNo(), search.getPageSize());
        Page<MajorPO> activitys = (Page<MajorPO>) classMajorService.majorListByUserId(search.getContent());
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
    @RequestMapping("/toCreateMajor")
	public String toCreateActivity(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
    	List<AcademyPO> list=classAcademyService.academyListByUserId(null);
		model.addAttribute("academyList", list);
    	return  "basicDataMng/majorMng/jsp/createMajor" ;
	}
    
    /**
     * 插入信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("/insertMajor")
    @ResponseBody
    public JsonResult insertActivity(MajorPO Major, HttpServletRequest request) {
        classMajorService.insertMajor(Major);
        return JsonResult.success("专业信息新增成功", Major);
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
    @RequestMapping("/toUpdateMajor")
	public String toupdateActivity(HttpServletRequest request,String majorKey ,HttpServletResponse response,Model model) throws IOException{
    	List<AcademyPO> list=classAcademyService.academyListByUserId(null);
    	MajorPO Major = classMajorService.getMajorById(majorKey);
    	model.addAttribute("academyList", list);
    	model.addAttribute("major", Major);
    	return  "basicDataMng/majorMng/jsp/createMajor" ;
	}
    
    /**
     * 保存修改信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("updateMajor")
    @ResponseBody
    public JsonResult updateActivity(MajorPO Major, HttpServletRequest request) {
        classMajorService.updateClassMajor(Major);
        return JsonResult.success("专业信息修改成功", Major);
    }
	
    /**
     * 删除信息
     * @param keyArr
     * @param request
     * @return
     */
    @RequestMapping("deleteMajor")
    @ResponseBody
    public JsonResult deleteActivity(Integer[] keyArr, HttpServletRequest request) {
    	String ids = StringUtils.join(keyArr, ",");
    	classMajorService.delClassMajor(ids);
        return JsonResult.success("专业信息删除成功");
    }
	
     
}
