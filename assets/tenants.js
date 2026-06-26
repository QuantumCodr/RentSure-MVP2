/* =====================
TENANT LIST PAGE
===================== */

function renderTenants() {

    const container =
        document.getElementById(
            "tenantList"
        );

    if (!container) return;

    const tenants =
        Storage.getTenants();

    container.innerHTML = "";

    tenants.forEach(t => {

        container.innerHTML += `

        <div class="entity-card">

            <strong>${t.id}</strong>

            <h3>${t.fullName}</h3>

            <p>
                📍 ${t.locations.join(", ")}
            </p>

            <p>
                🏠 ${t.propertyType}
            </p>

            <p>
                💰 Le ${Number(
                    t.budget
                ).toLocaleString()}
            </p>

            <div class="card-actions">

                <a href="
                    tenant-detail.html?id=${t.id}
                ">
                    <button>
                        View
                    </button>
                </a>

                <a href="
                    tenant-form.html?id=${t.id}
                ">
                    <button class="edit">
                        Edit
                    </button>
                </a>

                <button
                    class="delete"
                    onclick="
                    deleteTenant(
                        '${t.id}'
                    )">

                    Delete

                </button>

            </div>

        </div>
        `;
    });
}

function deleteTenant(id) {

    if (
        !confirm(
            "Delete tenant?"
        )
    ) return;

    Storage.deleteTenant(id);

    renderTenants();
}

/* =====================
TENANT FORM
===================== */

function initTenantForm() {

    const form =
        document.getElementById(
            "tenantForm"
        );

    if (!form) return;

    PROPERTY_TYPES.forEach(type => {

        document
            .getElementById(
                "propertyType"
            )
            .innerHTML += `
            <option>
                ${type}
            </option>
        `;
    });

    TENANT_STATUS.forEach(status => {

        document
            .getElementById(
                "status"
            )
            .innerHTML += `
            <option>
                ${status}
            </option>
        `;
    });

    LOCATIONS.forEach(location => {
        document.getElementById("locationsBox").innerHTML += `
            <div class="checkbox-item">
                <label>
                    <span class="checkbox-text">${location}</span>
                    <input type="checkbox" value="${location}" name="location">
                </label>
            </div>
        `;
    });

    FEATURES.forEach(feature => {
        document.getElementById("requirementsBox").innerHTML += `
            <div class="checkbox-item">
                <label>
                    <span class="checkbox-text">${feature}</span>
                    <input type="checkbox" value="${feature}" name="requirement" class="requirement-checkbox">
                </label>
            </div>
        `;
    });
    const checkAllBtn = document.getElementById("checkAllBtn");
    const uncheckAllBtn = document.getElementById("uncheckAllBtn");

    checkAllBtn.addEventListener("click", () => {
        document.querySelectorAll(".requirement-checkbox").forEach(cb => {
            cb.checked = true;
        });
    });

    uncheckAllBtn.addEventListener("click", () => {
        document.querySelectorAll(".requirement-checkbox").forEach(cb => {
            cb.checked = false;
        });
    });
    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        params.get("id");

    let editTenant = null;

    if (id) {

        editTenant =
            Storage
            .getTenants()
            .find(
                t =>
                t.id === id
            );

        if (editTenant) {

            document
                .getElementById(
                    "fullName"
                )
                .value =
                editTenant.fullName;

            document
                .getElementById(
                    "phone"
                )
                .value =
                editTenant.phone;

            document
                .getElementById(
                    "budget"
                )
                .value =
                editTenant.budget;

            document
                .getElementById(
                    "propertyType"
                )
                .value =
                editTenant.propertyType;

            document
                .getElementById(
                    "status"
                )
                .value =
                editTenant.status;

            document
                .getElementById(
                    "notes"
                )
                .value =
                editTenant.notes || "";

            document
                .querySelectorAll(
                    '[name="location"]'
                )
                .forEach(cb => {

                    cb.checked =
                    editTenant.locations
                    .includes(
                        cb.value
                    );
                });

            document
                .querySelectorAll(
                    '[name="requirement"]'
                )
                .forEach(cb => {

                    cb.checked =
                    editTenant.requirements
                    .includes(
                        cb.value
                    );
                });
        }
    }

    form.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const locations =
                Array.from(
                    document.querySelectorAll(
                        '[name="location"]:checked'
                    )
                )
                .map(
                    cb => cb.value
                );

            const requirements =
                Array.from(
                    document.querySelectorAll(
                        '[name="requirement"]:checked'
                    )
                )
                .map(
                    cb => cb.value
                );

            const tenant = {

                id:
                    editTenant
                    ? editTenant.id
                    : Ids.nextTenantId(),

                fullName:
                    document
                    .getElementById(
                        "fullName"
                    ).value,

                phone:
                    document
                    .getElementById(
                        "phone"
                    ).value,

                budget:
                    Number(
                        document
                        .getElementById(
                            "budget"
                        ).value
                    ),

                propertyType:
                    document
                    .getElementById(
                        "propertyType"
                    ).value,

                locations,

                requirements,

                status:
                    document
                    .getElementById(
                        "status"
                    ).value,

                notes:
                    document
                    .getElementById(
                        "notes"
                    ).value,

                createdAt:
                    editTenant
                    ? editTenant.createdAt
                    : new Date()
                    .toISOString()
            };

            if (editTenant) {

                Storage.updateTenant(
                    tenant
                );

            } else {

                Storage.addTenant(
                    tenant
                );
            }

            location.href =
                "tenants.html";
        }
    );
}

