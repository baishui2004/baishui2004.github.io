Source From: http://www.kafeitu.me/

	_includes/JB/*
	categories.html
	tags.html


历史问题：
1，404.html、about.html、project.html
        以上三个文件，是因为对应的md或textile文件在github服务器上调试不成功，而在本地生成到_site目录拷贝到根目录的文件。
       解决：2014-08-14 20:19:03
       修改对应的md或textile文件，是因为此三个文件的第一行应该是"---"，而之前错误的原因是"--- "，多了一个空格。
