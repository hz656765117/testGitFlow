package com.hz.test.design.mode1;

public  class MySql implements Driver{
	public String connectDataSource(String url, String user, String pwd) {
		return "MySql数据库连接成功";
	}
}
