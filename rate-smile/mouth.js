(function() {
    var path = document.querySelector('#mouth');
    var markValue = document.querySelector('.rate__mark__value');
    var max = 130;
    var min = -max;
    var increment = max * 2 / 50;
    var height = 0;
    var note = 2.5;
    var isDown = false;

    var rainbow = new Rainbow();
    rainbow.setSpectrum('#e74c3c', '#3498db', '#2ecc71');
    rainbow.setNumberRange(0, 5);

    function updateRating() {
        path.setAttribute('d', 'M 120 350 q 130 ' + height + ' 260 0');
        markValue.innerHTML = Math.abs(note).toFixed(1);
    }

    function startRating() {
        isDown = true;
    }

    function endRating() {
        isDown = false;
    }

    function rate(e) {
        if (isDown) {
            // Going down, smile, increase note
            if (e.movementY > 0 && height < max) {
                height += increment;
                note += 0.1;
            }
            // Going up, unsmile, decrease note
            else if (e.movementY < 0 && height > min) {
                height -= increment;
                note -= 0.1;
            }

            var color = rainbow.colourAt(note);

            Array.prototype.forEach.call(document.querySelectorAll('.stroke'), function(e) {
                e.style.stroke = color;
            });

            updateRating();

            lastTimeStamp = e.timeStamp;
        }
    }

    document.addEventListener('mousedown', startRating);
    document.addEventListener('touchstart', startRating);

    document.addEventListener('mouseup', endRating);
    document.addEventListener('touchend', endRating);

    document.addEventListener('mousemove', rate);
    document.addEventListener('touchmove', rate);

    updateRating();
})();