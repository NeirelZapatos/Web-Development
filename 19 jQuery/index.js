// checks if jQuery library is ready
// $(document).ready(function() {
//     $('h1').css("color", "red");
// });

// addes css classes to element 
$('h1').addClass('big-title big-margin');

// returns a boolean that checks if this class is on the element 
$('h1').hasClass('big-margin');


// changes the text of the element
$('h1').text("bye");

// changes the inner html of the element
$('button').html('<em>Dont click me</em>')

// changes the attribute the element
$('a').attr('href', "https://yahoo.com");

// an event listener that changes the color when clicked to a element
$('h1').click(function() {
    $('h1').css('color', 'purple');
});

// for all buttons creats an event listener 
$('button').click(function() {
    $('h1').css('color', 'green');
});

// for key presses
$('input').keydown(function(e) {
   console.log(e.key); 
   $('h1').text(e.key);
});

// on is more flexible 
$('h1').on("mouseover", function(e) {
    $('h1').css('color', 'red');
});

// adds an element before h1
$('h1').before('<button>New</button>');
// adds an element after h1
$('h1').after('<button>New</button>');
// adds an element after the opening tag
$('h1').prepend('<button>New</button>');
// adds an element before the closing tag
$('h1').append('<button>New</button>');

// removes the buttons in the webpage
// $('button').remove();

$('h1').show();
$('h1').hide();
$('h1').toggle();

$('h1').fadeIn();
$('h1').fadeOut();
$('h1').fadeToggle();

$('h1').slideDown();
$('h1').slideUp();
$('h1').slideToggle();

$('h1').animate({opacity: .5});
$('h1').animate({margin:  "20%"});

// chaining
$('h1').slideUp().slideDown();



