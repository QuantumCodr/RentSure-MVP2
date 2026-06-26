/* =====================
PROPERTY LIST
===================== */

function renderProperties() {

    const container =
        document.getElementById(
            "propertyList"
        );

    if (!container) return;

    const properties =
        Storage.getProperties().slice().reverse();

    container.innerHTML = "";

    properties.forEach(p => {

        container.innerHTML += `

        <div class="entity-card">

            <strong>${p.id}</strong>

            <h3>
                ${p.propertyType}
            </h3>

            <p>
                📍 ${p.location}
            </p>

            <p>
                💰 Le ${Number(
                    p.rentPrice
                ).toLocaleString()}
            </p>

            <div class="card-actions">

                <a href="
                    property-detail.html?id=${p.id}
                ">
                    <button>
                        View
                    </button>
                </a>

                <a href="
                    property-form.html?id=${p.id}
                ">
                    <button class="edit">
                        Edit
                    </button>
                </a>

                <button
                    class="delete"
                    onclick="
                    deleteProperty(
                        '${p.id}'
                    )">

                    Delete

                </button>

            </div>

        </div>
        `;
    });
}

function deleteProperty(id) {

    if (
        !confirm(
            "Delete property?"
        )
    ) return;

    Storage.deleteProperty(id);

    renderProperties();
}

/* =====================
PROPERTY FORM
===================== */

function initPropertyForm() {

    const form =
        document.getElementById(
            "propertyForm"
        );

    if (!form) return;

    LOCATIONS.forEach(location => {

        document
            .getElementById(
                "location"
            )
            .innerHTML += `
            <option>
                ${location}
            </option>
        `;
    });

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

    PROPERTY_STATUS.forEach(status => {

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

    FEATURES.forEach(feature => {
        document.getElementById("featuresBox").innerHTML += `
            <div class="checkbox-item">
                <label>
                    <span class="checkbox-text">${feature}</span>
                    <input type="checkbox" value="${feature}" name="feature">
                </label>
            </div>
        `;
    });

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        params.get("id");

    let editProperty = null;

    if (id) {

        editProperty =
            Storage
            .getProperties()
            .find(
                p =>
                p.id === id
            );

        if (editProperty) {

            document
                .getElementById(
                    "landlordName"
                )
                .value =
                editProperty.landlordName;

            document
                .getElementById(
                    "phone"
                )
                .value =
                editProperty.phone;

            document
                .getElementById(
                    "rentPrice"
                )
                .value =
                editProperty.rentPrice;

            document
                .getElementById(
                    "location"
                )
                .value =
                editProperty.location;

            document
                .getElementById(
                    "propertyType"
                )
                .value =
                editProperty.propertyType;

            document
                .getElementById(
                    "status"
                )
                .value =
                editProperty.status;

            document
                .getElementById(
                    "notes"
                )
                .value =
                editProperty.notes || "";

            document
                .querySelectorAll(
                    '[name="feature"]'
                )
                .forEach(cb => {

                    cb.checked =
                    (editProperty.features || [])
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

            const features =
                Array.from(
                    document.querySelectorAll(
                        '[name="feature"]:checked'
                    )
                )
                .map(
                    cb => cb.value
                );

            const property = {

                id:
                    editProperty
                    ? editProperty.id
                    : Ids.nextPropertyId(),

                landlordName:
                    document
                    .getElementById(
                        "landlordName"
                    ).value,

                phone:
                    document
                    .getElementById(
                        "phone"
                    ).value,

                rentPrice:
                    Number(
                        document
                        .getElementById(
                            "rentPrice"
                        ).value
                    ),

                location:
                    document
                    .getElementById(
                        "location"
                    ).value,

                propertyType:
                    document
                    .getElementById(
                        "propertyType"
                    ).value,

                features,

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
                    editProperty
                    ? editProperty.createdAt
                    : new Date()
                    .toISOString()
            };

            if (editProperty) {

                Storage.updateProperty(
                    property
                );

            } else {

                Storage.addProperty(
                    property
                );
            }

            location.href =
                "properties.html";
        }
    );
}

/* =====================
PROPERTY DETAIL
===================== */

function loadPropertyDetail() {

    const box =
        document.getElementById(
            "propertyDetail"
        );

    if (!box) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        params.get("id");

    const property =
        Storage
        .getProperties()
        .find(
            p =>
            p.id === id
        );

    if (!property) return;

    box.innerHTML = `

        <h2>${property.id}</h2>

        <h3>
            ${property.propertyType}
        </h3>

        <p>
            Status:
            ${property.status}
        </p>

        <p>
            Landlord:
            ${property.landlordName}
        </p>

        <p>
            Phone:
            ${property.phone}
        </p>

        <p>
            Location:
            ${property.location}
        </p>

        <p>
            Rent:
            Le ${Number(
                property.rentPrice
            ).toLocaleString()}
        </p>

        <p>
            Features:
            ${(property.features || [])
                .join(", ")}
        </p>

        <p>
            Notes:
            ${property.notes || "-"}
        </p>

        <p>
            Created:
            ${Utils.formatDate(
                property.createdAt
            )}
        </p>
    `;

    document
        .getElementById(
            "editBtn"
        )
        .onclick = () => {

        location.href =
            `property-form.html?id=${property.id}`;
    };

    document
        .getElementById(
            "matchBtn"
        )
        .onclick = () => {

        findMatchesForProperty(
            property
        );
    };
}

function findMatchesForProperty(
    property
) {

    const results =
        document.getElementById(
            "matchResults"
        );

    const tenants =
        Storage.getTenants();

    const matches =
        tenants
        .map(tenant => ({

            tenant,

            score:
                Utils
                .calculateMatchScore(
                    tenant,
                    property
                )

        }))
        .filter(
            match =>
            match.score > 0
        )
        .sort(
            (a, b) =>
            b.score - a.score
        );

    if (
        matches.length === 0
    ) {

        results.innerHTML = `
            <div class="match-card">
                No matching tenants found.
            </div>
        `;

        return;
    }

    results.innerHTML =
        "<h3>Suggested Tenants</h3>";

    matches.forEach(match => {

        let cls = "match-low";

        if (
            match.score >= 80
        ) {

            cls = "match-good";

        } else if (
            match.score >= 50
        ) {

            cls = "match-medium";
        }

        results.innerHTML += `

        <div class="match-card ${cls}">

            <strong>
                ${match.score}% Match
            </strong>

            <p>
                ${match.tenant.id}
            </p>

            <p>
                ${match.tenant.fullName}
            </p>

            <p>
                📍 ${match.tenant.locations.join(", ")}
            </p>

            <p>
                🏠 ${match.tenant.propertyType}
            </p>

            <p>
                💰 Le ${Number(
                    match.tenant.budget
                ).toLocaleString()}
            </p>

            <a href="
                tenant-detail.html?id=${match.tenant.id}
            ">
                <button class="primary">
                    Open Tenant
                </button>
            </a>

        </div>
        `;
    });
}

/* =====================
INIT
===================== */

renderProperties();
initPropertyForm();
loadPropertyDetail();