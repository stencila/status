function addUptimeLink() {
  var int = window.setInterval(function() {
    var header = document.querySelector(".header");
    if (header) {
      window.clearInterval(int);

      var liveStatus = document.createElement("div");
      liveStatus.className = "liveStatus";

      var link = document.createElement("a");
      link.innerText = "Uptime ↗";
      link.href = "http://stats.pingdom.com/sf0ku6beqv51";
      link.target = "_blank"

      liveStatus.appendChild(link);
      header.append(liveStatus);
    }
  }, 60);
}

addUptimeLink();
