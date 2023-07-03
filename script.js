var started = false;

while (!started){
    function flashButton() {
        $('#baconButton').fadeIn(500).fadeOut(500, flashButton);
    }
    flashButton();
}
var userInput = [];
var currentIndex = 0;
var rightArr = [];

$("#baconButton").click(function() {
    $.getJSON('https://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'paras':'1' }, function(baconGoodness) {
        if (baconGoodness && baconGoodness.length > 0) {
            $("#baconIpsumOutput").html('');
            for (var i = 0; i < baconGoodness.length; i++) {
                $("#baconIpsumOutput").append('<p>' + baconGoodness[i] + '</p>');
            }
            $("#baconIpsumOutput").show();

            var rightString = baconGoodness[0];
            rightArr = rightString.split("");
        }
    });
});

$(document).keypress(function(event) {
    started = true;
    var character = event.key;
    userInput.push(character);
    if (currentIndex === rightArr.length) {
        $("html").addClass("congrats");
        setTimeout(function() {
            $("html").removeClass("congrats");
        }, 500);
    } else {
        if (userInput[currentIndex] !== rightArr[currentIndex]) {
            $("html").addClass("game-over");
            setTimeout(function() {
                $("html").removeClass("game-over");
            }, 1000);
            userInput = [];
            currentIndex = 0;
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
        } else {
            $("#word-count").text("Character Count: " + (currentIndex + 1));
            currentIndex++;
        }
    }
});
