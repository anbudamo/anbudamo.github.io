/* 
File: main.js
*/

// Constructor function for TableCanvas object
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
    // input validation
    var minRowsElement = document.getElementById("inputRowMin")
    var maxRowsElement = document.getElementById("inputRowMax")
    var minColsElement = document.getElementById("inputColMin")
    var maxColsElement = document.getElementById("inputColMax")

    if (minRowsElement.value == "" || maxRowsElement.value == "" || 
        minColsElement.value == "" || maxColsElement.value == ""
    ) {
        var formErrorLabel = document.getElementById("formError")
        formErrorLabel.textContent = "Please specify ALL minimum and maximum values..."
        return
    }

    if (Number(minRowsElement.value) < -50 || Number(minRowsElement.value) > 50
        || Number(maxRowsElement.value) < -50 || Number(maxRowsElement.value) > 50
        || Number(minColsElement.value) < -50 || Number(minColsElement.value) > 50 
        || Number(maxColsElement.value) < -50 || Number(maxColsElement.value) > 50
    ) {
        var formErrorLabel = document.getElementById("formError")
        formErrorLabel.textContent = "Please enter valid minimum and maximum values between -50 and 50"
        return
    }

    if (minRowsElement.value >= maxRowsElement.value
        || minColsElement.value >= maxColsElement.value
    ) {
        var formErrorLabel = document.getElementById("formError")
        formErrorLabel.textContent = "Please enter minimum values that are smaller than the maximum values"
        return
    }

    // validation passed so draw table
    var formErrorLabel = document.getElementById("formError")
    formErrorLabel.textContent = ""
    
    var table = new TableCanvas(
        Number(minRowsElement.value), 
        Number(maxRowsElement.value), 
        Number(minColsElement.value), 
        Number(maxColsElement.value)
    )
    table.draw()
}

