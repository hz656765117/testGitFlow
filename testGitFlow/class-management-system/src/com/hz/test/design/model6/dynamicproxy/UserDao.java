package com.hz.test.design.model6.dynamicproxy;

public class UserDao implements IUserDao {

	public boolean findUserById(long id) {
		System.out.println("kllllllll");
		return false;
	}

}
