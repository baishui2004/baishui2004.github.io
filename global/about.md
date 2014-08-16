---
title:      关于我
layout:     default
permalink:  about.html
---

<span class="article-title">关于我</span>

<p />
<div class="article-content">
	邮箱：{{ site.author.email }}
	{% for link in site.links %}
	<br />{{ link.name }}：<a href="{{ link.url }}" target="_blank">{{ link.url }}</a>
	{% endfor %}
</div>
