SVG-Loading-Spinner
===================

The Spinner Library is a javascript library, well is more a component, that you can use in your web pages when you have loading times and you need to give some visual feedback to the user. It was developed in the scope of a <a href="https://centralway.com/en" target="_blank">Centralway</a> project.

Instructions to use:

1. Add the spinner folder to your project.

2. Add the <a href="http://docs.jquery.com/Downloading_jQuery" target="_blank">JQuery</a> and <a href="https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js" target="_blank">Raphael</a> Libraries to your project and link it in your web page.

3. Link the spinner css file in your web page

                                <link href="spinner/spinner.css" rel="stylesheet">

4. Link the spinner js file in your web page

                                <script src="spinner/spinner.js" type="text/javascript"></script>

5. Add the following code to your web page:

                                <div id="spinnerFullScreen">
                                    <div id="floater">
                                        <div id="spinner"></div>
                                    </div>
                                </div>

6. When you want to show the spinner just create the spinner object:

                                    var spinner = new Spinner(data);

    Note that you can change the aspect of the spinner passing some parameters on the data variable like:

                                var data = {};
                                data.centerRadius = 35;
                                data.sectorLength = 50;
                                data.sectorsCount = 10;
                                data.sectorWidth = 15;
                                data.color = 'red';
                                data.fullScreenOpacity = 0.8;

    and call the create method on the spinner object:
                                    spinner.create();


7. When you want to close the spinner destroy method on the object

                                spinner.destroy();