let today = moment();
let timeBlocks = [];
const storageKeyName = 'timeBlocks: ' + today.format('MM/DD/YYYY');

$('#currentDay').text(today.format("dddd, MMM Do"));

function initLocalStorage() {
    //creates string with localStorage key name (i.e. timeblocks: 10/06/2021)
    
    
    if (localStorage.getItem(storageKeyName)) {
        timeBlocks = JSON.parse(localStorage.getItem(storageKeyName));
        localStorage.clear();
        return;
    }
    
    //populate timeblock array
    for (let hour = 9; hour <= 17; hour++){
        timeBlocks.push({
            "hour": hour,
            'hourString': hourString(hour),
            "task": ""
        });
    }
    
    localStorage.setItem(storageKeyName, JSON.stringify(timeBlocks));
}

function hourString(hour) {
    if (hour < 12) {
        return hour + 'am';
    } else if (hour === 12) {
        return hour + 'pm';
    } else {
        return (hour - 12) + 'pm';
    }
}

function createBlock(block){
    const container = $('.container');
    const newBlock = $('<div class="row"></div>')
    newBlock.append($('<div class="hour">' + block.hourString + '</div>'));
    newBlock.append($('<div class="past">' + "Task" + '</div>'));
    newBlock.append($('<button class="saveBtn">' + 'X' + '</div>'));
    container.append(newBlock);
}

initLocalStorage();

for (let x = 0; x < timeBlocks.length; x++) {
    createBlock(timeBlocks[x]);
}