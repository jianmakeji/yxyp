package com.jianma.yxyp.service;

import com.jianma.yxyp.model.Permission;

public interface PermissionsService {

	public int createPermission(Permission permission);

	public int deletePermission(Long permissionId);
}
