$(function(){
	var lHref = window.location.href;

	var type = '';
	if (lHref.indexOf('category.html?param=') > 0) {
		type = 'category';
	} else if (lHref.indexOf('tag.html?param=') > 0) {
		type = 'tag';
	}

	if (type != '') {
		var cIndex = lHref.indexOf('?param=');
		if (cIndex > 0) {
			var param = lHref.substring(cIndex + 7);
			showULContent(type, decodeURI(param));
		}
	}
});

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

			$('#article-span').append(param + '&nbsp;(' + cnt + ')');
			$('#article-ul').append(ul_content);
		}
	);
}