const settings = {
	async: true,
	crossDomain: true,
	url: 'https://montanaflynn-lorem-text-generator.p.rapidapi.com/word?count=5',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e385c2ac23msh9489538281dd455p1ea0d2jsnd60f1076361e',
		'X-RapidAPI-Host': 'montanaflynn-lorem-text-generator.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


$(document).ready(function() {
    function flashButton() {
        $('#start').fadeIn(500).fadeOut(500, flashButton);
    }
    flashButton();
});




