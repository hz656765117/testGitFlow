package com.hz.base.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;

public class IoUtil {
	/**
	 * 写文件 
	 * @param path 文件路径
	 * @param buf  文件内容  字节数组
	 * @return
	 */
	public static boolean writeFileByBytes(String path , byte[] buf){
			FileOutputStream o = null;
	        BufferedOutputStream bos = null;
	        try {
	            o = new FileOutputStream(path);
	            bos = new BufferedOutputStream(o);
	            bos.write(buf);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return false;
	        } finally {
	            if(o != null) {
	                try {
	                    o.close();
	                } catch (IOException e) {
	                    e.printStackTrace();
	                }
	            }
	        } 
		return true;
	}
	/**
	 * 读取文件
	 * @param path
	 * @return
	 */
	public static byte[] readFile(String path){
		FileInputStream i = null;
		byte[] buf = null;
        try {
            i = new FileInputStream(path);
            buf = new byte[i.available()];
            i.read(buf);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(i != null) {
                try {
                    i.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
		return buf;
	}
	
	
	public static String fileUpload(  String path, InputStream is) {
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(path);
			IOUtils.copy(is, fos);
		}catch(Exception e) {
			System.out.println("文件上传通过文件复制的形式时异常："+e);
			return "";
		} finally {
			IOUtils.closeQuietly(fos);
		}
		return path;
	}
	
	
	/**
	 * 创建文件夹
	 * @param path
	 * @return
	 */
	public static boolean makeDirectory(String path){
		File file = new File(path);
		return (file.exists() && file.isDirectory()) ? true : file.mkdirs();
	}
}
