$(function() {
	$('ul').before($('p').text('Just Updated!'))
	$('.hot').prepend('+ ')
    newLi = $('<li>').html('<em>gluten-free</em> soy sauce')
    $('ul').append(newLi)
});