(function($, window) {

var BASEURL = [
	'https://realmofthemadgodhrd.appspot.com/',
	'https://rotmgtesting.appspot.com/'
][+!!window.testing]

var _cnt = 0;
function queue_request(obj) {
	var oc = obj.complete;
	obj.complete = function() {
		if (oc) oc.apply(this, arguments);
		_cnt = $(document).queue('ajax').length;
		update_counter();
		$(document).dequeue('ajax');
	}
	if (_cnt) {
		$(document).queue('ajax', function(){ $.ajax(obj) });
	} else {
		$.ajax(obj);
	}
	_cnt++;
	update_counter();
}

function update_counter() {
	$('#counter').text(_cnt).parent().toggle(!!_cnt);
}


function realmAPI(path, opts, callback) {
	opts.ignore = Math.floor(1e3 + 9e3 * Math.random())
	var url = BASEURL + path + '?' + $.param(opts)
	queue_request({
		dataType: 'jsonp',
		url: 'https://query.yahooapis.com/v1/public/yql',
		data: {
			q: 'select * from xml where url="' + url + '"',
			format: 'json'
		},
		complete: callback
	})
}

window.realmAPI = realmAPI

})($, window)

