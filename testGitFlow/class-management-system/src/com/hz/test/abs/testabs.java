package com.hz.test.abs;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class testabs {
	public static void main(String[] args) {
//		BaseDao  bd = new BaseDao();
//		bd.disableSecondLevelCache();
//		
//		FlowDao fd = new FlowDao();
		
		long c = test(2000,1000);
		System.out.println(c);
		
		Long[] ls = {10048650L,(long) 10048710,(long)10056110};
		List<Long> ss = Arrays.asList(ls);
		System.out.println(ss);
		
		List<Long> userList = new ArrayList<Long>();
		Collections.addAll(userList, ls);
	
		String[] sss ={"10048650","10048710","10056110"};
		List<String> sd = Arrays.asList(sss);
		if(sd.contains(10048650L)){
			System.out.println("lllkk");
		}
	}
	
	
	public static long test(long a ,long b){
		long c = b-a;
		c = Math.abs(c);
		return c;
	}
	
	
	
	
	
	
	
	
	
}