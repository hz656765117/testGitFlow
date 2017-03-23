package com.hz.test.thread;

import java.util.Date;

public class Test1 extends Thread {

	@Override
	public void run() {
		System.out.println(new Date());
	}
	
	

}
