$(document).ready(function() {
    $('#createSpinner').click(unleashSpinner);
});


function unleashSpinner() {
    var data = {};
    data.centerRadius = 35;
    data.sectorLength = 50;
    data.sectorsCount = 10;
    data.sectorWidth = 15;
    data.color = 'red';
    data.fullScreenOpacity = 0.8;

    var spinner = new Spinner(data);

    spinner.create();
    setTimeout(function(){spinner.destroy();}, 3000);

    return false;
}


