package com.hz.test.abs;

public abstract class PersistWare {
  
	protected void disableSecondLevelCache() {
		System.out.println("disableSecondLevelCache");
	}
	
	protected void enableSecondLevelCache() {
		System.out.println("enableSecondLevelCache");
	}
	
	public void test1(){
		System.out.println("test1");
	}
	
  
}
