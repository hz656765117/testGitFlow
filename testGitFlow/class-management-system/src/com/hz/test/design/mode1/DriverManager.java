package com.hz.test.design.mode1;

public class DriverManager {
	private Driver soureable;
	
	
	public String connectDataSource(String url, String user, String pwd) {
		return soureable.connectDataSource(url, user, pwd);
	}
	
	public Driver getSoureable() {
		return soureable;
	}

	public void setSoureable(Driver soureable) {
		this.soureable = soureable;
	}

}
