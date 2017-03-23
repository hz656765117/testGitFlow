package com.hz.business.basicDataMng.base.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hz.business.basicDataMng.base.pojo.AcademyPOExample.Criteria;

public class MajorPOExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MajorPOExample() {
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

        public Criteria andMajorKeyIsNull() {
            addCriterion("major_key is null");
            return (Criteria) this;
        }

        public Criteria andMajorKeyIsNotNull() {
            addCriterion("major_key is not null");
            return (Criteria) this;
        }

        public Criteria andMajorKeyEqualTo(String value) {
            addCriterion("major_key =", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyNotEqualTo(String value) {
            addCriterion("major_key <>", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyGreaterThan(String value) {
            addCriterion("major_key >", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyGreaterThanOrEqualTo(String value) {
            addCriterion("major_key >=", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyLessThan(String value) {
            addCriterion("major_key <", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyLessThanOrEqualTo(String value) {
            addCriterion("major_key <=", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyLike(String value) {
            addCriterion("major_key like", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyNotLike(String value) {
            addCriterion("major_key not like", value, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyIn(List<String> values) {
            addCriterion("major_key in", values, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyNotIn(List<String> values) {
            addCriterion("major_key not in", values, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyBetween(String value1, String value2) {
            addCriterion("major_key between", value1, value2, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorKeyNotBetween(String value1, String value2) {
            addCriterion("major_key not between", value1, value2, "majorKey");
            return (Criteria) this;
        }

        public Criteria andMajorNameIsNull() {
            addCriterion("major_name is null");
            return (Criteria) this;
        }

        public Criteria andMajorNameIsNotNull() {
            addCriterion("major_name is not null");
            return (Criteria) this;
        }

        public Criteria andMajorNameEqualTo(String value) {
            addCriterion("major_name =", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameNotEqualTo(String value) {
            addCriterion("major_name <>", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameGreaterThan(String value) {
            addCriterion("major_name >", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameGreaterThanOrEqualTo(String value) {
            addCriterion("major_name >=", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameLessThan(String value) {
            addCriterion("major_name <", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameLessThanOrEqualTo(String value) {
            addCriterion("major_name <=", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameLike(String value) {
            addCriterion("major_name like", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameNotLike(String value) {
            addCriterion("major_name not like", value, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameIn(List<String> values) {
            addCriterion("major_name in", values, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameNotIn(List<String> values) {
            addCriterion("major_name not in", values, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameBetween(String value1, String value2) {
            addCriterion("major_name between", value1, value2, "majorName");
            return (Criteria) this;
        }

        public Criteria andMajorNameNotBetween(String value1, String value2) {
            addCriterion("major_name not between", value1, value2, "majorName");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyIsNull() {
            addCriterion("academy_key is null");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyIsNotNull() {
            addCriterion("academy_key is not null");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyEqualTo(String value) {
            addCriterion("academy_key =", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyNotEqualTo(String value) {
            addCriterion("academy_key <>", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyGreaterThan(String value) {
            addCriterion("academy_key >", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyGreaterThanOrEqualTo(String value) {
            addCriterion("academy_key >=", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyLessThan(String value) {
            addCriterion("academy_key <", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyLessThanOrEqualTo(String value) {
            addCriterion("academy_key <=", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyLike(String value) {
            addCriterion("academy_key like", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyNotLike(String value) {
            addCriterion("academy_key not like", value, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyIn(List<String> values) {
            addCriterion("academy_key in", values, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyNotIn(List<String> values) {
            addCriterion("academy_key not in", values, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyBetween(String value1, String value2) {
            addCriterion("academy_key between", value1, value2, "academyKey");
            return (Criteria) this;
        }

        public Criteria andAcademyKeyNotBetween(String value1, String value2) {
            addCriterion("academy_key not between", value1, value2, "academyKey");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNull() {
            addCriterion("create_date is null");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNotNull() {
            addCriterion("create_date is not null");
            return (Criteria) this;
        }

        public Criteria andCreateDateEqualTo(Date value) {
            addCriterion("create_date =", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotEqualTo(Date value) {
            addCriterion("create_date <>", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThan(Date value) {
            addCriterion("create_date >", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("create_date >=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThan(Date value) {
            addCriterion("create_date <", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThanOrEqualTo(Date value) {
            addCriterion("create_date <=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateIn(List<Date> values) {
            addCriterion("create_date in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotIn(List<Date> values) {
            addCriterion("create_date not in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateBetween(Date value1, Date value2) {
            addCriterion("create_date between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotBetween(Date value1, Date value2) {
            addCriterion("create_date not between", value1, value2, "createDate");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }

		public Criteria andListLikeTo(String majorName) {
			majorName=majorName==null?"":majorName;
			 addCriterion("major_name like '%"+majorName+"%'");
	         return (Criteria) this;
		}

		public Criteria andAListByAcadeyKeyLikeTo(String academyKey) {
			 addCriterion("t.academy_key='"+academyKey+"'");
	         return (Criteria) this;
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