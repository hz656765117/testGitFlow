package com.hz.test.design.model6.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class DAOLogHandler implements InvocationHandler  {
	private Object obj;
	
	public DAOLogHandler(Object obj) {
		System.out.println(obj);
		this.obj = obj;
	}

	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		executebefore();
		Object result = method.invoke(obj, args); //转发调用  
		executeafter();
		return result;
	}
	
	public void executebefore(){
		System.out.println("动态代理之前");
	}
	
	public void executeafter(){
		System.out.println("动态代理之后");
	}

}
