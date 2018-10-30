package com.jianma.yxyp.model;
// Generated 2017-3-26 18:14:32 by Hibernate Tools 4.3.1.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Role generated by hbm2java
 */
@Entity
@Table(name = "role", catalog = "design_yl")
public class Role implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String rolename;
	private Date createtime;
	private Set<UserRole> userRoles = new HashSet<UserRole>(0);
	private Set<PermissionRole> permissionRoles = new HashSet<PermissionRole>(0);

	public Role() {
	}

	public Role(String rolename) {
		this.rolename = rolename;
	}

	public Role(String rolename, Set<UserRole> userRoles, Set<PermissionRole> permissionRoles) {
		this.rolename = rolename;
		this.userRoles = userRoles;
		this.permissionRoles = permissionRoles;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "Id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "rolename", nullable = false, length = 10)
	public String getRolename() {
		return this.rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
	public Set<UserRole> getUserRoles() {
		return this.userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
	public Set<PermissionRole> getPermissionRoles() {
		return this.permissionRoles;
	}

	public void setPermissionRoles(Set<PermissionRole> permissionRoles) {
		this.permissionRoles = permissionRoles;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH-mm-ss")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createtime", nullable = false, length = 19)
	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	
}
