module.exports.Qdata = {
    /**
     * @param {object[]} data 
     * @param {string[]} filds 
     */
    filds(data, filds) {
        if (filds == undefined || filds.length == 0) return data;
        for (let i = 0; i < data.length; i++) {
            let temp = {};
            for (let j = 0; j < filds.length; j++) {
                temp[filds[j]] = data[i][filds[j]];
            }
            data[i] = temp;
        }
        return data;
    },
    /**
     * @param {object[]} table1 
     * @param {{id:string;data:object[]}} table2 
     * @param {string} key1
     * @param {string} key2
     */
    join(table1, table2, key1, key2) {
        for (let i = 0; i < table1.length; i++) {
            table1[i][key1] = [];
            for (let j = 0; j < table2.length; j++) {
                if (table1[i][key1] == table2[j][key2]) {
                    table1[i][key1].push(table2[j]);
                }
            }
        }
        return table1;
    }
}