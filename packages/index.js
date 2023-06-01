const { getFile, save } = require("./file")
const { join } = require("path")
module.exports.selectdb = function (dbName) {
    return {
        createTable: function (tableName) {
            try {
                save(join(__dirname, "database", dbName, `${tableName}.json`), []);
                return true;
            } catch (err) {
                throw err;
            }
        },
        table: function (tableName) {
            return {
                getAll: function () {
                    try {
                        let data = getFile(join(__dirname, "database", dbName, `${tableName}.json`));
                        if (arguments.length == 0) {
                            return data;
                        } else {
                            let collection = [];
                            for (let i = 0; i < data.length; i++) {
                                for (const key in arguments["0"]) {
                                    if (arguments["0"][key] != data[i][key]) {
                                        break;
                                    }
                                    if (Object.keys(arguments["0"])[Object.keys(arguments["0"]).length - 1] == key) {
                                        collection.push(data[i]);
                                    }
                                }
                                if (data.length == i + 1) return collection;
                            }
                        }
                    } catch (err) {
                        throw err;
                    }
                },
                update: function (user, body) {
                    try {
                        let data = getFile(join(__dirname, "database", dbName, `${tableName}.json`));
                        if (arguments.length == 0 || arguments.length == 1) {
                            return false;
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                for (const key in user) {
                                    if (user[key] != data[i][key]) {
                                        break;
                                    }
                                    if (Object.keys(user)[Object.keys(user).length - 1] == key) {
                                        data[i] = body;
                                        save(join(__dirname, "database", dbName, `${tableName}.json`), data);
                                        break;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        throw err;
                    }
                },
                insert: function (body) {
                    try {
                        let data = getFile(join(__dirname, "database", dbName, `${tableName}.json`));
                        if (arguments.length == 0) {
                            return false;
                        } else {
                            data.push(body);
                            save(join(__dirname, "database", dbName, `${tableName}.json`), data);
                        }
                    } catch (err) {
                        throw err;
                    }
                },
                delete: function (user) {
                    try {
                        let data = getFile(join(__dirname, "database", dbName, `${tableName}.json`));
                        if (arguments.length == 0) {
                            return false;
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                for (const key in user) {
                                    if (user[key] != data[i][key]) {
                                        break;
                                    }
                                    if (Object.keys(user)[Object.keys(user).length - 1] == key) {
                                        data.splice(i, 1);
                                        save(join(__dirname, "database", dbName, `${tableName}.json`), data);
                                        break;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        throw err;
                    }
                },
                rewrite: function (data) {
                    save(join(__dirname, "database", dbName, `${tableName}.json`), data);
                }
            }
        }
    }
}
