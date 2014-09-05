--- 
title:      静态页面动态效果实现
layout:     post
category:   网站搭建
tags: 
 - Html
 - BuildWebsite
---

本文描述如何在Github pages静态页面环境下实现动态的效果。
<br/><br/>

首先说明使用URL访问一个页面的三种方式：
<pre>
http://thebestofyouth.com/category.html
http://thebestofyouth.com/category.html?param=测试
http://thebestofyouth.com/category.html#param=测试
</pre>
第二个URL表示给页面传一个参数，参数名：param，参数值：测试
<br />
第三个URL表示定位到页面的锚点位置，关于锚点：<a href="http://magicalboy.com/html-named-anchors/">创建HTML锚点</a>、<a href="http://www.w3school.com.cn/html/html_links.asp">W3Cschool：HTML链接</a>
<br /><br />

动态页面一般是与后台进行交互的页面，比如jsp、asp、php，即想要实现动态效果，需要后台的支持。
<br />
而对于Github pages页面，其是静态页面，如果想要实现动态效果这怎么办呢？
<br /><br />

###1，使用第二种URL访问方式：?param=测试###
使用JS解析参数的办法如下：
<pre>
var pageHref = window.location.href;
var pIndex = pageHref.indexOf('?param=');
var param = pageHref.substring(pIndex + 7);
</pre>
刷新当前页面的代码：
<pre>
location.href = window.location.href;
</pre>
需要修改参数或值，则修改问号后面的参数及值即可。
<br /><br />
经实践测试，这种方式在Chrome、FireFox下使用正常。
<br />
但是在IE下实现不了预期的动态效果，提示：We didn't receive a proper request from your browser.
<br /><br />

###2，使用第三种URL访问方式：#param=测试###
这种是锚点方式，如何解析参数呢，依然是使用JS解析参数：
<pre>
var pageHref = window.location.href;
var pIndex = pageHref.indexOf('?param=');
var param = pageHref.substring(pIndex + 7);
</pre>
那刷新当前页面是是不是如上面的方式一样呢：
<pre>
location.href = window.location.href;
</pre>
答案是否，带锚点的URL使用如上方式刷新不了页面，且会出现异常效果，可参考：<a href="http://www.dingcankong.com/location-href%E8%B7%B3%E8%BD%AC%E5%BD%93%E5%89%8D%E9%A1%B5%E9%9D%A2%E5%8A%A0%E9%94%9A%E7%82%B9%E7%9A%84%E9%97%AE%E9%A2%98/">location.href跳转当前页面锚点的问题</a>。出现了这样的问题如何解决呢，答案很简单，即在当前页面不使用刷新本页面的方式，而是采用主动方法调用实现动态效果，如下：
<pre>
function parseParse(lHref) {
  var pIndex = lHref.indexOf('?param=');
  var param = lHref.substring(pIndex + 7);
}
</pre>
本博客使用此种方式实现的分类、标签动态加载代码：<a href="/static/js/param.js">param.js</a>，效果可点击本博客右侧文章分类或文章标签进行查看。
<br /><br />

<b>特别提示：</b>
<br />&emsp;&emsp;
Github pages环境下不可以使用jQuery的ajax函数，但可以使用getJSON函数，使用上面的方式并结合getJSON函数可以实现丰富的动态效果。
