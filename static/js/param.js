$(function(){
	var lHref = window.location.href;
	showULContentByType(lHref);
});

function showULContentByType(lHref){
	var type = '';
	if (lHref.indexOf('category.html#param=') > 0) {
		type = 'category';
	} else if (lHref.indexOf('tag.html#param=') > 0) {
		type = 'tag';
	} else {
		return;
	}

	if (type != '') {
		if((type == 'category' && this.location.href.indexOf('category.html#param=') < 0) || type == 'tag' && this.location.href.indexOf('tag.html#param=') < 0) {
			location.href = lHref;
		} else {
			var cIndex = lHref.indexOf('#param=');
			if (cIndex > 0) {
				var param = lHref.substring(cIndex + 7);
				showULContent(type, decodeURI(param));
			}
		}
	}
}

function showULContent(type, param) {
	// $.ajax, 405 (Method Not Allowed)
	// but can use $.getJSON
	$.getJSON('articles.json',
		function(json) {
			var cnt = 0;
			var ul_content = '';

			if (type == 'category') {
				$.each(json, function(i, row){
					if(param.toLowerCase() == $.trim(row[type]).toLowerCase()) {
						cnt += 1;
						ul_content += '<li>' + row.date + ':&nbsp;&nbsp;<a href=' + row.url + '>' + row.title + '</a></li>';
					}
				});
			} else if (type == 'tag') {
				$.each(json, function(i, row){
					$.each(row[type + 's'], function(j, tag) {
						if(param.toLowerCase() == $.trim(tag).toLowerCase()) {
							cnt += 1;
							ul_content += '<li>' + row.date + ':&nbsp;&nbsp;<a href=' + row.url + '>' + row.title + '</a></li>';
						}
					});
				});
			}

			$('#article-span').html((type == 'category' ? '分类：' : '标签：') + param + '&nbsp;(' + cnt + ')');
			$('#article-ul').html(ul_content);
		}
	);
}