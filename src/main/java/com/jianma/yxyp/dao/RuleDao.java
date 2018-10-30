package com.jianma.yxyp.dao;

import java.util.List;
import java.util.Optional;

import com.jianma.yxyp.model.Rule;

public interface RuleDao {

	public void createRule(Rule rule);
	
	public void updateRule(Rule rule);
	
	public void deleteRule(int id);
	
	public List<Rule> getAllRule();
	
	public Optional<Rule> getRuleById(int id);
}
