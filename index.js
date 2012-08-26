$(document).ready(function() {
    $('#createSpinner').click(unleashSpinner);
});


function unleashSpinner() {
    var data = {};
    data.R1 = 70;
    data.R2 = 120;
    data.sectorsCount = 12;
    data.width = 25;
    data.color = 'white';

    var spinner = new Spinner(data);

    spinner.create();
    setTimeout(function(){spinner.destroy();}, 3000);

    return false;
}


