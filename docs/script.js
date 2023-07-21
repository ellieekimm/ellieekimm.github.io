var rightArr = [];

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
            const end = performance.now();
            const difference = end - startTimes[0];
            var speed = (currentIndex / (difference / 1000)).toFixed(0);
            var endingMessage = "Characters per Second: " + speed;
            $("#baconIpsumOutput").text(endingMessage);
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
                var audio = new Audio("sounds/wrong.mp3");
                audio.play();
                $("#baconIpsumOutput").text("Try Again with no mistakes next time!");
                $("#baconButton").text("Start!");
                $('#baconButton').css("background-color", "darkgreen");
                userInput = [];
            } else {
                $("#word-count").text("Character Count: " + (currentIndex + 1));
                currentIndex++;
            }
    }});
}

$("#baconButton").click(function() {
    $.getJSON('https://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'sentences':'1' }, function(baconGoodness) {
        if (baconGoodness && baconGoodness.length > 0) {
            $("#baconIpsumOutput").html('');
            for (var i = 0; i < baconGoodness.length; i++) {
                $("#baconIpsumOutput").append(baconGoodness[i]);
            }
            $("#baconIpsumOutput").show();

            var rightString = baconGoodness[0];
            rightArr = rightString.split("");
        }
    });
    userInput = [];
    typingTest();
});




