package com.hz.base.utils.common;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

/**
 * 对apache commons的BeanUtils简单封装，仅仅将异常转换为不需要捕获<br>
 * 深拷贝，见：{@link org.apache.commons.lang3.SerializationUtils}
 *
 * @author yulewei on 2016/9/23
 */
public class BoxBeanUtils extends BeanUtils {

	/**
	 * 浅拷贝，创建相同类型bean后，执行 {@link PropertyUtils#copyProperties(java.lang.Object, java.lang.Object)}
	 */
	public static Object cloneBean(Object bean) {
		try {
			return BeanUtils.cloneBean(bean);
		} catch (Exception e) {
			throw Exceptions.unchecked(e);
		}
	}

	/**
	 * 浅拷贝，若bean当中的属性名称相同但类型不同，将会尝试属性的自动类型转换
	 */
	public static void copyProperties(Object dest, Object orig) {
		try {
			BeanUtils.copyProperties(dest, orig);
		} catch (Exception e) {
			throw Exceptions.unchecked(e);
		}
	}
}
