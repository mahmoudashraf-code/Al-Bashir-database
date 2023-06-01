const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

module.exports.database = function (db, table) {
    return {
        get() {
            return JSON.parse(readFileSync(join(__dirname, "..", "database", db, table), "utf8"));
        },
        write(data) {
            writeFileSync(join(__dirname, "..", "database", db, table), data)
        },
        insert(item) {
            this.write(this.get().push(item));
        },
        delete(id, value) {
            let data = this.get();
            for (let i = 0; i < data.length; i++) {
                if (data[i][id] == value) {
                    data.splice(i, 1);
                    break;
                }
            }
            this.write(data);
        },
        update(id, value, item) {
            let data = this.get();
            for (let i = 0; i < data.length; i++) {
                if (data[i][id] == value) {
                    data[i] = item;
                    break;
                }
            }
            this.write(data);
        }
    }
}
