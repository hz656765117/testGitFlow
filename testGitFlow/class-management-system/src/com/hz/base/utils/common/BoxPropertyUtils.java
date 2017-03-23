package com.hz.base.utils.common;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

/**
 * 对apache commons的PropertyUtils简单封装，仅仅将异常转换为不需要捕获<br>
 * 深拷贝，见：{@link org.apache.commons.lang3.SerializationUtils}
 *
 * @author yulewei on 2016/9/23
 */
public class BoxPropertyUtils extends PropertyUtils {

	/**
	 * 浅拷贝，不会尝试属性的自动类型转换，速度快于 {@link BeanUtils#copyProperties(java.lang.Object, java.lang.Object)}
	 */
	public static void copyProperties(Object dest, Object orig) {
		try {
			PropertyUtils.copyProperties(dest, orig);
		} catch (Exception e) {
			throw Exceptions.unchecked(e);
		}
	}
}
