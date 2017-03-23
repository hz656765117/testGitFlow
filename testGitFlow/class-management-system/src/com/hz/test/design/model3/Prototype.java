package com.hz.test.design.model3;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * 原型模式
 * 深复制和浅复制
 * @author huangzhuo
 */
public class Prototype implements Cloneable ,Serializable{
	private String name ;
	private String pwd ;
	private Detail detail;
	
	public Prototype(String name,String pwd,Detail d){
		this.name = name ;
		this.pwd = pwd;
		this.detail = d;
	}
	
	public Object clone() throws CloneNotSupportedException {  
		Prototype proto = (Prototype) super.clone();  
		return proto;  
   } 
	
	public Object deepClone() throws IOException, ClassNotFoundException 
	{ 
		 //将对象写到流里 
		 ByteArrayOutputStream bo=new ByteArrayOutputStream(); 
		 ObjectOutputStream oo=new ObjectOutputStream(bo); 
		 oo.writeObject(this); 
		 //从流里读出来 
		 ByteArrayInputStream bi=new ByteArrayInputStream(bo.toByteArray()); 
		 ObjectInputStream oi=new ObjectInputStream(bi); 
		 return(oi.readObject()); 
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}  
	
	
	
	
	public Detail getDetail() {
		return detail;
	}

	public void setDetail(Detail detail) {
		this.detail = detail;
	}

	public static void main(String[] args) throws CloneNotSupportedException, IOException, ClassNotFoundException {
		Prototype p1 = new Prototype("hz","123",new Detail(24,"656765117@qq.com"));
		Prototype p2 =  (Prototype) p1.deepClone();
		p1.setName("huangzhuo");
		p2.getDetail().setAge(25);
		System.out.println(p1.name);
		System.out.println(p1.getDetail().getAge());
		
		System.out.println(p2.name);
		System.out.println(p2.getDetail().getAge());
	}

}
