package com.hz.base.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public final class StringTokenAnaly
{
  public static List<String> getStringList(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(cur.trim());
    }
    return ret;
  }

  public static String[] getStringArray(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(cur.trim());
    }
    return (String[])ret.toArray(new String[0]);
  }

  public static List<Long> getLongList(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(Long.valueOf(Long.parseLong(cur.trim())));
    }
    return ret;
  }

  public static Long[] getLongArray(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(Long.valueOf(Long.parseLong(cur.trim())));
    }
    return (Long[])ret.toArray(new Long[0]);
  }

  public static List<Integer> getIntegerList(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(Integer.valueOf(Integer.parseInt(cur.trim())));
    }
    return ret;
  }

  public static Integer[] getIntegerArray(String src, String delimiter)
  {
    List ret = new ArrayList();
    StringTokenizer stz = new StringTokenizer(src, delimiter);
    while (stz.hasMoreTokens())
    {
      String cur = stz.nextToken();
      ret.add(Integer.valueOf(Integer.parseInt(cur.trim())));
    }
    return (Integer[])ret.toArray(new Integer[0]);
  }

  public static void main(String[] args)
  {
    System.out.println(getStringArray("2,3,4,5,6,7, ,", ","));
    System.out.println(StringUtil.split("2,3,4,5,6,7, ,", ","));
  }
}

