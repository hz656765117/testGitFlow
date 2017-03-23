package com.hz.base.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Hashtable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

/**
 * 
 * @ClassName: QRUtil
 * @Description: 二维码处理类
 * @author 作者 E-mail <a href="mailto:szg@51box.cn">石志刚</a>
 * @version 创建时间：2014年8月22日上午10:57:58
 */
public class QRUtil {
	private static Log log = LogFactory.getLog(QRUtil.class);
	public static InputStream genQrCode(String data, int width, int height) {
		InputStream is=null;
		ByteArrayOutputStream out=null;
		try {
			out = new ByteArrayOutputStream();
			Hashtable<EncodeHintType, Object> hints = new Hashtable<EncodeHintType, Object>();
			hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
			hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
			BitMatrix bitMatrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, width, height, hints);
			MatrixToImageWriter.writeToStream(bitMatrix, "png", out);
			is=new ByteArrayInputStream(out.toByteArray());
			return is;
		} catch (Exception e) {
			log.error("生成二维码失败", e);
			return null;
		}finally{
			try {
				is.close();
				out.close();
			} catch (IOException e) {
				log.error("流关闭异常", e);
			}
		}
	}
}
