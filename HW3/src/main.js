// create a table (5 by 5)
function TableCanvas(rowMin, rowMax, colMin, colMax) {
    this.rowMin = rowMin
    this.rowMax = rowMax
    this.colMin = colMin
    this.colMax = colMax
    this.draw = function () {
        var table = document.getElementById("matrix")
        // reset table
        table.innerHTML = ""

        var row = document.createElement("TR")
        table.appendChild(row)

        // draw header
        var emptyTh = document.createElement("TH")
        emptyTh.textContent = ' '
        row.appendChild(emptyTh)
        for (let i = this.colMin; i < this.colMax + 1; i++) {
            var th = document.createElement("TH")
            th.textContent = i.toString()
            row.appendChild(th)
        }

        // draw body
        for (let j = this.rowMin; j < this.rowMax + 1; j++) {
            var newRow = document.createElement("TR")
            table.appendChild(newRow)

            var rowHeader = document.createElement("TH")
            rowHeader.textContent = j.toString()
            newRow.appendChild(rowHeader)

            for (let k = this.colMin; k < this.colMax + 1; k++) {
                var td = document.createElement("TD")
                td.textContent = j.toString() * k.toString()
                newRow.appendChild(td)
            }
        }
    }
}

function drawTable() {
    var minRowsElement = document.getElementById("inputRowMin")
    var maxRowsElement = document.getElementById("inputRowMax")
    var minColsElement = document.getElementById("inputColMin")
    var maxColsElement = document.getElementById("inputColMax")

    var table = new TableCanvas(
        Number(minRowsElement.value), 
        Number(maxRowsElement.value), 
        Number(minColsElement.value), 
        Number(maxColsElement.value)
    )
    table.draw()
}

