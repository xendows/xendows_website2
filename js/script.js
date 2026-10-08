/* =========================================================
   XENDOWS MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");

    const navLinks = document.getElementById("navLinks");


    if (!hamburger || !navLinks) {

        return;

    }


    hamburger.addEventListener("click", function () {

        navLinks.classList.toggle("active");


        const isOpen =
            navLinks.classList.contains("active");


        hamburger.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close mobile menu after selecting a link */

    const links = navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close menu if screen becomes desktop size */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 760) {

            navLinks.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});