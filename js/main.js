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
    toggle && toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!links) return;
    links.classList.add("open");
    toggle && toggle.classList.add("open");
    backdrop && backdrop.classList.add("open");
    toggle && toggle.setAttribute("aria-expanded", "true");
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
      if (e.key === "Escape") closeMenu();
    });
  }

  // Subtle shadow on the sticky header once the page scrolls
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
