--- 
title:      浏览器调用本地程序
layout:     post
category:   技术
tags: 
 - Browser
 - Program call another
---

本文介绍Windows下浏览器调用本地程序的两种方式：
<pre>
1，修改注册表即URL Protocol Handler方式；
2，对于特定浏览器的特定调用方式；
</pre>
推荐使用第一种，理由是此种方式无关乎浏览器，所有浏览器都可以调用本地程序成功。
<br />
需要这样使用的场景这里并不做描述，需要注意的是这样使用是否有安全风险。
<br /><br />

###1，修改注册表即URL Protocol Handler方式###
仅需两个步骤。
<br />（1），添加调用程序的注册表，示例如下：
<pre>
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Call_Local_Program_Test]
@="URL:Call_Local_Program_Test Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\Call_Local_Program_Test\DefaultIcon]
@="D:\\Program\\test.exe"

[HKEY_CLASSES_ROOT\Call_Local_Program_Test\Shell]

[HKEY_CLASSES_ROOT\Call_Local_Program_Test\Shell\Open]

[HKEY_CLASSES_ROOT\Call_Local_Program_Test\Shell\Open\command]
@="D:\\Program\\test.exe"
</pre>
&emsp;&emsp;需要注意示例中的两个字符串，一是Call_Local_Program_Test，一是"D:\\Program\\test.exe"，后者表示的是调用的程序路径。
<br />&emsp;&emsp;将以上示例保存文文件：Call_Local_Program_Test.reg，保存后双击执行，注意对于安全软件的确认，需要允许执行以使可以正确写入注册表。
<br /><br />（2），在浏览器页面访问的调用方式如下：
<pre>
&lt;a href="Call_Local_Program_Test:"&gt;Call Program Test&lt;/a&gt;
</pre>
&emsp;&emsp;注意，访问页面需要是在应用服务器环境下。
<br /><br />

###2，对于特定浏览器的特定调用方式###
（1），IE下使用ActiveX方式调用
<pre>
function runExecutable() {
	var executableFullPath = 'notepad.exe';
	try {
		var shellActiveXObject = new ActiveXObject("WScript.Shell");
		if (!shellActiveXObject) {
			alert('Could not get reference to WScript.Shell');
			return;
		}
		shellActiveXObject.Run(executableFullPath, 1, false);
		shellActiveXObject = null;
	} catch (e) {
		alert('Error:\n' + e.message);
	}
}
</pre>
