/**
 * Created by rohit on 12/12/18.
 */

(function () {
    "use strict";
    const csv       = require('csv-stream');
    const through2  = require('through2');
    const fs        = require('fs');

    function readCSV(callback) {
        let count = 0;

        const stream = fs.createReadStream('./input.csv').pipe(csv.createStream({
            endLine : '\n',
            columns : ['field_1', 'field_2'],
            escapeChar : '"',
            enclosedChar : '"'
        })).pipe(through2({ objectMode: true }, (row, enc, cb) => {
            if(!count){
                //This is to make sure that if headers are present then
                //no need to take them into consideration, skip by just
                //making the count incremented.
                count++;
                return cb();
            } else {
                let field_1 = row.field_1;
                let field_2 = row.field_2;
                console.log("field_1 ==> ", field_1, " field_2 ==> ", field_2);
                count++;
                return cb();
            }
        })).on('finish', () => {
            console.log("total rows scanned ==> ", count-1);
            callback(null, count-1);
        });
    }

    function init() {
        readCSV(function (err, result) {
            if(err) {
                console.log("exiting :::: error :::: ", err.message);
            } else {
                console.log("Task complete :::: ", result);
            }
            process.exit(0);
        })
    }

    init();

})();
