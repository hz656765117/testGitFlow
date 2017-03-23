package com.hz.business.classMoney.base.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class ClassMoneyExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ClassMoneyExample() {
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

        protected void addCriterionForJDBCDate(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value.getTime()), property);
        }

        protected void addCriterionForJDBCDate(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                dateList.add(new java.sql.Date(iter.next().getTime()));
            }
            addCriterion(condition, dateList, property);
        }

        protected void addCriterionForJDBCDate(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value1.getTime()), new java.sql.Date(value2.getTime()), property);
        }

        public Criteria andClassMoneyKeyIsNull() {
            addCriterion("class_money_key is null");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyIsNotNull() {
            addCriterion("class_money_key is not null");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyEqualTo(String value) {
            addCriterion("class_money_key =", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyNotEqualTo(String value) {
            addCriterion("class_money_key <>", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyGreaterThan(String value) {
            addCriterion("class_money_key >", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyGreaterThanOrEqualTo(String value) {
            addCriterion("class_money_key >=", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyLessThan(String value) {
            addCriterion("class_money_key <", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyLessThanOrEqualTo(String value) {
            addCriterion("class_money_key <=", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyLike(String value) {
            addCriterion("class_money_key like", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyNotLike(String value) {
            addCriterion("class_money_key not like", value, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyIn(List<String> values) {
            addCriterion("class_money_key in", values, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyNotIn(List<String> values) {
            addCriterion("class_money_key not in", values, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyBetween(String value1, String value2) {
            addCriterion("class_money_key between", value1, value2, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andClassMoneyKeyNotBetween(String value1, String value2) {
            addCriterion("class_money_key not between", value1, value2, "classMoneyKey");
            return (Criteria) this;
        }

        public Criteria andMoneyIsNull() {
            addCriterion("money is null");
            return (Criteria) this;
        }

        public Criteria andMoneyIsNotNull() {
            addCriterion("money is not null");
            return (Criteria) this;
        }

        public Criteria andMoneyEqualTo(Double value) {
            addCriterion("money =", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyNotEqualTo(Double value) {
            addCriterion("money <>", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyGreaterThan(Double value) {
            addCriterion("money >", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyGreaterThanOrEqualTo(Double value) {
            addCriterion("money >=", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyLessThan(Double value) {
            addCriterion("money <", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyLessThanOrEqualTo(Double value) {
            addCriterion("money <=", value, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyIn(List<Double> values) {
            addCriterion("money in", values, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyNotIn(List<Double> values) {
            addCriterion("money not in", values, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyBetween(Double value1, Double value2) {
            addCriterion("money between", value1, value2, "money");
            return (Criteria) this;
        }

        public Criteria andMoneyNotBetween(Double value1, Double value2) {
            addCriterion("money not between", value1, value2, "money");
            return (Criteria) this;
        }

        public Criteria andDatetimeIsNull() {
            addCriterion("datetime is null");
            return (Criteria) this;
        }

        public Criteria andDatetimeIsNotNull() {
            addCriterion("datetime is not null");
            return (Criteria) this;
        }

        public Criteria andDatetimeEqualTo(Date value) {
            addCriterionForJDBCDate("datetime =", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeNotEqualTo(Date value) {
            addCriterionForJDBCDate("datetime <>", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeGreaterThan(Date value) {
            addCriterionForJDBCDate("datetime >", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("datetime >=", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeLessThan(Date value) {
            addCriterionForJDBCDate("datetime <", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("datetime <=", value, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeIn(List<Date> values) {
            addCriterionForJDBCDate("datetime in", values, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeNotIn(List<Date> values) {
            addCriterionForJDBCDate("datetime not in", values, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("datetime between", value1, value2, "datetime");
            return (Criteria) this;
        }

        public Criteria andDatetimeNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("datetime not between", value1, value2, "datetime");
            return (Criteria) this;
        }

        public Criteria andCommontsIsNull() {
            addCriterion("commonts is null");
            return (Criteria) this;
        }

        public Criteria andCommontsIsNotNull() {
            addCriterion("commonts is not null");
            return (Criteria) this;
        }

        public Criteria andCommontsEqualTo(String value) {
            addCriterion("commonts =", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsNotEqualTo(String value) {
            addCriterion("commonts <>", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsGreaterThan(String value) {
            addCriterion("commonts >", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsGreaterThanOrEqualTo(String value) {
            addCriterion("commonts >=", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsLessThan(String value) {
            addCriterion("commonts <", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsLessThanOrEqualTo(String value) {
            addCriterion("commonts <=", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsLike(String value) {
            addCriterion("commonts like", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsNotLike(String value) {
            addCriterion("commonts not like", value, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsIn(List<String> values) {
            addCriterion("commonts in", values, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsNotIn(List<String> values) {
            addCriterion("commonts not in", values, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsBetween(String value1, String value2) {
            addCriterion("commonts between", value1, value2, "commonts");
            return (Criteria) this;
        }

        public Criteria andCommontsNotBetween(String value1, String value2) {
            addCriterion("commonts not between", value1, value2, "commonts");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(String value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(String value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(String value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(String value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(String value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(String value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLike(String value) {
            addCriterion("type like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotLike(String value) {
            addCriterion("type not like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<String> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<String> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(String value1, String value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(String value1, String value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andClassKeyIsNull() {
            addCriterion("class_key is null");
            return (Criteria) this;
        }

        public Criteria andClassKeyIsNotNull() {
            addCriterion("class_key is not null");
            return (Criteria) this;
        }

        public Criteria andClassKeyEqualTo(String value) {
            addCriterion("class_key =", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyNotEqualTo(String value) {
            addCriterion("class_key <>", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyGreaterThan(String value) {
            addCriterion("class_key >", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyGreaterThanOrEqualTo(String value) {
            addCriterion("class_key >=", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyLessThan(String value) {
            addCriterion("class_key <", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyLessThanOrEqualTo(String value) {
            addCriterion("class_key <=", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyLike(String value) {
            addCriterion("class_key like", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyNotLike(String value) {
            addCriterion("class_key not like", value, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyIn(List<String> values) {
            addCriterion("class_key in", values, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyNotIn(List<String> values) {
            addCriterion("class_key not in", values, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyBetween(String value1, String value2) {
            addCriterion("class_key between", value1, value2, "classKey");
            return (Criteria) this;
        }

        public Criteria andClassKeyNotBetween(String value1, String value2) {
            addCriterion("class_key not between", value1, value2, "classKey");
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