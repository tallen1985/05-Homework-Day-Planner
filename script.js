let today = moment();
const currentHour = today.format('H');
let timeBlocks = [];
const storageKeyName = 'timeBlocks: ' + today.format('MM/DD/YYYY');

$('#currentDay').text(today.format("dddd, MMM Do"));

function initLocalStorage() {
    //creates string with localStorage key name (i.e. timeblocks: 10/06/2021)
    
    if (localStorage.getItem(storageKeyName)) {
        timeBlocks = JSON.parse(localStorage.getItem(storageKeyName));
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

function pastPresentOrFuture(hour) {
    if (hour > currentHour) {
        return 'future';
    } else if (hour == currentHour) {
        return 'present';
    } else {
        return 'past';
    }
}

function createBlock(block, index){
    let task = '';
    if (block.task) {
        task = block.task;
    }
    const textArea = $('<textarea class="description" data-index=' + index + '>' + task + '</textarea>')
    const container = $('.container');
    const newBlock = $('<div class="row"></div>')
    
    newBlock.append($('<div class="hour col-2">' + block.hourString + '</div>'));
    newBlock.style
    textArea.addClass(pastPresentOrFuture(block.hour) + ' col-8');

    newBlock.append($(textArea));
    newBlock.append($('<button class="saveBtn col-2"><i class="fas fa-save"></i></div>'));
    container.append(newBlock);
}

initLocalStorage();

for (let x = 0; x < timeBlocks.length; x++) {
    createBlock(timeBlocks[x], x);
}

$('.row').on('click', '.saveBtn', function(e){
    const task = $(e.target).parent().siblings().eq(1).val()
    let index = $(e.target).parent().siblings().eq(1).data().index;
    if (task.length > 0) {
        timeBlocks[index].task = task;
        console.log(timeBlocks);

        localStorage.setItem(storageKeyName, JSON.stringify(timeBlocks));
    }
});