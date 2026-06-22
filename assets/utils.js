const Utils = {

    formatDate(date) {

        return new Date(date)
            .toLocaleDateString();
    },

    calculateMatchScore(
        tenant,
        property
    ) {

        let score = 0;
        let total = 4;

        if (
            tenant.propertyType ===
            property.propertyType
        ) {
            score++;
        }

        if (
            tenant.locations.includes(
                property.location
            )
        ) {
            score++;
        }

        if (
            property.rentPrice <=
            tenant.budget
        ) {
            score++;
        }

        const matchedFeatures =
            tenant.requirements.filter(
                r =>
                property.features.includes(
                    r
                )
            ).length;

        if (
            tenant.requirements.length
        ) {

            score +=
                matchedFeatures /
                tenant.requirements.length;
        }

        return Math.round(
            (score / total) * 100
        );
    }
};