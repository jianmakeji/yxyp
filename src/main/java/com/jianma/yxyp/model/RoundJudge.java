package com.jianma.yxyp.model;
// Generated 2017-5-24 17:31:56 by Hibernate Tools 4.3.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

/**
 * RoundJudge generated by hbm2java
 */
@Entity
@Table(name = "round_judge", catalog = "design_yl")
@DynamicInsert
public class RoundJudge implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String roundName;
	private String judge;
	private String describes;
	
	public RoundJudge() {
	}

	public RoundJudge(String judge) {
		this.judge = judge;
	}

	public RoundJudge(String roundName, String judge) {
		this.roundName = roundName;
		this.judge = judge;
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

	@Column(name = "roundName", length = 20)
	public String getRoundName() {
		return this.roundName;
	}

	public void setRoundName(String roundName) {
		this.roundName = roundName;
	}

	@Column(name = "judge",  length = 40)
	public String getJudge() {
		return this.judge;
	}

	public void setJudge(String judge) {
		this.judge = judge;
	}

	@Column(name = "describes", length = 50)
	public String getDescribes() {
		return describes;
	}

	public void setDescribes(String describes) {
		this.describes = describes;
	}
	
	

}
