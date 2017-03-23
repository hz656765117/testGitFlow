package com.hz.test.design.model5;

public class Source implements Sourceable{
	public Source(){
		System.out.println("Source的构造函数");
	}
	public void method1(){
		System.out.println("这里是source类中的method1方法");
	}

	public void method2() {
		System.out.println("这里是source类中的method2方法");
	}
}
