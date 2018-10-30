package com.jianma.yxyp.model;
// Generated 2017-5-16 17:16:33 by Hibernate Tools 4.3.1.Final

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * FindPwd generated by hbm2java
 */
@Entity
@Table(name = "find_pwd", catalog = "design_yl")
public class FindPwd implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String email;
	private String validCode;
	private Date outDate;

	public FindPwd() {
	}

	public FindPwd(String email, String validCode, Date outDate) {
		this.email = email;
		this.validCode = validCode;
		this.outDate = outDate;
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

	@Column(name = "email", nullable = false, length = 30)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "validCode", nullable = false, length = 50)
	public String getValidCode() {
		return this.validCode;
	}

	public void setValidCode(String validCode) {
		this.validCode = validCode;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "outDate", nullable = false, length = 19)
	public Date getOutDate() {
		return this.outDate;
	}

	public void setOutDate(Date outDate) {
		this.outDate = outDate;
	}

}
