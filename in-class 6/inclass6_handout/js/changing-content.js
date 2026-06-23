$(function() {
    // select element containing content 'pine' and replace with 'almonds'
    $('li:contains("pine")').text('almonds')

    // add <em> tag to elements with class 'hot'
    $("li.hot").each(function (index, element) {
        let innerhtml = $(element).html()
        $(element).html('<em>' + innerhtml + '</em>')
    })

	// remove element with id 1
    $('#one').remove()
});