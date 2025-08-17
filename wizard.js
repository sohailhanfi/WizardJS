// When a navigation link is clicked, remove the "active" class from all links
$(".wrapper .navigation a").click(function(){
    $(".wrapper .navigation a").removeClass("active"); // Remove active class from all navigation links
});

// When step 1 is clicked, show step 2 and hide step 1
$(".step1").click(function(){
    $(".stepOne").removeClass("active"); // Remove active class from step 1
    $(".stepOne").removeClass("show"); // Hide step 1

    $(".stepTwo").addClass("active"); // Add active class to step 2
    $(".stepTwo").addClass("show"); // Show step 2
});

// When step 2 is clicked, show step 3 and hide step 2
$(".step2").click(function(){
    $(".stepTwo").removeClass("active"); // Remove active class from step 2
    $(".stepTwo").removeClass("show"); // Hide step 2

    $(".stepThree").addClass("active"); // Add active class to step 3
    $(".stepThree").addClass("show"); // Show step 3
});

// The code for step 3 to step 4 and step 4 to step 5 is commented out for now
// You can uncomment these parts when more steps are needed

// $(".step3").click(function(){
//     $(".stepThree").removeClass("active"); // Remove active class from step 3
//     $(".stepThree").removeClass("show"); // Hide step 3
//     $(".stepFour").addClass("active"); // Add active class to step 4
//     $(".stepFour").addClass("show"); // Show step 4
// });

// $(".step4").click(function(){
//     $(".stepFour").removeClass("active"); // Remove active class from step 4
//     $(".stepFour").removeClass("show"); // Hide step 4
//     $(".stepFive").addClass("active"); // Add active class to step 5
//     $(".stepFive").addClass("show"); // Show step 5
// });

// Reverse actions: go back to the previous step

// When reverse button for step 1 is clicked, go back to step 1 and hide step 2
$("#reverseOne").click(function(){
    $(".stepOne").addClass("active"); // Add active class to step 1
    $(".stepOne").addClass("show"); // Show step 1

    $(".stepTwo").removeClass("active"); // Remove active class from step 2
    $(".stepTwo").removeClass("show"); // Hide step 2
});

// Reverse button for step 1 using a class-based selector
$(".reverseOne").click(function(){
    $(".stepOne").addClass("active"); // Add active class to step 1
    $(".stepOne").
