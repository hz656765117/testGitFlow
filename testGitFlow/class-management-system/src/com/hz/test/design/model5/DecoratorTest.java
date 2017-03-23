package com.hz.test.design.model5;

public class DecoratorTest {
	public static void main(String[] args) {
		Sourceable source = new Source();
		Decorator dt = new Decorator(source);
		dt.method1();
		dt.method2();
	}
}
