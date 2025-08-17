function showhidebuttons(currentScreen)
{      //Enable all  buttons for fresh check
         $('#btnNext').prop('disabled', false);
         $('#btnPrevious').prop('disabled', false);
         $('#btnSubmit').prop('disabled', true);
       
        //if its first screen       
        if(currentScreen.attr('prevscr')==""){        
        $('#btnPrevious').prop('disabled', true);
       } 

       //if its last screen 
        else if(currentScreen.attr('nextscr')==""){      
        $('#btnNext').prop('disabled', true);
        $('#btnSubmit').prop('disabled', false);

       } 

      
      
}
function showfirstscreen()
{      // Initial setup: Hide all screens except the first one
  $('[type="SCREEN"]').hide();
  // Show the first screen
  $('[type="SCREEN"]:first').show(); 
  //previous button is always dissabled for first screen
  $('#btnPrevious').prop('disabled', true);
    //Submit button is always dissabled except last screen
  $('#btnSubmit').prop('disabled', true);
} 

  
$(document).ready(function () {
         // Initial setup: Hide all screens except the first one
        showfirstscreen()

  // Button actions
  $('#btnNext').click(function () {
        event.preventDefault();
        console.log('Next clicked');
    var currentScreen = $('[type="SCREEN"]:visible');
    var nextScreenId = currentScreen.attr('nextscr');
    var currentScreenId = currentScreen.attr('id');

  //  currentScreen.hide();

 // currentScreen.addClass('hidden');
 $('[type="SCREEN"][id="' + currentScreenId + '"]').hide();
 //alert('1st hide 2nd show');
    if (nextScreenId) {
      var newcurrentScreen=$('[type="SCREEN"][id="' + nextScreenId + '"]');
      newcurrentScreen.show();
     //$('[type="SCREEN"][nextscr="' + nextScreenId + '"]').removeClass('hidden');
    }
    showhidebuttons(newcurrentScreen);
  });
  
  $('#btnPrevious').click(function () {
    event.preventDefault();
    var currentScreen = $('[type="SCREEN"]:visible');
    var prevScreenId = currentScreen.attr('prevscr');

    currentScreen.hide();

    if (prevScreenId) {
    var newcurrentScreen =$('[type="SCREEN"][id="' + prevScreenId + '"]');
    newcurrentScreen.show();
    }
    showhidebuttons(newcurrentScreen);
  });

  $('.btnSubmit button').click(function () {
    // Handle form submission here
    $('#businessForm').submit();
  });

  $('#btnRestart').click(function () {
        showfirstscreen()
  });
});