$(document).ready(function() {
    $('#createSpinner').click(unleashSpinner);
});


function unleashSpinner() {
    var data = {};
    data.centerRadius = 35;
    data.sectorLength = 50;
    data.sectorsCount = 10;
    data.sectorWidth = 15;
    data.color = 'white';

    var spinner = new Spinner(data);

    spinner.create();
    setTimeout(function(){spinner.destroy();}, 3000);

    return false;
}


