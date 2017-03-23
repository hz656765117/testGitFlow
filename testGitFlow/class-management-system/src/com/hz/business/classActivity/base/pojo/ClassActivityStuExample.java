package com.hz.business.classActivity.base.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ClassActivityStuExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ClassActivityStuExample() {
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

        public Criteria andActivityStuKeyIsNull() {
            addCriterion("activity_stu_key is null");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyIsNotNull() {
            addCriterion("activity_stu_key is not null");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyEqualTo(Integer value) {
            addCriterion("activity_stu_key =", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyNotEqualTo(Integer value) {
            addCriterion("activity_stu_key <>", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyGreaterThan(Integer value) {
            addCriterion("activity_stu_key >", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyGreaterThanOrEqualTo(Integer value) {
            addCriterion("activity_stu_key >=", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyLessThan(Integer value) {
            addCriterion("activity_stu_key <", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyLessThanOrEqualTo(Integer value) {
            addCriterion("activity_stu_key <=", value, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyIn(List<Integer> values) {
            addCriterion("activity_stu_key in", values, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyNotIn(List<Integer> values) {
            addCriterion("activity_stu_key not in", values, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyBetween(Integer value1, Integer value2) {
            addCriterion("activity_stu_key between", value1, value2, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityStuKeyNotBetween(Integer value1, Integer value2) {
            addCriterion("activity_stu_key not between", value1, value2, "activityStuKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyIsNull() {
            addCriterion("activity_key is null");
            return (Criteria) this;
        }

        public Criteria andActivityKeyIsNotNull() {
            addCriterion("activity_key is not null");
            return (Criteria) this;
        }

        public Criteria andActivityKeyEqualTo(String value) {
            addCriterion("activity_key =", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyNotEqualTo(String value) {
            addCriterion("activity_key <>", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyGreaterThan(String value) {
            addCriterion("activity_key >", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyGreaterThanOrEqualTo(String value) {
            addCriterion("activity_key >=", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyLessThan(String value) {
            addCriterion("activity_key <", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyLessThanOrEqualTo(String value) {
            addCriterion("activity_key <=", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyLike(String value) {
            addCriterion("activity_key like", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyNotLike(String value) {
            addCriterion("activity_key not like", value, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyIn(List<String> values) {
            addCriterion("activity_key in", values, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyNotIn(List<String> values) {
            addCriterion("activity_key not in", values, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyBetween(String value1, String value2) {
            addCriterion("activity_key between", value1, value2, "activityKey");
            return (Criteria) this;
        }

        public Criteria andActivityKeyNotBetween(String value1, String value2) {
            addCriterion("activity_key not between", value1, value2, "activityKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyIsNull() {
            addCriterion("student_key is null");
            return (Criteria) this;
        }

        public Criteria andStudentKeyIsNotNull() {
            addCriterion("student_key is not null");
            return (Criteria) this;
        }

        public Criteria andStudentKeyEqualTo(String value) {
            addCriterion("student_key =", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyNotEqualTo(String value) {
            addCriterion("student_key <>", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyGreaterThan(String value) {
            addCriterion("student_key >", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyGreaterThanOrEqualTo(String value) {
            addCriterion("student_key >=", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyLessThan(String value) {
            addCriterion("student_key <", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyLessThanOrEqualTo(String value) {
            addCriterion("student_key <=", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyLike(String value) {
            addCriterion("student_key like", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyNotLike(String value) {
            addCriterion("student_key not like", value, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyIn(List<String> values) {
            addCriterion("student_key in", values, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyNotIn(List<String> values) {
            addCriterion("student_key not in", values, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyBetween(String value1, String value2) {
            addCriterion("student_key between", value1, value2, "studentKey");
            return (Criteria) this;
        }

        public Criteria andStudentKeyNotBetween(String value1, String value2) {
            addCriterion("student_key not between", value1, value2, "studentKey");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIsNull() {
            addCriterion("delete_flag is null");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIsNotNull() {
            addCriterion("delete_flag is not null");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagEqualTo(Integer value) {
            addCriterion("delete_flag =", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotEqualTo(Integer value) {
            addCriterion("delete_flag <>", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagGreaterThan(Integer value) {
            addCriterion("delete_flag >", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagGreaterThanOrEqualTo(Integer value) {
            addCriterion("delete_flag >=", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagLessThan(Integer value) {
            addCriterion("delete_flag <", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagLessThanOrEqualTo(Integer value) {
            addCriterion("delete_flag <=", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIn(List<Integer> values) {
            addCriterion("delete_flag in", values, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotIn(List<Integer> values) {
            addCriterion("delete_flag not in", values, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagBetween(Integer value1, Integer value2) {
            addCriterion("delete_flag between", value1, value2, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotBetween(Integer value1, Integer value2) {
            addCriterion("delete_flag not between", value1, value2, "deleteFlag");
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