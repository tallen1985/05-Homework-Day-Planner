//Global Variables
let today = moment();
let currentHour = today.format('H');
let timeBlocks = {};
const storageKeyName = 'timeBlocks';

//Display today's date
$('#currentDay').text(today.format("dddd, MMM Do"));

//Check to see if existing localStorage exists, if it is from today, and if so load it.
//if not, clear it.
function initLocalStorage() {
    
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

//convert time to legible string (i.e. 9 => 9am or 14 => 2pm)
function hourString(hour) {
    if (hour < 12) {
        return hour + 'am';
    } else if (hour == 12) {
        return hour + 'pm';
    } else {
        return (hour - 12) + 'pm';
    }
}

//compare current time to timeblock and color accordingly
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

//dynamically create time blocks with information from localStorage (if available)
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

//call function to initiate localStorage
initLocalStorage();

for (let key in timeBlocks) {
    if (key != "currentDate") {
        createBlock(key) 
    }
    
}

//create click event to update localStorage with input into timeblock and change icon to a check mark.
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