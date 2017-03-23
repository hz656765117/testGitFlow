package com.hz.test.design.mode1;

public class MyDriver extends DriverManager {

	@Override
	public String connectDataSource(String url, String user, String pwd) {
		return super.connectDataSource(url, user, pwd);
	}
	
}
