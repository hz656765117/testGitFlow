package com.hz.base.utils.common;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author yulewei on 2016/8/30
 */
public class BoxCollectionUtils {
	private static final Logger logger = LoggerFactory.getLogger(BoxCollectionUtils.class);

	/**
	 * 从bean对象List中筛选出某个属性的List
	 * 注1：读取的是属性值而非字段值
	 * 注2：类似的功能，也可以直接使用Apache Commons库，示例：
	 * CollectionUtils.collect(helloList, TransformerUtils.<Hello, Integer>invokerTransformer("getId"))
	 */
	public static <I, O> List<O> collect(Collection<I> inputCollection, String propertyName) {
		List<O> list = new ArrayList<O>();
		for (I item : inputCollection) {
			try {
				list.add((O) PropertyUtils.getProperty(item, propertyName));
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		return list;
	}

 

	/**
	 * 将List转为Map，键和值对应关系为，1对1
	 *
	 * @param inputCollection 来源集合
	 * @param keyPropertyName 要提取为Map中的Key值的属性名
	 */
	public static <K, O> Map<K, O> toMap(Collection<O> inputCollection, String keyPropertyName) {
		Map<K, O> map = new HashMap<K, O>();
		for (O item : inputCollection) {
			try {
				K keyValue = (K) PropertyUtils.getProperty(item, keyPropertyName);
				map.put(keyValue, item);
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		return map;
	}

	/**
	 * 将List转为Map，键和值对应关系为，1对1
	 *
	 * @param inputCollection   来源集合
	 * @param keyPropertyName   要提取为Map中的Key值的属性名
	 * @param valuePropertyName 要提取为Map中的Value值的属性名
	 */
	public static <K, O, V> Map<K, V> toMap(Collection<O> inputCollection, String keyPropertyName, String valuePropertyName) {
		Map<K, V> map = new HashMap<K, V>();
		for (O item : inputCollection) {
			try {
				K keyValue = (K) PropertyUtils.getProperty(item, keyPropertyName);
				V valueProperty = (V) PropertyUtils.getProperty(item, valuePropertyName);
				map.put(keyValue, valueProperty);
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		return map;
	}

	/**
	 * 将List转为Map，键和值对应关系为，1对N
	 */
	public static <K, O> Map<K, List<O>> groupToMap(Collection<O> inputCollection, String keyPropertyName) {
		Map<K, List<O>> map = new HashMap<K, List<O>>();
		for (O item : inputCollection) {
			try {
				K keyValue = (K) PropertyUtils.getProperty(item, keyPropertyName);
				List<O> list = map.get(keyValue);
				if (list == null) {
					list = new ArrayList<O>();
				}
				list.add(item);
				map.put(keyValue, list);
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		return map;
	}

	/**
	 * 内连接。不保留未匹配的元素
	 *
	 * @param leftList       左列表
	 * @param rightList      右列表
	 * @param leftProperty   左列表中的属性，用于和右列表关联
	 * @param rightProperty  右列表中的属性，用于和左列表关联
	 * @param targetProperty 在左列表中保存右列表中的属性
	 * @param <O1>
	 * @param <O2>
	 * @return
	 */
	public static <O1, O2> List<O1> innerJoin(List<O1> leftList, List<O2> rightList, String leftProperty, String rightProperty, String targetProperty) {
		List<O1> notMatchedList = new ArrayList<>();
		Map<Object, O2> rightMap = BoxCollectionUtils.toMap(rightList, rightProperty);
		for (O1 leftItem : leftList) {
			try {
				Object value = PropertyUtils.getProperty(leftItem, leftProperty);
				O2 rightItem = rightMap.get(value);
				if (rightItem != null) {
					PropertyUtils.setProperty(leftItem, targetProperty, rightItem);
				} else {
					notMatchedList.add(leftItem);
				}
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		leftList.removeAll(notMatchedList);
		return leftList;
	}

	/**
	 * 左外连接。左边列表保留未匹配的元素
	 *
	 * @param leftList       左列表
	 * @param rightList      右列表
	 * @param leftProperty   左列表中的属性，用于和右列表关联
	 * @param rightProperty  右列表中的属性，用于和左列表关联
	 * @param targetProperty 在左列表中保存右列表中的属性
	 * @param <O1>
	 * @param <O2>
	 * @return
	 */
	public static <O1, O2> List<O1> leftJoin(List<O1> leftList, List<O2> rightList, String leftProperty, String rightProperty, String targetProperty) {
		Map<Object, O2> rightMap = BoxCollectionUtils.toMap(rightList, rightProperty);
		for (O1 leftItem : leftList) {
			try {
				Object value = PropertyUtils.getProperty(leftItem, leftProperty);
				O2 rightItem = rightMap.get(value);
				PropertyUtils.setProperty(leftItem, targetProperty, rightItem);
			} catch (Exception e) {
				throw Exceptions.unchecked(e);
			}
		}
		return leftList;
	}

	/**
	 * 按键的子集，提取子列表
	 */
	public static <K, O> List<O> subList(Map<K, O> inputMap, Collection<K> keys) {
		List<O> list = new ArrayList<O>();
		for (K key : keys) {
			list.add(inputMap.get(key));
		}
		return list;
	}
}
