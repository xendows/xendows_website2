/* =========================================================
   XENDOWS FRONT-END SECURITY
   ========================================================= */

(function () {

    "use strict";


    /* -----------------------------------------------------
       Disable right-click
       ----------------------------------------------------- */

    document.addEventListener("contextmenu", function (event) {

        event.preventDefault();

    });


    /* -----------------------------------------------------
       Disable common developer-tool shortcuts
       ----------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

        const key = event.key.toLowerCase();


        /* F12 */

        if (event.key === "F12") {

            event.preventDefault();

        }


        /* Ctrl + Shift + I */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "i"
        ) {

            event.preventDefault();

        }


        /* Ctrl + Shift + J */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "j"
        ) {

            event.preventDefault();

        }


        /* Ctrl + Shift + C */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "c"
        ) {

            event.preventDefault();

        }


        /* Ctrl + U */

        if (
            event.ctrlKey &&
            key === "u"
        ) {

            event.preventDefault();

        }

    });


    /* -----------------------------------------------------
       Disable text selection
       ----------------------------------------------------- */

    document.addEventListener(
        "selectstart",
        function (event) {

            event.preventDefault();

        }
    );


    /* -----------------------------------------------------
       Prevent dragging website images
       ----------------------------------------------------- */

    document.addEventListener(
        "dragstart",
        function (event) {

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {

                event.preventDefault();

            }

        }
    );


    /* -----------------------------------------------------
       Block javascript: links
       ----------------------------------------------------- */

    document.addEventListener("click", function (event) {

        const target = event.target.closest("a");


        if (!target) {

            return;

        }


        const href = target.getAttribute("href");


        if (!href) {

            return;

        }


        if (
            href.trim()
                .toLowerCase()
                .startsWith("javascript:")
        ) {

            event.preventDefault();

        }

    });


    /* -----------------------------------------------------
       Basic URL validation
       ----------------------------------------------------- */

    function isSafeURL(url) {

        try {

            const parsed = new URL(
                url,
                window.location.href
            );


            return (
                parsed.protocol === "http:" ||
                parsed.protocol === "https:"
            );

        } catch (error) {

            return false;

        }

    }


    /* -----------------------------------------------------
       Validate external links
       ----------------------------------------------------- */

    document.querySelectorAll("a").forEach(function (link) {

        const href = link.getAttribute("href");


        if (!href || href === "#") {

            return;

        }


        if (
            href.startsWith("http://") ||
            href.startsWith("https://")
        ) {

            if (!isSafeURL(href)) {

                link.removeAttribute("href");

            }

        }

    });


    /* -----------------------------------------------------
       Basic iframe protection
       ----------------------------------------------------- */

    if (window.top !== window.self) {

        try {

            window.top.location =
                window.self.location;

        } catch (error) {

            /* Ignore browser security restrictions */

        }

    }


    /* -----------------------------------------------------
       Detect obvious automated javascript injection
       attempts in URL parameters.
       ----------------------------------------------------- */

    const currentURL =
        window.location.href.toLowerCase();


    const dangerousPatterns = [

        "<script",

        "javascript:",

        "onerror=",

        "onload=",

        "onclick=",

        "onmouseover=",

        "eval(",

        "document.cookie",

        "document.write("

    ];


    for (
        let i = 0;
        i < dangerousPatterns.length;
        i++
    ) {

        if (
            currentURL.includes(
                dangerousPatterns[i]
            )
        ) {

            try {

                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname
                );

            } catch (error) {

                /* Ignore browser restrictions */

            }

            break;

        }

    }


})();