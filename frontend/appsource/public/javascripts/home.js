var lookup = {};

var Home = (function() {
	_toggleUserSelection = function() {
		showeverything = $('#checkbox-usersel').bootstrapSwitch('state');
		if(showeverything){
			$('#gems .not-gem').show();
		}else {
			$('#gems .not-gem').hide();
		}
	},
	_getTagreplacementText = function(tag,text) {
		min = 15;
		max = 30;
		arr = Object.keys(lookup).map(function (key) { return lookup[key];});
		curr_min = Math.min.apply( null, arr );
		curr_max = Math.max.apply( null, arr );
		fontSize = ((lookup[text.toLowerCase()]/curr_max) * (max - min)) + min;
		replacementText = '<'+ tag + 'style=\"font-size:'+fontSize+'px\"">'+text+'</'+tag+'>';
		return replacementText;
	}
	return {
		onload : function() {
			$('#form-main').submit(Home.findgems);
			$.fn.wrapInTag = function(opts) {
				var tag = opts.tag || 'strong'
				, words = opts.words || []
				, regex = RegExp(words.join('|'), 'gi') // case insensitive
				, replacement = '<'+tag+'>$&</'+tag+'>';
				return this.html(function() {
					return $(this).text().replace(regex, function(text) {return _getTagreplacementText(tag,text);});
				});
			};
		},
		findgems : function(e) {
			e.preventDefault();
			// Get the userText
			userText = {};
			userText.body = $('#usertext').val();
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "/findgems",
				data: JSON.stringify(userText),
				dataType: "json",
				success: Home.rendergems
			});
		},
		rendergems : function(response) {
			gems = response;
			lookup = {};
			for(i=0;i<gems.length;i++){
				lookup[gems[i].name]=gems[i].weight;
			}
			userText = $('#usertext').val();
			$('#form-main').hide("slow");
			$('#userselection').show("slow");
			$('#gems').show("slow");
			$('#gems').append(userText);
			$('#gems').wrapInTag({
				tag: 'gem class=\"gem\"',
				words: Object.keys(lookup)
			});
			$('#gems').contents()
				.filter(function(){return this.nodeType === 3})
				.wrap('<span class="not-gem" />');
			$('#checkbox-usersel').bootstrapSwitch({onText: "All", offText: "Gems", offColor: "success", labelText: "Showing", state: "false", onSwitchChange: _toggleUserSelection });
		}
	};
})();

$(document).ready(Home.onload);
