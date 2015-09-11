userSelectionApplier = '';

var ImportatntWordsProcessor = (function() {
	return {
		highlightImpWords : function() {
			rangy.init();
			classApplierModule = rangy.modules.ClassApplier || rangy.modules.CssClassApplier;
			if (rangy.supported && classApplierModule && classApplierModule.supported) {
				userSelectionApplier = rangy.createClassApplier("userSelection");
			}
			userSelectionApplier.toggleSelection();
			ImportantWordsProcessor.getImportantWords(userSelectionText);
		
		},
		getImportantWords : function(userText) {
			userTextObj = {};
			userTextObj.body = userText;
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "http://172.17.0.6:3000/findgems",
				data: JSON.stringify(userTextObj),
				dataType: "json",
				success: Hilighter.highlight
			});
var Hilighter = (function() {
	return {
		highlight : function(impWords) {
			var userSelection = $(".userSelection");
			var className = 'impword';
			jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
				return function(elem) {
					return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
				};
			});
			for ( var i = 0; i < impWords.length; i++) {
				$(".userSelection:Contains('"+impWords[i].name+"')").html(function(_,html) {
					var regex = new RegExp(impWords[i].name, "gi");
					var newNodeValue = (html || "").replace(regex,
						function(match) {
							return "<span class=\""+className
								+ "\" style=\"font-size:"+impWords[i].fontSize+"px !important\">" + match + "</span>";
						});
					return newNodeValue;
				});
			}
		}
	};
}());

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "highlightImpWords") {
		ImportantWordsProcessor.hilightImpWords();
	}
});
