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

    //number of sectors of the spinner - default = 12
    this.sectorsCount = data.sectorsCount || 12;

    //the distance from each sector to the center - default = 70
    this.centerRadius = data.centerRadius || 70;

    //the length/height of each sector - default = 120
    this.sectorLength = data.sectorLength || 120;

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

    //center point of the canvas/spinner/raphael object
    var spinnerCenter = this.centerRadius + this.sectorLength + this.sectorWidth;

    //angle difference/step between each sector
    var beta = 2 * Math.PI / this.sectorsCount;

    //params for each sector/path (stroke-color, stroke-width, stroke-linecap)
    var pathParams = {
        "stroke": this.color,
        "stroke-width": this.sectorWidth,
        "stroke-linecap": "round"
    };

    /**
     * creates the Raphael object with a width and a height equals to the double of the sum
     * on the element with id="spinner" that we can use to create and display svg elements
     *
     */
    var paperSize = 2 * spinnerCenter;
    this.spinnerObject = Raphael('spinner', paperSize, paperSize);

    //builds the sectors and the respective opacity
    for (var i = 0; i < this.sectorsCount; i++) {

        //angle of the current sector
        var alpha = beta * i;
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);

        //each sector
        this.opacity[i] = 1 / this.sectorsCount * i;

        /**
         * builds each sector, which in reality is a svg path
         * note that Upper case letter mean command is absolute, lower case—relative to the current position.
         * (http://www.w3.org/TR/SVG/paths.html#PathData)
         * we move the "cursor" to the center plus the difference to the center
         * and draws a line with length = sectorLength to the final point (which takes into account the current drawing angle)
         */
        this.sectors[i] = this.spinnerObject.path([
            ["M", spinnerCenter + this.centerRadius * cos, spinnerCenter + this.centerRadius * sin],
            ["l", this.sectorLength * cos, this.sectorLength * sin]
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
         * it's called in each second, the number of sectors the spinner has.
         * So the spinner gives a round each second, independently the numeber of sectors it has
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