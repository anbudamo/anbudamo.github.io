$(function() {
    let backgroundColor = $('ul li').first().css('background-color');
    $('ul').append($('<p>').text('Color was: ' + backgroundColor))

    $('ul li').css({
        'background-color': '#c5a996',
        'border': '1px solid white',
        'color': 'black',
        'text-shadow': 'none',
        'font-family': 'georgia'
    })
});