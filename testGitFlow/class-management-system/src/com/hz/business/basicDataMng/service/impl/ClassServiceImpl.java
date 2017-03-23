package com.hz.business.basicDataMng.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.base.utils.common.BoxConvertUtils;
import com.hz.business.basicDataMng.base.dao.ClassPOMapper;
import com.hz.business.basicDataMng.base.pojo.ClassPO;
import com.hz.business.basicDataMng.base.pojo.ClassPOExample;
import com.hz.business.basicDataMng.base.pojo.MajorPO;
import com.hz.business.basicDataMng.base.pojo.MajorPOExample;
import com.hz.business.basicDataMng.service.ClassService;

 
@Service
@Transactional
public class ClassServiceImpl implements ClassService{
    @Autowired
    private ClassPOMapper classPOMapper;

	@Override
	public ClassPO insertClass(ClassPO classPO) {
		classPO.setCreateDate(new Date());
		classPOMapper.insert(classPO);
		return classPO;
	}

	@Override
	public List<ClassPO> classListByUserId(String className) {
		ClassPOExample example = new ClassPOExample();
		//创建方法，添加搜索条件
		example.createCriteria().andListLikeTo(className);
		List<ClassPO>  list = classPOMapper.selectByExample(example);
		return list;
	}

	@Override
	public boolean delClassInfo(String ids) {
		if ( StringUtils.isBlank(ids) ) {
			return false ;
		}
		List<String> list = BoxConvertUtils.convert(ids, ",", String.class);
		for (String key : list) {
			classPOMapper.deleteByPrimaryKey(key);
		}
		return true;
	}

	@Override
	public boolean updateClassInfo(ClassPO classPO) {
		classPO.setCreateDate(new Date());
		classPOMapper.updateByPrimaryKeySelective(classPO);
		return true;
	}

	@Override
	public ClassPO getClassById(String classKey) {
		return classPOMapper.selectByPrimaryKey(classKey);
	}
}
