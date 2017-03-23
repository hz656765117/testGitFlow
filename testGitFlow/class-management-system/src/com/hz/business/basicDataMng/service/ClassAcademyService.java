package com.hz.business.basicDataMng.service;

import java.util.List;

import com.hz.business.basicDataMng.base.pojo.AcademyPO;

 
public interface ClassAcademyService {
	 
	AcademyPO insertAcademy(AcademyPO activity);
	 
	List<AcademyPO> academyListByUserId(String userId );
	
	boolean delClassAcademy(String ids);
	
	boolean updateClassAcademy(AcademyPO classActivity);
	
	AcademyPO getAcademyById(String id);
	
	 
}
