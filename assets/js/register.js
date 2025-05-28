/* ====================== *
 * Toggle Between         *
 * Sign Up / Login        *
 * ====================== */
$(document).ready(function(){
    $('#goRight').on('click', function(){
        $('#slideBox').animate({
            'marginLeft' : '0'
        }, 500); // Added duration for smoother animation
        $('.topLayer').animate({
            'marginLeft' : '100%'
        }, 500); // Added duration
    });
    $('#goLeft').on('click', function(){
        if (window.innerWidth > 769){
            $('#slideBox').animate({
                'marginLeft' : '50%'
            }, 500); // Added duration
        }
        else {
            $('#slideBox').animate({
                'marginLeft' : '20%'
            }, 500); // Added duration
        }
        $('.topLayer').animate({
            'marginLeft': '0'
        }, 500); // Added duration
    });
});

/* ====================== *
 * Initiate Canvas        *
 * ====================== */
paper.install(window);
paper.setup(document.getElementById("canvas"));

// Paper JS Variables
var canvasWidth,
    canvasHeight,
    canvasMiddleX,
    canvasMiddleY;

var shapeGroup = new Group();
var positionArray = [];

function getCanvasBounds() {
    canvasWidth = view.size.width;
    canvasHeight = view.size.height;
    canvasMiddleX = canvasWidth / 2;
    canvasMiddleY = canvasHeight / 2;

    // Adjusted positions for ecological feel - more scattered, less geometric
    positionArray = [
        { x: canvasWidth * 0.15, y: canvasHeight * 0.2 },
        { x: canvasWidth * 0.4, y: canvasHeight * 0.1 },
        { x: canvasWidth * 0.7, y: canvasHeight * 0.15 },
        { x: canvasWidth * 0.9, y: canvasHeight * 0.4 },
        { x: canvasWidth * 0.8, y: canvasHeight * 0.7 },
        { x: canvasWidth * 0.5, y: canvasHeight * 0.9 },
        { x: canvasWidth * 0.2, y: canvasHeight * 0.8 },
        { x: canvasWidth * 0.05, y: canvasHeight * 0.5 }
    ];
};

/* ====================== *
 * Create Organic Shapes  *
 * ====================== */
function initializeShapes() {
    getCanvasBounds();

    // Redefine shape path data for more organic, leaf-like or fluid shapes
    // These are simplified for example; you might use more complex SVG paths.
    var organicShapePathData = [
        // Gentle wave/leaf shape 1
        'M 0 50 C 50 0, 100 0, 150 50 S 250 100, 300 50 L 250 20 L 150 70 L 50 20 Z',
        // Fluid blob 2
        'M 50 0 C 20 20, 20 80, 50 100 S 80 120, 100 80 C 120 60, 120 20, 100 0 Z',
        // Elongated leaf 3
        'M 0 50 C 20 10, 80 10, 100 50 C 80 90, 20 90, 0 50 Z',
        // Water drop / tear shape 4
        'M 50 0 C 20 20, 20 80, 50 100 C 80 80, 80 20, 50 0 Z',
        // Wavy line 5
        'M 0 20 C 50 0, 100 40, 150 20 S 250 0, 300 20', // This is a line, not a closed path
        // Leaf-like 6
        'M 10 50 C 30 10, 70 10, 90 50 C 70 90, 30 90, 10 50 Z',
        // Gentle curve 7
        'M 0 50 C 25 20, 75 80, 100 50', // Another line
        // Larger organic blob 8
        'M 100 0 C 50 20, 20 80, 50 150 C 80 180, 150 180, 200 150 C 230 120, 230 50, 200 0 Z'
    ];

    // Colors for the shapes (more natural tones, perhaps with transparency)
    var shapeColors = [
        'rgba(144, 202, 249, 0.4)', // Light blue (water)
        'rgba(76, 175, 80, 0.4)',  // Green (leaf)
        'rgba(255, 152, 0, 0.3)',  // Orange (earthy, subtle sun)
        'rgba(174, 213, 129, 0.5)',// Lighter green
        'rgba(100, 181, 246, 0.3)',// Medium blue
        'rgba(121, 85, 72, 0.2)',  // Brown (earth)
        'rgba(220, 231, 117, 0.4)',// Lime green
        'rgba(240, 98, 146, 0.2)'  // Pink (subtle flower/sunset) - less ecological, could be replaced
    ];


    for (var i = 0; i < organicShapePathData.length; i++) {
        var headerShape = new Path({
            strokeColor: shapeColors[i % shapeColors.length], // Cycle through colors
            strokeWidth: 2,
            fillColor: shapeColors[i % shapeColors.length].replace(/, 0\.\d+\)/, ', 0.15)'), // Lighter fill
            parent: shapeGroup,
            closed: true // Ensure shapes are closed for filling
        });

        // Some paths might be lines, some closed. Handle gracefully.
        if (organicShapePathData[i].startsWith('M') && organicShapePathData[i].includes('Z')) {
             headerShape.pathData = organicShapePathData[i];
             headerShape.closed = true;
        } else {
            // For lines, create a path without closing it if 'Z' is not present
            headerShape.pathData = organicShapePathData[i];
            headerShape.closed = false;
        }

        headerShape.scale(Math.random() * 0.8 + 0.5); // Random scale for variety
        headerShape.position = positionArray[i % positionArray.length]; // Cycle positions
        headerShape.pivot = headerShape.bounds.center; // Set pivot for rotation
        headerShape.rotationSpeed = (Math.random() - 0.5) * 0.2; // Random rotation speed and direction
        headerShape.floatingSpeedX = (Math.random() - 0.5) * 0.5; // Horizontal float speed
        headerShape.floatingSpeedY = (Math.random() - 0.5) * 0.5; // Vertical float speed
    }
};

initializeShapes();

/* ====================== *
 * Animation              *
 * ====================== */
view.onFrame = function paperOnFrame(event) {
    for (var i = 0; i < shapeGroup.children.length; i++) {
        var shape = shapeGroup.children[i];

        // Rotate
        shape.rotate(shape.rotationSpeed);

        // Gentle floating movement
        shape.position.x += shape.floatingSpeedX * Math.sin(event.time * 0.5 + i);
        shape.position.y += shape.floatingSpeedY * Math.cos(event.time * 0.5 + i);

        // Keep shapes within bounds (optional, or make them re-appear)
        if (shape.position.x < -shape.bounds.width / 2) shape.position.x = canvasWidth + shape.bounds.width / 2;
        if (shape.position.x > canvasWidth + shape.bounds.width / 2) shape.position.x = -shape.bounds.width / 2;
        if (shape.position.y < -shape.bounds.height / 2) shape.position.y = canvasHeight + shape.bounds.height / 2;
        if (shape.position.y > canvasHeight + shape.bounds.height / 2) shape.position.y = -shape.bounds.height / 2;
    }
};

view.onResize = function paperOnResize() {
    getCanvasBounds(); // Recalculate positions based on new size

    for (var i = 0; i < shapeGroup.children.length; i++) {
        var shape = shapeGroup.children[i];
        shape.position = positionArray[i % positionArray.length];
        // You might want to re-scale or re-position more intelligently here
        // depending on how dynamic you want the responsiveness to be.
        // For simplicity, we just reposition.
    }

    // Adjust visibility based on screen size (example from original)
    if (canvasWidth < 700) {
        shapeGroup.children.forEach((shape, index) => {
            if (index % 3 === 0) shape.opacity = 0; // Hide some shapes for less clutter
        });
    } else {
        shapeGroup.children.forEach(shape => shape.opacity = 1);
    }
};