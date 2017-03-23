package com.hz.test.design.model6.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

public class Client {
	public static void main(String[] args) {
//		 InvocationHandler handler = null;  
//	 	 IUserDao userDAO = new UserDao();  
//		 handler = new DAOLogHandler(userDAO);  
//		 IUserDao proxy = null;  
//		//动态创建代理对象，用于代理一个AbstractUserDAO类型的真实主题对象  
//		 proxy = (IUserDao)Proxy.newProxyInstance(IUserDao.class.getClassLoader(), new Class[]{IUserDao.class}, handler);  
//		 boolean ss = proxy.findUserById(11); //调用代理对象的业务方法  
//		 
//		 
//		 IProjectDao proDAO = new ProjectDao();
//		 handler = new DAOLogHandler(proDAO);
//		 IProjectDao proxynew = null;
//		 proxynew = (IProjectDao)Proxy.newProxyInstance(IProjectDao.class.getClassLoader(), new Class[]{IProjectDao.class}, handler);  
//		 String name = proxynew.getProNameById();
//		 System.out.println(name);
		IProjectDao proDAO = new ProjectDao();
		String name = proDAO.getProNameById();
		System.out.println(name);
		
	}
}
