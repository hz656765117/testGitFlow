package com.hz.test.design.mode1;

public  class SqlServer implements Driver{
	public String connectDataSource(String url, String user, String pwd) {
		return "SqlServer数据库连接成功";
	}
}
