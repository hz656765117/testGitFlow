package com.hz.test.design.mode1;

/**
 * 工厂方法模式
 * @author huangzhuo
 *
 */
public class DriverTest {
	public static void main(String[] args) {
		MyDriver myDriver = new MyDriver();
		Driver source1 = new MySql();
		myDriver.setSoureable(source1);
		String result = myDriver.connectDataSource("192.168.12.45:3600/itsm", "root", "123456");
		System.out.println(result);
		
		DriverManager manager = new DriverManager();
		Driver source2 = new Oracle();
		manager.setSoureable(source2);
		String result2 = manager.connectDataSource("192.168.12.45:3600/itsm", "root", "123456");
		System.out.println(result2);
	}
}
