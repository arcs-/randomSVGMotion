/**
 *   randomSVGMotion  1.0
 *
 *   Math:   Ph. Gressly Freimann
 *   Plugin: P. Stillhart
 * 
 *   License: MIT (https://github.com/arcs-/randomSVGMotion#license)
 */
(function ($) {

    $.fn.randomSVGMotion = function (options) {

        options = $.extend({
            'points': ['cx', 'cy'],
            'start': [],
            'size': 100,
            'speed': 0.2,
            'additional': []

        }, options);

        var object = this;
        var staticX = (options.start.length == 0) ? object.attr(options.points[0]) * 1 : options.start[0];
        var staticY = (options.start.length == 0) ? object.attr(options.points[1]) * 1 : options.start[1];

        var pixelDistanzApprox = 0.1;
        var pixelDistanzEffektiv = options.speed;
        var p0x = 0;
        var p0y = 0;
        var p1x = 0;
        var p1y = 0;
        var p2x = 0;
        var p2y = 0;
        var p3x = staticX;
        var p3y = staticY;

        var g_tl; // tSteps für die aktuelle Kurve.
        var g_t = 1.1; // aktueller Zeitpunkt t zwischen 0 und 1 
        var l_px = -1; // last painted position
        var l_py = -1;

        berechneNeueZufallsKurvenTeile();
        looper();

        function berechneNeueZufallsKurvenTeile() {
            // Berechne zunächst die vier neuen Punkte (p3, p4, p5, p6). Neuer p3 ist vorest der alte p3.
            // Der neue Handler p1 (=p4) ist die Spiegelung von p2 an p3: 
            var p4x = p2x + 2 * (p3x - p2x);
            var p4y = p2y + 2 * (p3y - p2y);

            var p5x = Math.floor(staticX + Math.random() * options.size); // Math.random() * 200;
            var p5y = Math.floor(staticY + Math.random() * options.size);
            var p6x = Math.floor(staticX + Math.random() * options.size);
            var p6y = Math.floor(staticY + Math.random() * options.size);

            p0x = p3x;
            p0y = p3y;
            p1x = p4x;
            p1y = p4y;
            p2x = p5x;
            p2y = p5y;
            p3x = p6x; // Der neue p3 wird mit p6 überschrieben.
            p3y = p6y;
        }

        /**
         * approx the length of a bezier line in pixels.
         */
        function bezierLength(x0, y0, x1, y1, x2, y2, x3, y3) {
            var d = 0.1; // je kleiner desto genauer, aber auch umso langsamer.
            var l = 0;

            var s, Ax, Ay, Bx, By, dx, dy;
            var t = d;
            while (t < 1.0001) {
                Bx = bezier(x0, x1, x2, x3, t);
                By = bezier(y0, y1, y2, y3, t);
                s = t - d;
                Ax = bezier(x0, x1, x2, x3, s);
                Ay = bezier(y0, y1, y2, y3, s);
                dx = Ax - Bx;
                dy = Ay - By;
                l = l + Math.sqrt(dx * dx + dy * dy);
                t = t + d;
            }
            return l;
        }

        function looper() {
            requestAnimationFrame(looper);
            // Neue Kurve 'berechnen', wenn Ende der Kurve erreicht.
            if (g_t > 1.0) {
                berechneNeueZufallsKurvenTeile();
                g_tl = tSteps(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, pixelDistanzApprox);
                g_t = 0;
            }

            var px = bezier(p0x, p1x, p2x, p3x, g_t);
            var py = bezier(p0y, p1y, p2y, p3y, g_t);
            g_t = g_t + g_tl;

            // first time
            if (-1 == l_px) {
                // Nothing
            } else {
                while (abst(l_px, px, l_py, py) < pixelDistanzEffektiv) {
                    px = bezier(p0x, p1x, p2x, p3x, g_t);
                    py = bezier(p0y, p1y, p2y, p3y, g_t);
                    g_t = g_t + g_tl;

                }

                moveObject(px, py);
            }
            l_px = px;
            l_py = py;
        }

        /**
         * Berechne x(t) [oder y(t)], wenn die vier x-Koordinaten bekannt sind.
         * Ist t = 0, so wird einfach a0 zurückgegeben;
         * ist t = 1, so wird a3 zurückgegeben.
         * Liegt t zwischen 0 und 1, so wird der Bezier-Wert zurückgegeben.
         */
        function bezier(a0, a1, a2, a3, t) {
            var ti = 1 - t;
            var ti2 = ti * ti; // ti^2
            var t2 = t * t; // t^2

            return ti2 * ti * a0 + 3 * t * ti2 * a1 + 3 * t2 * ti * a2 + t2 * t * a3;
        }

        /**
         * Berechne, wie lange die t-Differenz sein muss, damit all
         * 'pixelDistanz' Pixel ein neuer Punkt gezeichnet wird.
         * Beispiel: die Pixeldistanz ist 5 (px).
         * Die Bezierkuve hat eine ungefähre Länge von 48px;
         * somit muss die Strecke 0..1 (für t) in Strecken von 5/48 (ca 0.104) geteilt werden.
         */
        function tSteps(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, pixelDistanz) {
            return pixelDistanz / bezierLength(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
        }

        /**
         * Abstand Rechnen nach Pythagoras
         */
        function abst(x1, x2, y1, y2) {
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * Finally move object
         */
        function moveObject(x, y) {
            $(object).attr(options.points[0], x + 0.5).attr(options.points[1], y + 0.5);

            var arrayLength = options.additional.length;
            for (var i = 0; i < arrayLength; i++) {
                $(options.additional[i][0]).attr(options.additional[i][1], x + 0.5).attr(options.additional[i][2], y + 0.5);
            }

        }


    }

})(jQuery);
