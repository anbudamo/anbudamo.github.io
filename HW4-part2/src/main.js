/* 
File: main.js
*/

// default JQuery UI component setup
$(function () {
    // setup inputs
    $('#inputColMin').on('change', function() { $("#sliderColMin").slider("value", $(this).val()) }).val('0')
    $('#inputColMax').on('change', function() { $("#sliderColMax").slider("value", $(this).val()) }).val('0')
    $('#inputRowMin').on('change', function() { $("#sliderRowMin").slider("value", $(this).val()) }).val('0')
    $('#inputRowMax').on('change', function() { $("#sliderRowMax").slider("value", $(this).val()) }).val('0')

    // setup sliders
    $("#sliderColMin").slider({min: -50, max: 50, value: 0, step: 1, slide: function(event, ui) { $('#inputColMin').val(ui.value); $("#multiplication-form").valid(); }})
    $("#sliderColMax").slider({min: -50, max: 50, value: 0, step: 1, slide: function(event, ui) { $('#inputColMax').val(ui.value); $("#multiplication-form").valid(); }})
    $("#sliderRowMin").slider({min: -50, max: 50, value: 0, step: 1, slide: function(event, ui) { $('#inputRowMin').val(ui.value); $("#multiplication-form").valid(); }})
    $("#sliderRowMax").slider({min: -50, max: 50, value: 0, step: 1, slide: function(event, ui) { $('#inputRowMax').val(ui.value); $("#multiplication-form").valid(); }})

    // tab creation
    let savedTabs = $('#tabs-container').tabs()
    let tabCounter = 2; 
    $('#save').prop('disabled', true).on("click", function() {
        let tabId = 'tab-' + (tabCounter++);
        let tabTitle = 'New tab'
        let $tabContent = $($('#multiplication-table-container').html());
        $tabContent.find('table').attr('id', 'table-' + tabId);
        $tabContent.find('table').addClass('table border table-bordered')
        let li = '<li><a href="#' + tabId + '">' + tabTitle + '</a><span class="ui-icon ui-icon-close" role="presentation"></span></li>'
        let div = "<div id='" + tabId + "'></div>" 

        savedTabs.find('ul').append(li)
        savedTabs.append($(div).append($("<div class='table-responsive'></div>").append($tabContent)));
        savedTabs.tabs("refresh")
    })

    // tab deletion
    savedTabs.on('click', 'span.ui-icon-close', function() {
        var panelId = $(this).data("panel");
        $("#" + panelId).remove();
        $(this).closest("li").remove();
        savedTabs.tabs("refresh");
    })

})


// Constructor function for TableCanvas object which provides a method to draw the table
function TableCanvas(rowMin, rowMax, colMin, colMax) {
    // Properties
    this.rowMin = rowMin
    this.rowMax = rowMax
    this.colMin = colMin
    this.colMax = colMax

    // Methods
    this.draw = function () {
        var table = document.getElementById("multiplication-table")
        // reset table
        table.innerHTML = ""

        // build header
        var thead = document.createElement("thead")
        table.appendChild(thead)

        var headerRow = document.createElement("tr")
        thead.appendChild(headerRow)


        var emptyTh = document.createElement("th")
        emptyTh.textContent = ' '
        headerRow.appendChild(emptyTh)
        for (let i = this.colMin; i < this.colMax + 1; i++) {
            var th = document.createElement("th")
            th.textContent = i.toString()
            headerRow.appendChild(th)
        }

        var tbody = document.createElement("tbody")
        table.appendChild(tbody)

        // build body
        for (let j = this.rowMin; j < this.rowMax + 1; j++) {
            var newRow = document.createElement("tr")
            tbody.appendChild(newRow)

            var rowHeader = document.createElement("th")
            rowHeader.setAttribute("scope", "row")
            rowHeader.textContent = j.toString()
            newRow.appendChild(rowHeader)

            for (let k = this.colMin; k < this.colMax + 1; k++) {
                var td = document.createElement("td")
                td.textContent = (j * k).toString()
                newRow.appendChild(td)
            }
        }
    }
}

// Function to draw table 
function drawTable() {
    var table = new TableCanvas(
        Number($("#inputRowMin").val()),
        Number($("#inputRowMax").val()),
        Number($("#inputColMin").val()),
        Number($("#inputColMax").val())
    );

    table.draw();
}


// validation using JQuery validate
$.validator.addMethod("greaterThan", function (value, element, param) { // adding a rule so that maximum value is larger than minimum value
    if (!value || !$(param).val()) return true;
    return Number(value) > Number($(param).val());
}, "Maximum value must be larger than the minimum value.");

$("#multiplication-form").validate({
    rules: {
        colMin: { required: true, min: -50, max: 50 },
        colMax: { required: true, min: -50, max: 50, greaterThan: "#inputColMin" },
        rowMin: { required: true, min: -50, max: 50 },
        rowMax: { required: true, min: -50, max: 50, greaterThan: "#inputRowMin" }
    },
    messages: {
        colMin: { required: "Specify minimum column.", min: "Bound -50 to 50.", max: "Bound -50 to 50." },
        colMax: { required: "Specify maximum column.", greaterThan: "Must be larger than min." },
        rowMin: { required: "Specify minimum row.", min: "Bound -50 to 50.", max: "Bound -50 to 50." },
        rowMax: { required: "Specify maximum row.", greaterThan: "Must be larger than min." }
    },
    // is triggered on every change in the form and draws table if validation passes
    showErrors: function() {
        this.defaultShowErrors();
        
        if (this.numberOfInvalids() === 0) {
            drawTable();
            $('#save').prop('disabled', false);
        } else {
            $('#save').prop('disabled', true); // Keep save button disabled if errors exist
        }
    }
});


