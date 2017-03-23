package com.hz.business.basicDataMng.service;

import java.util.List;

import com.hz.business.basicDataMng.base.pojo.ClassPO;


 
public interface ClassService {
	 
	ClassPO insertClass(ClassPO classPO);
	 
	List<ClassPO> classListByUserId(String className );
	
	boolean delClassInfo(String ids);
	
	boolean updateClassInfo(ClassPO classPO);
	
	ClassPO getClassById(String classKey);
	
	 
}
