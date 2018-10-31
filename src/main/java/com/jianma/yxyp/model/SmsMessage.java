package com.jianma.yxyp.model;
// default package
// Generated 2018-10-31 11:09:19 by Hibernate Tools 4.3.1.Final

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "sms_message", catalog = "design_yxyp")
public class SmsMessage implements java.io.Serializable {

	private Integer id;
	private String remoteAddress;
	private String remoteHost;
	private String mobile;
	private String code;
	private Date createtime;

	public SmsMessage() {
	}

	public SmsMessage(String remoteAddress, String remoteHost, String mobile, Date createtime) {
		this.remoteAddress = remoteAddress;
		this.remoteHost = remoteHost;
		this.mobile = mobile;
		this.createtime = createtime;
	}

	public SmsMessage(String remoteAddress, String remoteHost, String mobile, String code, Date createtime) {
		this.remoteAddress = remoteAddress;
		this.remoteHost = remoteHost;
		this.mobile = mobile;
		this.code = code;
		this.createtime = createtime;
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

	@Column(name = "remoteAddress", nullable = false, length = 20)
	public String getRemoteAddress() {
		return this.remoteAddress;
	}

	public void setRemoteAddress(String remoteAddress) {
		this.remoteAddress = remoteAddress;
	}

	@Column(name = "remoteHost", nullable = false, length = 30)
	public String getRemoteHost() {
		return this.remoteHost;
	}

	public void setRemoteHost(String remoteHost) {
		this.remoteHost = remoteHost;
	}

	@Column(name = "mobile", nullable = false, length = 15)
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "code",length = 6)
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH-mm-ss")
	@Temporal(TemporalType.TIMESTAMP)
	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

}
