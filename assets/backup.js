const Backup = {

    export() {

        const data = {

            tenants:
                Storage.getTenants(),

            properties:
                Storage.getProperties()
        };

        const blob =
            new Blob(
                [
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                ],
                {
                    type:
                    "application/json"
                }
            );

        const a =
            document.createElement(
                "a"
            );

        a.href =
            URL.createObjectURL(
                blob
            );

        a.download =
            "rentsure-backup.json";

        a.click();
    },

    import(file) {

        const reader =
            new FileReader();

        reader.onload = () => {

            const data =
                JSON.parse(
                    reader.result
                );

            Storage.saveTenants(
                data.tenants || []
            );

            Storage.saveProperties(
                data.properties || []
            );

            location.reload();
        };

        reader.readAsText(file);
    }
};