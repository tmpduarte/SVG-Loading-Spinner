/**
 * @Author: Tiago Duarte
 * @Date: 25-08-2012
 */

//loading variables
var spinnerTick, spinner, slideDuration = 1000;

/**************************************************/
/****************SPINNER FUNCTIONS*****************/
/**************************************************/

    //creates the loading
function createSpinner(holderid, R1, R2, sectorsCount, width, color) {
    //shows the full screen spinner div
    $('#spinnerFullScreen').show();
    $('#spinnerFullScreen').animate({
        opacity: 0.8
    }, slideDuration, function() {
    });

    var r1 = Math.min(R1, R2) || 35, r2 = Math.max(R1, R2) || 60, cx = r2 + width, cy = r2 + width, sectors = [], opacity = [], beta = 2 * Math.PI / sectorsCount, pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};

    spinner = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2);

    for (var i = 0; i < sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2, cos = Math.cos(alpha), sin = Math.sin(alpha);

        opacity[i] = 1 / sectorsCount * i;
        sectors[i] = spinner.path([
            ["M", cx + r1 * cos, cy + r1 * sin],
            ["L", cx + r2 * cos, cy + r2 * sin]
        ]).attr(pathParams);
    }

    (function ticker() {
        opacity.unshift(opacity.pop());

        for (var i = 0; i < sectorsCount; i++) {
            sectors[i].attr("opacity", opacity[i]);
        }

        //safari browser helper
        spinner.safari();
        spinnerTick = setTimeout(ticker, 1000 / sectorsCount);
    })();
}

//disables the ticker and removes the clock
function deleteSpinner() {
    clearTimeout(spinnerTick);
    spinner.remove();

    //hides the full screen div
    $('#spinnerFullScreen').animate({
        opacity: 0
    }, 2000, function() {
        $('#spinnerFullScreen').hide();

    });

}

