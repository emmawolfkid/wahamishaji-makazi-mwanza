(function () {
    var whatsappNumber = "255679779669";
    var mobileMenuButton = document.getElementById("mobileMenuButton");
    var mobileMenu = document.getElementById("mobileMenu");
    var form = document.getElementById("fomuYaBooking");
    var submitButton = document.getElementById("kitufeChaTuma");
    var statusText = document.getElementById("formStatus");

    function buildWhatsAppUrl(formData) {
        var ujumbe = [
            "MAOMBI MAPYA YA UHAMISHAJI",
            "",
            "Mteja: " + formData.get("jina"),
            "Simu: " + formData.get("simu"),
            "Anatoka: " + formData.get("kutoka"),
            "Anakwenda: " + formData.get("kwenda"),
            "Ukubwa wa Mzigo: " + formData.get("ukubwa"),
            "",
            "Ujumbe kutoka kwenye Website ya Wahamishaji Makazi Mwanza."
        ].join("\n");

        return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(ujumbe);
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function () {
            var isOpen = !mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden", isOpen);
            mobileMenuButton.classList.toggle("is-open", !isOpen);
            mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.classList.add("hidden");
                mobileMenuButton.classList.remove("is-open");
                mobileMenuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var formData = new FormData(form);
            var whatsappUrl = buildWhatsAppUrl(formData);

            if (submitButton) {
                submitButton.textContent = "Inatuma... Tafadhali Subiri";
                submitButton.disabled = true;
            }

            if (statusText) {
                statusText.textContent = "Tunatunza taarifa zako kisha tunakufungulia WhatsApp.";
            }

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .catch(function () {
                    return true;
                })
                .finally(function () {
                    if (statusText) {
                        statusText.textContent = "Asante. WhatsApp inafunguka sasa.";
                    }
                    window.location.href = whatsappUrl;
                });
        });
    }

    var revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }
})();
