//============================================================================
// Name        : game.js
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This file contains javascript and jquery code to play the 
//               crystals collector game.
// Pseudocode  :
// 1. Declare the following variables:
//     1a var randomNum;
//     2b var imgRandomNumsArr
//     3c var totalScore
//     4d var wins
//     5e var losses
// 2. Get the random number between 19 and 120 for the game.
// 3. Get the random number between 1 and 12 and assign it to each crystal 
//    image.
// 4. Dislay the game random number.
// 5. Calculate the total score for each image the user clicks.
// 6. If the total score equals to the game random number, display "You win!".
// 7. If the the total score greater than the game random number, display 
//    "You lose!".
//============================================================================
$(document).ready(function()
{
    var randomNum;
    var imgRandomNumsArr = [];
    var MAX = 4;
    var totalScore = 0;
    var losses = 0;
    var wins = 0;
    var msg = null;
    var winFl = false;
    var loseFl = false;

    function getRandomNumber(min, max)
    {
        var retVal = 0;

        if (min < max)
        {
    	    retVal = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return retVal;
    }

    function generateImgRandomNumsArr(min, max)
    {
    	for (var i = 0; i < MAX; i++)
    	{
            imgRandomNumsArr[i] = getRandomNumber(min, max);
    	}
    }

    function setUp()
    {
        randomNum = getRandomNumber(19, 120);
        console.log("randomNum: ", randomNum);

        generateImgRandomNumsArr(1, 12);
        for (var i = 0; i < imgRandomNumsArr.length; i++)
        {
            console.log("imgRandomNumsArr[" + i + "]: ", imgRandomNumsArr[i]);
        }

        //add random number to each image button
        for (var i = 0; i < imgRandomNumsArr.length; i++)
        {
            var type = "#button-" + (i + 1);
            $(type).attr("value", imgRandomNumsArr[i]);
        }
    }

    function revealAndSetup()
    {
        var msg = "";

        //reveal the total score (0 initially) to total score box 
        $(".total-score-box-2").html(totalScore).css({"font-size": "20px", "padding-top": "5px", "padding-left": "2px"}); 
        
        //display "You win!" or "You lose!" message
        var p1 = $("<p>");
        if (winFl === true)
        {
            msg = "You win!";
            winFl = false;
        }
        else if (loseFl === true)
        {
            msg = "You lose!";
            loseFl = false;
        }
        else
        {
            msg = "";
        }
        p1.text(msg);
        $("#msg").html(p1).css({"font-size": "12px", "padding-top": "5px"});

        //display number of wins
        var p2 = $("<p>");
        var tmpStr = "Wins: " + wins;
        p2.text(tmpStr);
        $("#win").html(p2).css({"font-size": "12px", "padding-top": "5px"});

        //display number of losses
        var p3 = $("<p>");
        var tmpStr = "Losses: " + losses;
        p3.text(tmpStr);
        $("#lose").html(p3).css({"font-size": "12px", "padding-top": "5px"});
   
        //generate random numbers
        setUp();

        //reveal the game random number
	    $(".random-number-box").html(randomNum).css({"font-size": "20px", "padding-top": "5px", "padding-left": "2px"});
    }

    revealAndSetup();

    //Check if any button is clicked...
    $(document).on("click", "button", function() 
    {
    	var tmpTotalScore = parseInt($(this).attr("value"));
        totalScore += tmpTotalScore; 
        console.log("totalScore: ", totalScore);
        //reveal the total score to total score box
        $(".total-score-box-2").html(totalScore).css({"font-size": "20px", "padding-top": "5px", "padding-left": "2px"});
        if (totalScore > randomNum)
        {
            losses++;
            totalScore = 0;
            loseFl = true;
            revealAndSetup();
        }
        else if (totalScore === randomNum)
        {
            wins++;
            totalScore = 0;
            winFl = true;
            revealAndSetup();
        }
    });
});
