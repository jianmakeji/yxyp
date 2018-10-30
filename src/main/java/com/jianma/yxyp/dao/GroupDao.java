package com.jianma.yxyp.dao;

import java.util.List;

import com.jianma.yxyp.model.Group;

public interface GroupDao {

	public void createGroup(Group group);
	
	public void deleteGroup(int id);
	
	public void updateGroup(Group group);
	
	public List<Group> getAllGroup();
}
