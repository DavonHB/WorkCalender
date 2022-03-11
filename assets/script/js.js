var planner = [];

//sets up planner with tasks stored in local storage
function setUpPlanner() {
    planner = JSON.parse(localStorage.getItem("planner")) || [];

    for (let i = 0; i < planner.length; i++) {
        let hour = planner[i].hour;
        let task = planner[i].task;
        $(`#${hour}`).val(task);
    }
    console.log(localStorage)
};

//sets up time dependent elements using moment.js
//sets up color coding
function setUpTimedElements() {
    updateDate();
    renderTextarea();
};

//calls textarea and determines background color using current time by updating its class
function renderTextarea() {
    let currentHour = parseInt(moment().format("H"));
    $("textarea.form-control").each(function (i) {
        let id = parseInt($(this).attr("id"));
        if (id < currentHour) {
            $(this).css("background-color", "rgb(208, 208, 225)");
        } else if ( id === currentHour) {
            $(this).css("background-color", "rgb(225, 204, 204)");
        } else {
            $(this).css("background-color", "rgb(204, 255, 204)");
        }
    });
};

//updates dates el with current time 
function updateDate() {
    $("#date").text(moment().format("dddd, MMMM Do - h:mm:ss a"));
};

//saves tasks upon clicking save
$("button.btn").on("click", function () {
    //looks for id and hour and input of element
    let id = parseInt($(this).data("hour"));
    let input = $(`#${id}`).val();

    //assume task is new
    let newTask = true
    for (var i = 0; i < planner.length; i++) {
        //if id is found in planner task needs to be updated
        if(planner[i].hour === id) {
            newTask = false;
            planner[i].task = input;
        }
    }

    //if it is a new task update on planer
    if (newTask) {
        addTask(id, input);
    }

    //update planner item in local storage 
    localStorage.setItem("planner", JSON.stringify(planner));
});

//add a task consisting of an hour and an input 
function addTask(hr, input) {
    let task = {
        hour: hr,
        task: input
    }
    planner.push(task);
};

//sets up document
$(document).ready(function() {
    setUpPlanner();
    setUpTimedElements();
    //check time sensitive elements using intervals 
    setInterval(updateDate, 1000);
    setInterval(renderTextarea, 60 * 1000);
});