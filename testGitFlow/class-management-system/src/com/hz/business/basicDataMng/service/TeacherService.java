package com.hz.business.basicDataMng.service;

import java.util.List;

import com.hz.business.basicDataMng.base.pojo.TeacherPO;

 
public interface TeacherService {
	 
	TeacherPO insertTeacher(TeacherPO po);
	 
	List<TeacherPO> teacherListByUserId(String teacherKey);
	
	boolean delClassTeacher(String ids);
	
	boolean updateClassTeacher(TeacherPO po);
	
	TeacherPO getTeacherById(String id);
	
	 
}
