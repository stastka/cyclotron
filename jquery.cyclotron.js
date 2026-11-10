(function ($) {
    $.fn.cyclotron = function (options) {
    var userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    var hintText;

    switch (userLang) {
        case 'en':
            hintText = '&#8592; Drag to explore panorama &#8594;';
            break;
        case 'cs':
            hintText = '&#8592; Tažením posouvejte panoráma &#8594;';
            break;
        case 'ja':
            hintText = '&#8592; ドラッグしてパノラマを移動 &#8594;';
            break;
        default:
            hintText = '&#8592; Panorama ziehen oder wischen &#8594;'; // Deutsch als Fallback
    }
    var hintHtml = '<div class="pantext" style="' +
        'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ' +
        'background: rgba(0, 0, 0, 0.65); color: #ffffff; padding: 12px 24px; ' +
        'border-radius: 30px; font-family: system-ui, -apple-system, sans-serif; ' +
        'font-size: 1.1em; font-weight: 500; letter-spacing: 0.5px; ' +
        'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); backdrop-filter: blur(4px); ' +
        'pointer-events: none; white-space: nowrap; user-select: none;">' + hintText + '</div>';

    $(this).css('position', 'relative').append(hintHtml);
        var settings = $.extend({
            dampingFactor: 0.93,
            historySize: 5
        }, options);
        return this.each(function () {
            var container, sx, dx = 0, armed, offset = 0, tick, prev, h = [];
            container = $(this);

            // Hilfsfunktion zum Auslesen der X-Koordinate für Maus und Touch
            function getPageX(e) {
                var oe = e.originalEvent || e;
                if (oe.touches && oe.touches.length > 0) {
                    return oe.touches[0].pageX;
                }
                if (oe.changedTouches && oe.changedTouches.length > 0) {
                    return oe.changedTouches[0].pageX;
                }
                return e.pageX;
            }

            // Start: mousedown & touchstart
            container.on('mousedown touchstart', function (e) {
                var px = getPageX(e);
                sx = px - offset;
                armed = true;
                e.preventDefault(); // Verhindert das Scrollen der Seite beim Wischen
            });
            // Bewegung: mousemove & touchmove
            container.on('mousemove touchmove', function (e) {
                var px;
                if (armed) {
                    px = getPageX(e);
                    if (prev === undefined) {
                        prev = px;
                    }
                    offset = px - sx;
                    if (h.length > settings.historySize) {
                        h.shift();
                    }
                    h.push(prev - px);

                    $(this).children(".pantext").fadeOut(800);

                    container.css('background-position', offset + 'px 0');

                    prev = px;
                }
            });

            // Ende: mouseleave, mouseup, touchend, touchcancel
            container.on('mouseleave mouseup touchend touchcancel', function () {
                if (armed) {
                    var i, len = h.length, v = h[len - 1];
                    for (i = 0; i < len; i++) {
                        v = (v * len + (h[i])) / (len + 1);
                    }
                    dx = v;
                }
                armed = false;
            });
            // Schwung-Effekt nach dem Loslassen
            tick = function () {
                if (!armed && dx) {
                    dx *= settings.dampingFactor;
                    offset -= dx;
                    container.css('background-position', offset + 'px 0');
                    if (Math.abs(dx) < 0.001) {
                        dx = 0;
                    }
                }
            };
            setInterval(tick, 16);
        });
    };
}(jQuery));
