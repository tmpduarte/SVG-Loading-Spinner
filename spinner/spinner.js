/**
 * @Author: Tiago Duarte
 * @Date: 25-08-2012
 */

/**
 * creates the object Spinner with data values or default values in the case they are missing
 * @param data
 * @constructor
 */
function Spinner(data) {
    this.R1 = data.R1 || 70;
    this.R2 = data.R2 || 120;

    //number of sectors of the spinner - default = 12
    this.sectorsCount = data.sectorsCount || 12;

    //the width of each sector of the spinner - default = 25
    this.sectorWidth = data.sectorWidth || 25;

    //color of the spinner - default = white
    this.color = data.color || 'white';

    //array of spinner sectors, each spinner is a svg path
    this.sectors = [];

    //array with the opacity of each sector
    this.opacity = [];

    //the raphael spinner object
    this.spinnerObject = null;

    //id of the timeout function for the rotating animation
    this.spinnerTick = null;
}

/**
 * creates the Raphael spinner object and make the animation
 */
Spinner.prototype.create = function() {
    //shows the full screen spinner div
    $('#spinnerFullScreen').show();

    //animates the opacity of the full screen div containing the spinner from 0 to 0.8
    $('#spinnerFullScreen').animate({
        opacity: 0.8
    }, 1000, function() {
    });

    //var r1 = Math.min(this.R1, this.R2) || 35;
    //var r2 = Math.max(this.R1, this.R2) || 60;

    var r1 = 25;
    var r2 = 60;

    var cx = r2 + this.sectorWidth;
    var cy = r2 + this.sectorWidth;

    //angle difference/step between each sector
    var beta = 2 * Math.PI / this.sectorsCount;

    //params for each sector/path (stroke-color, stroke-width, stroke-linecap)
    var pathParams = {
        "stroke": this.color,
        "stroke-width": this.sectorWidth,
        "stroke-linecap": "round"
    };

    /**
     * creates the Raphael object with a width and a height equals to
     * on the element with id="spinner" that we can use to create and display svg elements
     *
     */
    var paperSize = r2 * 2 + this.sectorWidth * 2;
    this.spinnerObject = Raphael('spinner', paperSize, paperSize);

    for (var i = 0; i < this.sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2;
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);

        this.opacity[i] = 1 / this.sectorsCount * i;
        this.sectors[i] = this.spinnerObject.path([
            ["M", cx + r1 * cos, cy + r1 * sin],
            ["L", cx + r2 * cos, cy + r2 * sin]
        ]).attr(pathParams);
    }

    /**
     * does an animation step and calls itself again
     * @param spinnerObject this param needs to be passed because of scope changes when called through setTimeout function
     */
    (function animationStep(spinnerObject) {

        //shifts to the right the opacity of the sectors
        spinnerObject.opacity.unshift(spinnerObject.opacity.pop());

        //updates the opacity of the sectors
        for (var i = 0; i < spinnerObject.sectorsCount; i++) {
            spinnerObject.sectors[i].attr("opacity", spinnerObject.opacity[i]);
        }

        /**
         * safari browser helper
         * There is an inconvenient rendering bug in Safari (WebKit):
         * sometimes the rendering should be forced. This method should help with dealing with this bug.
         * source: http://raphaeljs.com/reference.html#Paper.safari
         */
        spinnerObject.spinnerObject.safari();

        /**
         * calls the animation step again
         * note: doesn't work on IE passing parameter with the settimeout function :(
         */
        spinnerObject.spinnerTick = setTimeout(animationStep, 1000 / spinnerObject.sectorsCount, spinnerObject);

    })(this);
};

/**
 * destroys the spinner and hides the full screen div
 */
Spinner.prototype.destroy = function() {
    //stops the animation function
    clearTimeout(this.spinnerTick);

    //removes the Raphael spinner object
    this.spinnerObject.remove();
    this.spinnerObject = null;

    //animates the opacity of the div to 0 again and hides it (display:none) in the end
    $('#spinnerFullScreen').animate({
        opacity: 0
    }, 2000, function() {
        $('#spinnerFullScreen').hide();
    });
};