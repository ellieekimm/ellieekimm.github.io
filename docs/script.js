var rightArr = [];
var rightString = "";
var charWrong = 0;
function typingTest(){
    $("#baconButton").text("You got this!");
    $('#baconButton').css("background-color", "pink");
    var currentIndex = 0;
    var startTimes = [];
    console.log(userInput);
    
    $(document).off("keypress").on("keypress", function(event) {
        var start = performance.now();
        startTimes.push(start);
        var character = event.key;
        userInput.push(character);
        if (currentIndex === (rightArr.length - 1)) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            const end = performance.now();
            const difference = end - startTimes[0];
            var words = (currentIndex / 5).toFixed(0);
            var seconds = difference / 1000;
            var speed = (words / seconds) * 60;
            console.log(charWrong/currentIndex);
            console.log(charWrong);
            var accuracy = (1 - (charWrong / currentIndex)) * 100;
            var endingMessage = "<span class = 'finalmessage'>" + "Words per Minute: " + speed.toFixed(0) + "<br>Accuracy: " + accuracy.toFixed(0) + "%"+ "</span>";
            $("#baconIpsumOutput").html(endingMessage);
            $("html").addClass("congrats");
            setTimeout(function() {
                $("html").removeClass("congrats");
            }, 500);
            $("#baconButton").text("Start!");
            $('#baconButton').css("background-color", "darkgreen");
        } else {
            if (userInput[currentIndex] !== rightArr[currentIndex]) {
                $("html").addClass("game-over");
                setTimeout(function() {
                    $("html").removeClass("game-over");
                }, 1000);
                var audio = new Audio("../sounds/wrong.mp3");
                audio.play();
                charWrong++;
                $("#word-count").text("Character Count: " + (currentIndex + 1));
                $("#baconIpsumOutput").html(rightString.slice(0, currentIndex) + '<span id="incorrect">' + rightString[currentIndex] + '</span>' +
                rightString.slice(currentIndex + 1));
                currentIndex++;
            } else {
                $("#word-count").text("Character Count: " + (currentIndex + 1));
                $("#baconIpsumOutput").html(rightString.slice(0, currentIndex) + '<span class="correct">' + rightString[currentIndex] + '</span>' +
                rightString.slice(currentIndex + 1));
                currentIndex++;
            }
    }});
}

$("#baconButton").click(function() {
    $.getJSON('https://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'sentences':'1' }, function(baconGoodness) {
        if (baconGoodness && baconGoodness.length > 0) {
            $("#baconIpsumOutput").html(baconGoodness[0]);
            rightString = baconGoodness[0];
            rightArr = rightString.split("");
        }
    });
    userInput = [];
    typingTest();
});





