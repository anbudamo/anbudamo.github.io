var today = new Date();
var hourNow = today.getHours();
var greeting;
greeting = 'Welcome!';

if (hourNow >= 0 && hourNow < 12) {
    greeting = 'Good Morning'
}
else if (hourNow >= 12 && hourNow < 18) {
    greeting = 'Good Afternoon'
}
else if (hourNow >= 18 && hourNow < 24) {
    greeting = 'Good Night'
}

document.querySelector('#greeting').textContent = greeting