package com.hz.test.design.model5;

/**
 * 顾名思义，装饰模式就是给一个对象增加一些新的功能，
 * 而且是动态的，要求装饰对象和被装饰对象实现同一个接口，
 * 装饰对象持有被装饰对象的实例，
 * @author huangzhuo
 *
 */
public class Decorator extends Source1 implements Sourceable {
	public Sourceable source;
	
	public Decorator(Sourceable source){
		this();
		System.out.println("Decorator的构造函数");
		this.source = source;
	}
	public Decorator(){
		System.out.println("无参构造函数");
	}

	public void method1() {
		System.out.println("111111");
		source.method1();
		System.out.println("222222222");
	}

	public void method2() {
		System.out.println("3333333");
		source.method2();
		System.out.println("4444444444");
	}

}
