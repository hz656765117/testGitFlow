package com.hz.business.classMoney.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.business.classMoney.base.dao.ClassMoneyMapper;
import com.hz.business.classMoney.service.ClassMoneyService;

@Service
@Transactional
public class ClassMoneyServiceImpl implements ClassMoneyService {
	@Autowired
	private ClassMoneyMapper mapper;
	
}
