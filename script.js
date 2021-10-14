let today = moment();
let currentHour = today.format('H');
let timeBlocks = {};
const storageKeyName = 'timeBlocks';

$('#currentDay').text(today.format("dddd, MMM Do"));

function initLocalStorage() {
    //creates string with localStorage key name (i.e. timeblocks: 10/06/2021)
    
    if (localStorage.getItem(storageKeyName)) {
        timeBlocks = JSON.parse(localStorage.getItem(storageKeyName));
        if (timeBlocks.currentDate == today.format('MM/DD/YYYY')){
          return;  
        } else {
            localStorage.removeItem(storageKeyName)
        }
    }
    
    //populate timeblock array
    timeBlocks.currentDate = today.format('MM/DD/YYYY');
    for (let hour = 9; hour <= 17; hour++){
        timeBlocks[hour] = '';
        };
    
    localStorage.setItem(storageKeyName, JSON.stringify(timeBlocks));
}

function hourString(hour) {
    if (hour < 12) {
        return hour + 'am';
    } else if (hour == 12) {
        return hour + 'pm';
    } else {
        return (hour - 12) + 'pm';
    }
}

function pastPresentOrFuture(hour) {
    hour = Number(hour);
    currentHour = Number(currentHour);
    if (hour > currentHour) {
        return 'future';
    } else if (hour == currentHour) {
        return 'present';
    } else {
        return 'past';
    }
}

function createBlock(time){
    let task = '';
    if (timeBlocks[time]) {
        task = timeBlocks[time];
    }
    const textArea = $('<textarea class="description" data-key=' + time + '>' + task + '</textarea>')
    const container = $('.container');
    const newBlock = $('<div class="row"></div>')
    
    newBlock.append($('<div class="hour col-2">' + hourString(time) + '</div>'));
    textArea.addClass(pastPresentOrFuture(time) + ' col-8');

    newBlock.append($(textArea));
    newBlock.append($('<button class="saveBtn col-2"><i class="fas fa-save"></i></div>'));
    container.append(newBlock);
}

initLocalStorage();

for (let key in timeBlocks) {
    if (key != "currentDate") {
        createBlock(key) 
    }
    
}

$('.row').on('click', '.saveBtn', function(e){
    let task = '';
    let index = ''
    if (e.target.matches('i')){
       task = $(e.target).parent().siblings().eq(1).val().trim(); 
       index = $(e.target).parent().siblings().eq(1).data().key;
       if (task.length > 0) {
            timeBlocks[index] = task;
            localStorage.setItem(storageKeyName, JSON.stringify(timeBlocks));
            $(e.target).addClass("fa-check-circle").addClass('text-dark').removeClass('fa-save');
            $(e.target).parent().siblings().eq(1).addClass('text-dark')
        }
    } else {
        task = $(e.target).siblings().eq(1).val();
        index = $(e.target).siblings().eq(1).data().key;
        if (task.length > 0) {
            timeBlocks[index] = task;
            localStorage.setItem(storageKeyName, JSON.stringify(timeBlocks));
            $(e.target).children().addClass("fa-check-circle").addClass('text-dark').removeClass('fa-save');
            $(e.target).siblings().eq(1).addClass('text-dark')
        }
    }
    
    
    
});