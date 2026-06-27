let backupHandle = null;

/* =========================
   IndexedDB (store file handle)
========================= */

const BackupDB = {
    db: null,

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("RentSureBackupDB", 1);

            request.onupgradeneeded = () => {
                const db = request.result;

                if (!db.objectStoreNames.contains("handles")) {
                    db.createObjectStore("handles");
                }
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onerror = reject;
        });
    },

    async saveHandle(handle) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("handles", "readwrite");
            tx.objectStore("handles").put(handle, "backup");

            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    },

    async getHandle() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("handles", "readonly");
            const req = tx.objectStore("handles").get("backup");

            req.onsuccess = () => resolve(req.result);
            req.onerror = reject;
        });
    }
};

/* =========================
   Helpers
========================= */

function getBackupData() {
    return {
        tenants: Storage.getTenants(),
        properties: Storage.getProperties()
    };
}

async function writeBackup(handle) {
    const writable = await handle.createWritable();

    await writable.write(
        JSON.stringify(getBackupData(), null, 2)
    );

    await writable.close();
}

/* =========================
   Main Backup System
========================= */

const Backup = {

    /* ---------- SAVE (overwrite same file) ---------- */
    async save() {
        try {
            if (!BackupDB.db) await BackupDB.init();

            if (!backupHandle) {
                backupHandle = await BackupDB.getHandle();
            }

            if (!backupHandle) {
                backupHandle = await window.showSaveFilePicker({
                    suggestedName: "rentsure-backup.json",
                    types: [{
                        description: "JSON Files",
                        accept: { "application/json": [".json"] }
                    }]
                });

                await BackupDB.saveHandle(backupHandle);
            }

            const perm = await backupHandle.queryPermission({ mode: "readwrite" });

            if (perm !== "granted") {
                const req = await backupHandle.requestPermission({ mode: "readwrite" });

                if (req !== "granted") {
                    alert("Permission denied");
                    return;
                }
            }

            await writeBackup(backupHandle);
            alert("Backup saved");

        } catch (err) {
            console.error(err);
        }
    },

    /* ---------- EXPORT (always new file) ---------- */
    async export() {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: `rentsure-backup-${new Date().toISOString().slice(0, 10)}.json`,
                types: [{
                    description: "JSON Files",
                    accept: { "application/json": [".json"] }
                }]
            });

            await writeBackup(handle);
            alert("Backup exported");

        } catch (err) {
            console.error(err);
        }
    },

    /* ---------- IMPORT ---------- */
    import(file) {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);

                const tenants = data.tenants || [];
                const properties = data.properties || [];

                Storage.saveTenants(tenants);
                Storage.saveProperties(properties);

                /* ---------- restore tenant counter ---------- */
                let maxT = 0;
                tenants.forEach(t => {
                    const n = Number(t.id?.replace("T", "")) || 0;
                    if (n > maxT) maxT = n;
                });

                localStorage.setItem("tenantCounter", maxT + 1);

                /* ---------- restore property counter ---------- */
                let maxP = 0;
                properties.forEach(p => {
                    const n = Number(p.id?.replace("P", "")) || 0;
                    if (n > maxP) maxP = n;
                });

                localStorage.setItem("propertyCounter", maxP + 1);

                alert("Backup imported successfully");
                location.reload();

            } catch (e) {
                alert("Invalid backup file");
            }
        };

        reader.readAsText(file);
    }
};