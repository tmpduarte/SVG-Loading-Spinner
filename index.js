$(document).ready(function() {
    $('#createSpinner').click(unleashSpinner);
});


function unleashSpinner() {
    var data = {};
    data.R1 = 35;
    data.R2 = 60;
    data.sectorsCount = 12;
    data.sectorWidth = 15;
    data.color = 'white';

    var spinner = new Spinner(data);

    spinner.create();
    setTimeout(function(){spinner.destroy();}, 3000);

    return false;
}


