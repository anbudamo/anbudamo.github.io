/* 
File: main.js
*/

/* Constructor function for TableCanvas object */
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

/* Function to draw table */
function drawTable() {
    var table = new TableCanvas(
        Number($("#inputRowMin").val()),
        Number($("#inputRowMax").val()),
        Number($("#inputColMin").val()),
        Number($("#inputColMax").val())
    );

    table.draw();
}

/* validation */
$.validator.addMethod("greaterThan", function (value, element, param) {
    if (!value || !$(param).val()) return true;
    return Number(value) > Number($(param).val());
}, "Maximum value must be larger than the minimum value.");

$("#multiplication-form").validate({
    rules: {
        colMin: {
            required: true,
            min: -50,
            max: 50
        },
        colMax: {
            required: true,
            min: -50,
            max: 50,
            greaterThan: "#inputColMin"
        },
        rowMin: {
            required: true,
            min: -50,
            max: 50
        },
        rowMax: {
            required: true,
            min: -50,
            max: 50,
            greaterThan: "#inputRowMin"
        }
    },

    messages: {
        colMin: {
            required: "Please specify a minimum column value.",
            min: "Column minimum cannot be less than -50.",
            max: "Column minimum cannot be greater than 50."
        },
        colMax: {
            required: "Please specify a maximum column value.",
            min: "Column maximum cannot be less than -50.",
            max: "Column maximum cannot be greater than 50.",
            greaterThan: "Maximum column must be strictly larger than the minimum column."
        },
        rowMin: {
            required: "Please specify a minimum row value.",
            min: "Row minimum cannot be less than -50.",
            max: "Row minimum cannot be greater than 50."
        },
        rowMax: {
            required: "Please specify a maximum row value.",
            min: "Row maximum cannot be less than -50.",
            max: "Row maximum cannot be greater than 50.",
            greaterThan: "Maximum row must be strictly larger than the minimum row."
        }
    },

    submitHandler: function (form) {
        drawTable();
        return false; // prevent page reload
    }
});



