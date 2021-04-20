var pattern = [];
var u_pattern = [];
var level = 1;
var u_level = 0;

nextSequence = () => {
    var random = Math.floor(Math.random() * 4);
    switch (random) {
        case 0:
            random = "green";
            break;
        case 1:
            random = "red";
            break;
        case 2:
            random = "yellow";
            break;
        case 3:
            random = "blue";
            break;
    }

    $("#level-title").text(`Level ${level}`);
    pattern.push(random);
    console.log(pattern);
    var i = 0;
    displayPattern = () => {
        $(`#${pattern[i]}`).addClass("pressed");
        var aud = new Audio(`./sounds/${pattern[i]}.mp3`);
        aud.play();
        setTimeout(() => {
            $(`#${pattern[i++]}`).removeClass("pressed");
            if (i < level - 1) {
                setTimeout(() => {
                    displayPattern();
                }, 500);
            }
        }, 100);
    }
    displayPattern();
    level++;
    u_pattern = [];

}

patternCheck = (lvl, box) => {
    u_pattern.push(box);
    console.log(u_pattern);

    if (u_pattern[lvl] === pattern[lvl]) {
        u_level++;
        if (u_pattern.length === pattern.length) {
            setTimeout(() => {
                console.log("Check Passed Initiating next Seq.")
                u_level = 0;
                nextSequence();
            }, 1000);
        }
    }
    else {
        pattern = [];
        u_pattern = [];
        level = 1;
        $("body").addClass("game-over");
        $("#level-title").text("Game Over!")
        var gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 500);
        console.log("Game Over!");
    }
}

$(document).on("keypress", () => {
    if (level < 2) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
});

$(".btn").on("click", (event) => {
    var u_click = $(event.currentTarget).attr("id");
    $(`#${u_click}`).addClass("pressed");
    var u_aud = new Audio(`./sounds/${u_click}.mp3`)
    u_aud.play();
    setTimeout(() => {
        $(`#${u_click}`).removeClass("pressed");
    }, 100);
    patternCheck(u_level, u_click);
});