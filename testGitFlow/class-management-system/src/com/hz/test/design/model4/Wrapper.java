package com.hz.test.design.model4;

/**
 * 适配器模式-对象的适配器模式
 * 基本思路和类的适配器模式相同，只是将Adapter类作修改，
 * 这次不继承Source类，而是持有Source类的实例，以达到解决兼容性的问题
 * @author huangzhuo
 *
 */
public class Wrapper implements Targetable {
	public Source source;
	
	public  Wrapper(Source source){
		this.source = source;
	}
	 

	public void method2() {
		System.out.println("这里是Wrapper类中的method2");
	}



	public void method1() {
		// TODO Auto-generated method stub
		source.method1();
	}

}
