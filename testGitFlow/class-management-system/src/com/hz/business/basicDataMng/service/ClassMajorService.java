package com.hz.business.basicDataMng.service;

import java.util.List;

import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.base.pojo.MajorPO;

 
public interface ClassMajorService {
	 
	MajorPO insertMajor(MajorPO activity);
	 
	List<MajorPO> majorListByUserId(String najorName );
	
	boolean delClassMajor(String ids);
	
	boolean updateClassMajor(MajorPO classMajor);
	
	MajorPO getMajorById(String majorKey);

	List<MajorPO> majorListByAcademyKey(String academyKey);
	
	 
}
