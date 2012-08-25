$(document).ready(function() {
    $('#createSpinner').click(unleashSpinner);
});


function unleashSpinner() {
    setTimeout(deleteSpinner, 3000);
    createSpinner("spinner", 70, 120, 12, 25, "white");
    return false;
}


