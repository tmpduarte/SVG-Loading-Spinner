/**
 * @Author: Tiago Duarte
 * @Date: 25-08-2012
 */
function Spinner(data) {
    this.R1 = data.R1 || 70;
    this.R2 = data.R2 || 120;
    this.sectorsCount = data.sectorsCount || 12;
    this.width = data.width || 25;
    this.color = data.color || 'white';

    this.sectors = [];
    this.opacity = [];

    //the raphael spinner object
    this.spinnerObject = null;

    //id of the timeout function for the rotating animation
    this.spinnerTick = null;
}

Spinner.prototype.create = function() {
    //shows the full screen spinner div
    $('#spinnerFullScreen').show();
    $('#spinnerFullScreen').animate({
        opacity: 0.8
    }, 1000, function() {
    });

    var r1 = Math.min(this.R1, this.R2) || 35;
    var r2 = Math.max(this.R1, this.R2) || 60;
    var cx = r2 + this.width, cy = r2 + this.width;
    var beta = 2 * Math.PI / this.sectorsCount;
    var pathParams = {stroke: this.color, "stroke-width": this.width, "stroke-linecap": "round"};

    this.spinnerObject = Raphael('spinner', r2 * 2 + this.width * 2, r2 * 2 + this.width * 2);

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

    //animation self-called function
    (function ticker(spinnerObject) {
        spinnerObject.opacity.unshift(spinnerObject.opacity.pop());

        for (var i = 0; i < spinnerObject.sectorsCount; i++) {
            spinnerObject.sectors[i].attr("opacity", spinnerObject.opacity[i]);
        }

        //safari browser helper
        spinnerObject.spinnerObject.safari();

        //doesn't work on IE passing parameter with the settimeout function :(
        spinnerObject.spinnerTick = setTimeout(ticker, 1000 / spinnerObject.sectorsCount, spinnerObject);

    })(this);
};

Spinner.prototype.destroy = function() {
    clearTimeout(this.spinnerTick);
    this.spinnerObject.remove();
    this.spinnerObject = null;

    //hides the full screen div
    $('#spinnerFullScreen').animate({
        opacity: 0
    }, 2000, function() {
        $('#spinnerFullScreen').hide();
    });
};