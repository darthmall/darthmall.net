(function () {
  var MINUTES_PER_DAY = 24 * 60,
      RADIUS = [3, 8],
      TWO_PI = Math.PI * 2,
      HALF_PI = Math.PI / 2;

  function updateShadow() {
    var now = new Date(),
        hour = now.getHours(),
        min = now.getMinutes(),
        t = hour * 60 + min;

    var angle = (t / MINUTES_PER_DAY) * TWO_PI + HALF_PI;

    var r = RADIUS[0] + Math.abs(Math.cos(angle)) * (RADIUS[1] - RADIUS[0]);

    var x = r * Math.cos(angle),
        y = -r * Math.sin(angle);

    document.body.style.setProperty("--shadow-x", `${x}px`);
    document.body.style.setProperty("--shadow-y", `${y}px`);

    // Update the shadow offsets every 10 minutes.
    window.setTimeout(updateShadow, 10 * 60 * 1000);
  }

  window.addEventListener("load", updateShadow);
})();
