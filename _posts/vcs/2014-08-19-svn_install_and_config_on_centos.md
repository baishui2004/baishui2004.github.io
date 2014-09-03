--- 
title:      CentOS下安装SVN服务
layout:     post
category:   版本控制
tags: 
 - SVN
 - Linux
 - CentOS
---

共有6个步骤：
<pre>
第一步：安装SVN
第二步：开放CentOS 3690端口
第三步：创建资源库
第四步：配置资源库访问权限
第五步：启动SVN服务
第六步：访问SVN服务
</pre>
<!-- more -->

###第一步：安装SVN###
安装说明：[http://subversion.apache.org/packages.html](http://subversion.apache.org/packages.html)
<br />由于是给CentOS系统安装，根据官方说明，使用命令方式安装，安装命令如下：
<pre>
yum install subversion
</pre>
等候其安装成功。
<br /><br />

###第二步：开放CentOS 3690端口###
SVN服务使用3690端口，而CentOS的3690端口默认并不允许外部访问，开放端口命令如下：
<br />
<pre>
iptables -I INPUT -p tcp --dport 3690 -j ACCEPT  #开放3690端口
/etc/rc.d/init.d/iptables save                   #保存配置
/etc/init.d/iptables status  　                  #查看状态
</pre>
<br />

###第三步：创建资源库###
1，创建一个目录作为资源库的根目录：
<pre>
mkdir /opt/svn
</pre>
2，创建资源库，此命令创建一个test资源库：
<pre>
svnadmin create /opt/svn/test
</pre>
执行此命令，会在test目录下自动创建多个文件或文件夹，如下：
<pre>
文件夹：conf, db, hooks, locks
文件：format, README.txt
</pre>
<br />

###第四步：配置资源库访问权限###
1，配置涉及conf文件夹下的以下三个文件：
<pre>
passwd, authz, svnserve.conf
</pre>
2，配置passwd，特别注意是配置在配置项[users]下，其下紧跟的行有无#注释无所谓，等号左侧是用户名，右侧是密码，等号两边的空格有或者没有都没关系：
<pre>
[users]
harry = harryssecret
sally = sallyssecret
test = testsecret
guest = guest
</pre>
3，配置authz，配置用户组以及资源库目录权限，配置项[groups]表示用户组，左侧组名，右侧用户，多个用户以半角逗号分割；[/]配置根目录的访问权限，r表示read，w表示write，@组名表示组授权，用户授权则没有@：
<pre>
[groups]
admin = harry
user = sally,test

[/]
@admin = rw
@user = rw
guest = r
</pre>
4，配置svnserve.conf，anon-access配置none表示无权限用户不能访问，auth-access配置write表示认证用户有写权限，password-db配置passwd密码验证文件，authz-db配置authz认证文件，realm配置认证命名空间（此配置项非必须）：
<pre>
[general]
anon-access = none
auth-access = write
password-db = passwd
authz-db = authz
realm = /opt/svn/test
</pre>
5，特别说明，这三个配置文件，无论是配置项还是注释，都不能出现中文，否则会导致权限配置异常。
<br /><br />

###第五步：启动SVN服务###
如下启动的是SVN资源吗根目录，这样根目录下有多个资源库，便可同时启动多个资源库服务：
<pre>
svnserve -d -r /opt/svn
</pre>
将SVN服务配置为CentOS的自启动项：
<pre>
将命令：svnserve -d -r /opt/svn 放在文件 /etc/rc.d/rc.local最后一行
</pre>
也可以单独启动资源库服务：
<pre>
svnserve -d -r /opt/svn/test
</pre>
关闭服务命令：
<pre>
killall svnserve
</pre>
顺便附上Window下关闭SVN服务命令：
<pre>
net stop svn
</pre>
<br />

###第六步：访问SVN服务###
访问路径：
<pre>
svn://svn server ip/test
</pre>