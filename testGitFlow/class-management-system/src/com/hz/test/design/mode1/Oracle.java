package com.hz.test.design.mode1;

public  class Oracle implements Driver{
	public String connectDataSource(String url, String user, String pwd) {
		return "Oracle数据库连接成功";
	}
}
