const Ids = {

    nextTenantId() {

        let count =
            Number(
                localStorage.getItem(
                    "tenantCounter"
                )
            ) || 1;

        const id =
            "T" +
            String(count)
            .padStart(3, "0");

        localStorage.setItem(
            "tenantCounter",
            count + 1
        );

        return id;
    },

    nextPropertyId() {

        let count =
            Number(
                localStorage.getItem(
                    "propertyCounter"
                )
            ) || 1;

        const id =
            "P" +
            String(count)
            .padStart(3, "0");

        localStorage.setItem(
            "propertyCounter",
            count + 1
        );

        return id;
    }
};