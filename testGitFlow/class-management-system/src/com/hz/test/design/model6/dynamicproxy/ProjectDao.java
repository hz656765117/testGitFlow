package com.hz.test.design.model6.dynamicproxy;

public class ProjectDao  implements IProjectDao{

	public String getProNameById() {
		System.out.println("ProjectDao");  
		return "ProjectDao";
	}
	
}
