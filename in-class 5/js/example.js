// Get list element
var list = document.querySelector("ul")

// ADD NEW ITEM TO END OF LIST
// cream
let last = document.createElement("li")
last.textContent = "cream"
list.appendChild(last)

// ADD NEW ITEM START OF LIST
// kale
let first = document.createElement('li')
first.textContent = "kale"
list.firstChild.before(first)

// ADD A CLASS OF COOL TO ALL LIST ITEMS
let items = list.children
for (let i of items) {
    i.classList.add('cool')
}
// items.forEach(i => i.classList.add('cool'))

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
let count = list.children.length
let countElement = document.createElement('p')
countElement.textContent = count.toString() 
countElement.style.color = "white"
countElement.style.backgroundColor = "black"
countElement.style.width = "10px"
let header = document.querySelector('h2')
header.parentElement.style.alignItems = "center"
header.after(countElement)
