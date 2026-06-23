/* 
File: main.js
*/

// page setup
$(document).ready(function () {
    // set sliders
    $('.ui-slider').slider({
        max: 51,
        min: -51,
        value: 0
    })

    // set tabs
    $("#tabs").tabs()

    // setup validation
    $.validator.addMethod("bounds", function (value, element, params) {
        return Number(value) > Number(params.val())
    })
    $('form').validate({
        rules: {
            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                bounds: $('#minRow')
            },
            minCol: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                bounds: $('#minCol')
            }
        },
        messages: {
            minRow: {
                required: "Please enter a minimum value",
                number: "Please enter a valid integer",
                min: "Minimum value cannot be lower than -50",
                max: "Maximum value cannot be greater than 50",
                bounds: "Maximum value must be greater than minimum value"
            },
            maxRow: {
                required: "Please enter a minimum value",
                number: "Please enter a valid integer",
                min: "Minimum value cannot be lower than -50",
                max: "Maximum value cannot be greater than 50 or greater than minimum value",
                bounds: "Maximum value must be greater than minimum value"
            },
            minCol: {
                required: "Please enter a minimum value",
                number: "Please enter a valid integer",
                min: "Minimum value cannot be lower than -50",
                max: "Maximum value cannot be greater than 50 or greater than minimum value",
                bounds: "Maximum value must be greater than minimum value"
            },
            maxCol: {
                required: "Please enter a minimum value",
                number: "Please enter a valid integer",
                min: "Minimum value cannot be lower than -50",
                max: "Maximum value cannot be greater than 50 or greater than minimum value",
                bounds: "Maximum value must be greater than minimum value"
            }
        }
    })

})

$('.ui-slider').on("slide", function (event, ui) {
    let inputId = $(this).attr("for")
    $('#' + inputId).val($(this).slider("value"))
    if ($('form').valid()) {
        $('#save').prop("disabled", false)
        displayTable()
    }
    else {
        $('#save').prop("disabled", true)
        hideTable()
    }
})

$("#minRow").on("change", function () {
    $("#min-row-slider").slider("value", $(this).val())
    if ($('form').valid()) {
        $('#save').prop("disabled", false)
    }
    else {
        $('#save').prop("disabled", true)
    }
})
$("#maxRow").on("change", function () {
    $("#max-row-slider").slider("value", $(this).val())
    if ($('form').valid()) {
        $('#save').prop("disabled", false)
    }
    else {
        $('#save').prop("disabled", true)
    }
})
$("#minCol").on("change", function () {
    $("#min-col-slider").slider("value", $(this).val())
    if ($('form').valid()) {
        $('#save').prop("disabled", false)
    }
    else {
        $('#save').prop("disabled", true)
    }
})
$("#maxCol").on("change", function () {
    $("#max-col-slider").slider("value", $(this).val())
    if ($('form').valid()) {
        $('#save').prop("disabled", false)
    }
    else {
        $('#save').prop("disabled", true)
    }
})

$("#save").on("click", function () {
    let tabBar = $("#tabs")
    let tabCount = tabBar.tabs("instance").tabs.length.toString()

    let title = "tab-" + tabCount.toString()
    let content = $("<div>", {
        id: title
    }).append($("#table-container").clone())
    
    let link = $(("<a>"), {
        href: "#" + title
    }).text(title)
    let tab = $(("<li>"))
    tab.append(link)

    $("#tabs ul").append(tab)
    tabBar.append(content)

    tabBar.tabs("refresh")
    tabBar.tabs('option', 'active', tabCount)

    // <li><a href="#tab-1">tab-1</></li>
})

let displayTable = function () {
    let $table = $("#table")
    // let $thead = $("#table thead")
    let minRowNum = Number($("#minRow").val())
    let maxRowNum = Number($("#maxRow").val())
    let minColNum = Number($("#minCol").val())
    let maxColNum = Number($("#maxCol").val())

    // reset table
    $table.empty()
    // add header row
    $headerRow = $('<tr>').append($('<th>').text(' '))
    console.log(minColNum)
    console.log(maxColNum)
    for (let h = minColNum; h < maxColNum + 1; h++) {
        $headerRow.append($('<th>').text(h))
    }
    $table.append($headerRow)
    // add body rows

    for (let r = minRowNum; r < maxRowNum + 1; r++) {
        let $bodyRow = $('<tr>')
        $bodyRow.append($('<td>').text(r))
        for (let d = minColNum; d < maxColNum + 1; d++) {
            $bodyRow.append($('<td>').text(r * d))
        }
        $table.append($bodyRow)
    }
}

let hideTable = function () {
    let $table = $("#table")
    $table.empty()
}
