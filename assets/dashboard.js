function renderStats() {

    const tenants =
        Storage.getTenants();

    const properties =
        Storage.getProperties();

    document.getElementById(
        "tenantCount"
    ).textContent =
        tenants.length;

    document.getElementById(
        "propertyCount"
    ).textContent =
        properties.length;

    document.getElementById(
        "matchCount"
    ).textContent =
        tenants.length *
        properties.length;
}

function renderSummary() {

    const tenants =
        Storage.getTenants().length;

    const properties =
        Storage.getProperties().length;

    const box =
        document.getElementById(
            "systemSummary"
        );

    box.innerHTML = `

        <div class="activity-item">

            ${tenants}
            tenants registered

        </div>

        <div class="activity-item">

            ${properties}
            properties listed

        </div>

    `;
}

function renderRecentTenants() {

    const tenants =
        Storage.getTenants()
        .slice()
        .reverse()
        .slice(0, 5);

    const box =
        document.getElementById(
            "recentTenants"
        );

    box.innerHTML = "";

    tenants.forEach(t => {

        box.innerHTML += `

            <div class="activity-item">

                <a href="
                    tenant-detail.html?id=${t.id}
                ">

                    <strong>
                        ${t.id}
                    </strong>

                    -
                    ${t.fullName}

                </a>

            </div>

        `;
    });
}

function renderRecentProperties() {

    const properties =
        Storage.getProperties()
        .slice()
        .reverse()
        .slice(0, 5);

    const box =
        document.getElementById(
            "recentProperties"
        );

    box.innerHTML = "";

    properties.forEach(p => {

        box.innerHTML += `

            <div class="activity-item">

                <a href="
                    property-detail.html?id=${p.id}
                ">

                    <strong>
                        ${p.id}
                    </strong>

                    -
                    ${p.propertyType}

                </a>

            </div>

        `;
    });
}

function renderActivity() {

    const box =
        document.getElementById(
            "activityList"
        );

    const activities = [];

    Storage.getTenants()
        .slice(-3)
        .forEach(t => {

            activities.push(
                `🧑 Tenant ${t.id} added`
            );
        });

    Storage.getProperties()
        .slice(-3)
        .forEach(p => {

            activities.push(
                `🏠 Property ${p.id} added`
            );
        });

    activities.reverse();
    box.innerHTML = "";
    activities.forEach(item => {
        box.innerHTML += `
            <div class="activity-item">
                ${item}
            </div>
        `;
    });
}

function initImport() {
    const input =
        document.getElementById(
            "backupFile"
        );
    if (!input) return;

    input.addEventListener(
        "change",
        e => {
            const file =
                e.target.files[0];
            if (!file) return;
            Backup.import(file);
        }
    );
}
(async () => {
    await BackupDB.init();
    renderStats();
    renderSummary();
    renderRecentTenants();
    renderRecentProperties();
    renderActivity();
    initImport();
})();