/* =====================
TENANT DETAIL
===================== */

function loadTenantDetail() {

    const box =
        document.getElementById(
            "tenantDetail"
        );

    if (!box) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        params.get("id");

    const tenant =
        Storage
        .getTenants()
        .find(
            t =>
            t.id === id
        );

    if (!tenant) return;

    box.innerHTML = `

        <h2>${tenant.id}</h2>

        <h3>
            ${tenant.fullName}
        </h3>

        <p>
            Status:
            ${tenant.status}
        </p>

        <p>
            Phone:
            ${tenant.phone}
        </p>

        <p>
            Budget:
            Le ${Number(
                tenant.budget
            ).toLocaleString()}
        </p>

        <p>
            Property Type:
            ${tenant.propertyType}
        </p>

        <p>
            Locations:
            ${tenant.locations.join(", ")}
        </p>

        <p>
            Requirements:
            ${tenant.requirements.join(", ")}
        </p>

        <p>
            Notes:
            ${tenant.notes || "-"}
        </p>

        <p>
            Created:
            ${Utils.formatDate(
                tenant.createdAt
            )}
        </p>
    `;

    document
        .getElementById(
            "editBtn"
        )
        .onclick = () => {

        location.href =
            `tenant-form.html?id=${tenant.id}`;
    };

    document
        .getElementById(
            "matchBtn"
        )
        .onclick = () => {

        findMatchesForTenant(
            tenant
        );
    };
}

function findMatchesForTenant(
    tenant
) {

    const results =
        document.getElementById(
            "matchResults"
        );

    const properties =
        Storage
        .getProperties();

    const matches =
        properties
        .map(property => ({
            property,
            score: Utils.calculateMatchScore(
                tenant,
                property
            )
        }))
        .filter(match => match.score > 0)
        .sort((a, b) => b.score - a.score);
   

    results.innerHTML =
        "<h3>Suggested Matches</h3>";

    matches.forEach(match => {
        let cls = "match-low";

        if (match.score >= 80) {
            cls = "match-good";
        }
        else if (match.score >= 50) {
            cls = "match-medium";
        } 
        results.innerHTML += `

        <div class="match-card ${cls}">

            <strong>
                ${match.score}% Match
            </strong>

            <p>${match.property.id}</p>

            <p>
                📍 ${match.property.location}
            </p>

            <p>
                🏠 ${match.property.propertyType}
            </p>

            <p>
                💰 Le ${Number(
                    match.property.rentPrice
                ).toLocaleString()}
            </p>

            <a href="
                property-detail.html?id=${match.property.id}
            ">
                <button class="primary">
                    Open Property
                </button>
            </a>

        </div>
        `;
    });
}

/* =====================
INIT
===================== */

renderTenants();
initTenantForm();
loadTenantDetail();