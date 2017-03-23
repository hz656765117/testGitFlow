package com.hz.test.design.model4;

/**
 * 适配器模式-类的适配器模式
 * 有一个Source类，拥有一个方法，待适配，目标接口是Targetable，
 * 通过Adapter类，将Source的功能扩展到Targetable里
 * @author huangzhuo
 *
 */
public class Adapter extends Source implements Targetable {

	public void method2() {
		System.out.println("这里是实现Targetable接口的method2方法");
	}

}
