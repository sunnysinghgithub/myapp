<<<<<<< HEAD
var ImportantWordsHighlighter = (function() {
	_sendRequestToHighlightImportantWords = function() {
		var request = {
			method : "highlightImpWords"
		};
		_sendMessageToPage(request, function(){console.log('done')});
=======
var highlightImportantWords = (function() {
	_sendRequestToGetSelectedText = function() {
		var request = {
			method : "getSelectedText"
		};
		_sendMessageToPage(request, _processSelectedText);
>>>>>>> 14d6b9e7cd0b139b5c3db4a38b795bdebbefdb38
	};
	_sendMessageToPage = function(request, callback) {
		chrome.tabs.query({
			active : true,
			currentWindow : true
		}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, request, callback);
		});
<<<<<<< HEAD
	}
	return {
		highlightImportantWords : function() {
			_sendRequestToHighlightImportantWords();
		}
	};
});

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('highlightImportantWords').addEventListener(
		'click', ImportantWordsHighlighter.highlightImportantWords);
});
=======
	};
	_processSelectedText = function(response) {
		alert(response.selectedText);
		var _text = response.selectedText;
		var words = _text.split(' ');
		var request = {
			method : "importantWords",
			importantWords : words
		};
		_sendMessageToPage(request, null);
	};
	_highlightImportantWords = function() {

	};
	return {
		getSelectedTextFromBrowser : function(response) {
			return _sendRequestToGetSelectedText();
		}
	};
}());

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('highlightImportantWords').addEventListener(
			'click', highlightImportantWords.getSelectedTextFromBrowser);
});
>>>>>>> 14d6b9e7cd0b139b5c3db4a38b795bdebbefdb38
