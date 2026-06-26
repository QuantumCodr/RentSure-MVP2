document.addEventListener(
    "DOMContentLoaded",
    () => {

        const nav =
            document.createElement(
                "div"
            );

        nav.className =
            "navbar";

        nav.innerHTML = `
            <div>
                <strong>
                    RentSure MVP 2
                </strong>
            </div>

            <div class="nav-links">

                <a href="dashboard.html">
                    Dashboard
                </a>

                <a href="tenants.html">
                    Tenants
                </a>

                <a href="properties.html">
                    Properties
                </a>

                <a href="profile.html">
                    Profile
                </a>

            </div>
        `;

        document.body.prepend(
            nav
        );
    }
);