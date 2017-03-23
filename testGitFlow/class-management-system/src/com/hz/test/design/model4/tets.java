package com.hz.test.design.model4;

class tets {
	public static void main(String[] args) {
		String a = "abc";
		System.out.println(a);
		System.out.println(a.hashCode());
		a= a+ "d";
		System.out.println(a);
		System.out.println(a.hashCode());
		StringBuffer sb = new StringBuffer();
		sb.append("abc");
		System.out.println(sb);
		System.out.println(sb.hashCode());
		sb.append("d");
		System.out.println(sb);
		System.out.println(sb.hashCode());
		
		String b = "abcd";
		String c =  "abcd";
		boolean bl = a.equals(b);
		System.out.println(bl);
		System.out.println(a.hashCode()+"--"+b.hashCode());
		System.out.println(a==b);
		System.out.println(b==c);
		String d = new String("sss");
		String f = new String("sss");
		System.out.println(d==f);
	}
}
