package com.hz.test.thread;

public class Test2 {
	public static void main(String[] args) {
		Test1 t = new Test1();
		t.start();
		
		Test1 t1 = new Test1();
		t1.start();
	}
}
