package com.hz.test.design.model3;

import java.io.Serializable;

public class Detail implements Serializable{
	public long age;
	public String email;
	
	public Detail(long age, String email){
		this.age = age;
		this.email =  email;
	}
	
	public long getAge() {
		return age;
	}
	public void setAge(long age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
