const Storage = {

    getTenants() {
        return JSON.parse(
            localStorage.getItem("tenants")
        ) || [];
    },

    saveTenants(data) {
        localStorage.setItem(
            "tenants",
            JSON.stringify(data)
        );
    },

    getProperties() {
        return JSON.parse(
            localStorage.getItem("properties")
        ) || [];
    },

    saveProperties(data) {
        localStorage.setItem(
            "properties",
            JSON.stringify(data)
        );
    },

    addTenant(tenant) {
        const tenants =
            Storage.getTenants();

        tenants.push(tenant);

        Storage.saveTenants(
            tenants
        );
    },

    updateTenant(updated) {

        const tenants =
            Storage.getTenants().map(
                t =>
                t.id === updated.id
                    ? updated
                    : t
            );

        Storage.saveTenants(
            tenants
        );
    },

    deleteTenant(id) {

        const tenants =
            Storage.getTenants().filter(
                t => t.id !== id
            );

        Storage.saveTenants(
            tenants
        );
    },

    addProperty(property) {

        const properties =
            Storage.getProperties();

        properties.push(property);

        Storage.saveProperties(
            properties
        );
    },

    updateProperty(updated) {

        const properties =
            Storage.getProperties().map(
                p =>
                p.id === updated.id
                    ? updated
                    : p
            );

        Storage.saveProperties(
            properties
        );
    },

    deleteProperty(id) {

        const properties =
            Storage.getProperties().filter(
                p => p.id !== id
            );

        Storage.saveProperties(
            properties
        );
    }
};