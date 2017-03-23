package com.hz.test.design.mode1;

public  class Db2 implements Driver{
	public String connectDataSource(String url, String user, String pwd) {
		return "Db2 数据库连接成功";
	}
}
