package com.hz.business.classSystem.base.pojo;

import java.util.ArrayList;
import java.util.List;

public class DmkYearTermExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public DmkYearTermExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andYearTermKeyIsNull() {
            addCriterion("year_term_key is null");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyIsNotNull() {
            addCriterion("year_term_key is not null");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyEqualTo(String value) {
            addCriterion("year_term_key =", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyNotEqualTo(String value) {
            addCriterion("year_term_key <>", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyGreaterThan(String value) {
            addCriterion("year_term_key >", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyGreaterThanOrEqualTo(String value) {
            addCriterion("year_term_key >=", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyLessThan(String value) {
            addCriterion("year_term_key <", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyLessThanOrEqualTo(String value) {
            addCriterion("year_term_key <=", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyLike(String value) {
            addCriterion("year_term_key like", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyNotLike(String value) {
            addCriterion("year_term_key not like", value, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyIn(List<String> values) {
            addCriterion("year_term_key in", values, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyNotIn(List<String> values) {
            addCriterion("year_term_key not in", values, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyBetween(String value1, String value2) {
            addCriterion("year_term_key between", value1, value2, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermKeyNotBetween(String value1, String value2) {
            addCriterion("year_term_key not between", value1, value2, "yearTermKey");
            return (Criteria) this;
        }

        public Criteria andYearTermNameIsNull() {
            addCriterion("year_term_name is null");
            return (Criteria) this;
        }

        public Criteria andYearTermNameIsNotNull() {
            addCriterion("year_term_name is not null");
            return (Criteria) this;
        }

        public Criteria andYearTermNameEqualTo(String value) {
            addCriterion("year_term_name =", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameNotEqualTo(String value) {
            addCriterion("year_term_name <>", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameGreaterThan(String value) {
            addCriterion("year_term_name >", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameGreaterThanOrEqualTo(String value) {
            addCriterion("year_term_name >=", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameLessThan(String value) {
            addCriterion("year_term_name <", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameLessThanOrEqualTo(String value) {
            addCriterion("year_term_name <=", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameLike(String value) {
            addCriterion("year_term_name like", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameNotLike(String value) {
            addCriterion("year_term_name not like", value, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameIn(List<String> values) {
            addCriterion("year_term_name in", values, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameNotIn(List<String> values) {
            addCriterion("year_term_name not in", values, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameBetween(String value1, String value2) {
            addCriterion("year_term_name between", value1, value2, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearTermNameNotBetween(String value1, String value2) {
            addCriterion("year_term_name not between", value1, value2, "yearTermName");
            return (Criteria) this;
        }

        public Criteria andYearKeyIsNull() {
            addCriterion("year_key is null");
            return (Criteria) this;
        }

        public Criteria andYearKeyIsNotNull() {
            addCriterion("year_key is not null");
            return (Criteria) this;
        }

        public Criteria andYearKeyEqualTo(String value) {
            addCriterion("year_key =", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyNotEqualTo(String value) {
            addCriterion("year_key <>", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyGreaterThan(String value) {
            addCriterion("year_key >", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyGreaterThanOrEqualTo(String value) {
            addCriterion("year_key >=", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyLessThan(String value) {
            addCriterion("year_key <", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyLessThanOrEqualTo(String value) {
            addCriterion("year_key <=", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyLike(String value) {
            addCriterion("year_key like", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyNotLike(String value) {
            addCriterion("year_key not like", value, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyIn(List<String> values) {
            addCriterion("year_key in", values, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyNotIn(List<String> values) {
            addCriterion("year_key not in", values, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyBetween(String value1, String value2) {
            addCriterion("year_key between", value1, value2, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearKeyNotBetween(String value1, String value2) {
            addCriterion("year_key not between", value1, value2, "yearKey");
            return (Criteria) this;
        }

        public Criteria andYearNameIsNull() {
            addCriterion("year_name is null");
            return (Criteria) this;
        }

        public Criteria andYearNameIsNotNull() {
            addCriterion("year_name is not null");
            return (Criteria) this;
        }

        public Criteria andYearNameEqualTo(String value) {
            addCriterion("year_name =", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameNotEqualTo(String value) {
            addCriterion("year_name <>", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameGreaterThan(String value) {
            addCriterion("year_name >", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameGreaterThanOrEqualTo(String value) {
            addCriterion("year_name >=", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameLessThan(String value) {
            addCriterion("year_name <", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameLessThanOrEqualTo(String value) {
            addCriterion("year_name <=", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameLike(String value) {
            addCriterion("year_name like", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameNotLike(String value) {
            addCriterion("year_name not like", value, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameIn(List<String> values) {
            addCriterion("year_name in", values, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameNotIn(List<String> values) {
            addCriterion("year_name not in", values, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameBetween(String value1, String value2) {
            addCriterion("year_name between", value1, value2, "yearName");
            return (Criteria) this;
        }

        public Criteria andYearNameNotBetween(String value1, String value2) {
            addCriterion("year_name not between", value1, value2, "yearName");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}