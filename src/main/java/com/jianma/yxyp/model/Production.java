package com.jianma.yxyp.model;
// Generated 2017-5-9 16:09:09 by Hibernate Tools 4.3.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Production generated by hbm2java
 */
@Entity
@Table(name = "production", catalog = "design_yxyp")
public class Production implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String title;
	private String title_en;
	private int userId;
	private String content;
	private String content_en;
	private String attachFile;
	private byte groupNum;
	private byte subGroupNum;
	private Date createTime;
	private Float score;
	private Byte status; //1.已提交、2.审核未通过、3.审核已通过、4.初选入围、5.初选未入围、6.复选入围、7复选未入围
	private String pimage;
	private byte participantType; //参赛人员类型 1：个人， 2：团队， 3：公司
	private String participantName; //参赛人员名称、团队名称、公司名称
	private String participantIdNumber; //参赛人员身份证号码、营业执照号码
	private String participantBrief; //简介
	private String teamMember; //团队成员
	private String affiliatedUnit;
	private byte round;
	private String weblink;
	private String adviser;
	
	public Production() {
	}

	public Production(String title, int userId, String content,String attachFile,byte participantType,
			String participantName, String participantIdNumber, String teamMember, Date createTime) {
		this.title = title;
		this.userId = userId;
		this.content = content;
		this.participantType = participantType;
		this.participantName = participantName;
		this.participantIdNumber = participantIdNumber;
		this.teamMember = teamMember;
		this.createTime = createTime;
		this.attachFile = attachFile;
	}

	public Production(String title, String title_en,int userId, byte groupNum, byte subGroupNum,String pimage, String content, String content_en,String attachFile,
			Byte status,byte participantType, String participantName,
			String participantIdNumber, String participantBrief, String teamMember, Float score,
			Date createTime) {
		this.title = title;
		this.userId = userId;
		this.groupNum = groupNum;
		this.pimage = pimage;
		this.content = content;
		this.status = status;
		this.participantType = participantType;
		this.participantName = participantName;
		this.participantIdNumber = participantIdNumber;
		this.participantBrief = participantBrief;
		this.teamMember = teamMember;
		this.score = score;
		this.createTime = createTime;
		this.attachFile = attachFile;
		this.title_en = title_en;
		this.content_en = content_en;
		this.subGroupNum = subGroupNum;
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

	@Column(name = "title", nullable = false, length = 30)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	@Column(name = "userId", nullable = false)
	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Column(name = "content", nullable = false, length = 65535)
	public String getContent() {
		return this.content;
	}

	
	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "attach_file", length = 100)
	public String getAttachFile() {
		return attachFile;
	}

	public void setAttachFile(String attachFile) {
		this.attachFile = attachFile;
	}

	@Column(name = "groupNum")
	public byte getGroupNum() {
		return groupNum;
	}

	public void setGroupNum(byte groupNum) {
		this.groupNum = groupNum;
	}

	@Column(name = "status")
	public Byte getStatus() {
		return this.status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}
	
	@Column(name = "pImage")
	public String getPimage() {
		return this.pimage;
	}

	public void setPimage(String pimage) {
		this.pimage = pimage;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_time", nullable = false, length = 19)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Column(name = "score", precision = 5)
	public Float getScore() {
		return this.score;
	}

	public void setScore(Float score) {
		this.score = score;
	}
	
	@Column(name = "participant_type", nullable = false)
	public byte getParticipantType() {
		return this.participantType;
	}

	public void setParticipantType(byte participantType) {
		this.participantType = participantType;
	}

	@Column(name = "participant_name", nullable = false, length = 20)
	public String getParticipantName() {
		return this.participantName;
	}

	public void setParticipantName(String participantName) {
		this.participantName = participantName;
	}

	@Column(name = "participant_id_number", nullable = false, length = 25)
	public String getParticipantIdNumber() {
		return this.participantIdNumber;
	}

	public void setParticipantIdNumber(String participantIdNumber) {
		this.participantIdNumber = participantIdNumber;
	}

	@Column(name = "participant_brief")
	public String getParticipantBrief() {
		return this.participantBrief;
	}

	public void setParticipantBrief(String participantBrief) {
		this.participantBrief = participantBrief;
	}

	@Column(name = "team_member", length = 30)
	public String getTeamMember() {
		return this.teamMember;
	}

	public void setTeamMember(String teamMember) {
		this.teamMember = teamMember;
	}

	@Column(name = "round")
	public byte getRound() {
		return this.round;
	}

	public void setRound(byte round) {
		this.round = round;
	}
	
	@Column(name = "affiliatedUnit", length = 20)
	public String getAffiliatedUnit() {
		return this.affiliatedUnit;
	}

	public void setAffiliatedUnit(String affiliatedUnit) {
		this.affiliatedUnit = affiliatedUnit;
	}

	@Column(name = "weblink", length = 255)
	public String getWeblink() {
		return weblink;
	}

	public void setWeblink(String weblink) {
		this.weblink = weblink;
	}

	@Column(name = "title_en", length = 255)
	public String getTitle_en() {
		return title_en;
	}

	public void setTitle_en(String title_en) {
		this.title_en = title_en;
	}

	@Column(name = "content_en")
	public String getContent_en() {
		return content_en;
	}

	public void setContent_en(String content_en) {
		this.content_en = content_en;
	}

	@Column(name = "subGroupNum")
	public byte getSubGroupNum() {
		return subGroupNum;
	}

	public void setSubGroupNum(byte subGroupNum) {
		this.subGroupNum = subGroupNum;
	}

	@Column(name = "adviser")
	public String getAdviser() {
		return adviser;
	}

	public void setAdviser(String adviser) {
		this.adviser = adviser;
	}
	
	
}
