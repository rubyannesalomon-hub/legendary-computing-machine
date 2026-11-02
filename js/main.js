document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".links");
  var backdrop = document.querySelector(".nav-backdrop");
  var header = document.querySelector("header.site");

  function closeMenu() {
    if (!links) return;
    links.classList.remove("open");
    toggle && toggle.classList.remove("open");
    backdrop && backdrop.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    }
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!links) return;
    links.classList.add("open");
    toggle && toggle.classList.add("open");
    backdrop && backdrop.classList.add("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Menü schließen");
    }
    document.body.style.overflow = "hidden";
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    backdrop && backdrop.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    // Fenster wird breiter (Handy drehen, Tablet): Menü schließen und Scroll-Sperre lösen
    var desktop = window.matchMedia("(min-width: 721px)");
    var onChange = function (e) { if (e.matches) closeMenu(); };
    if (desktop.addEventListener) {
      desktop.addEventListener("change", onChange);
    } else if (desktop.addListener) {
      desktop.addListener(onChange); // ältere Safari-Versionen
    }
  }

  // Dezenter Schatten am Header, sobald gescrollt wird
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
