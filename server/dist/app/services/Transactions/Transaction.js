"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const Slately_1 = require("./../UnionGroup/Slately");
class Transaction extends Slately_1.Slately {
    constructor(id = null) {
        super();
        this.transactionObject = {
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            response_time: "23.5 ms",
            access_key: "ACCESSKEY",
            support_reference: "https://stately.uniongroup.com/support/api/transaction/xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx?key=ACCESSKEY"
        };
    }
    get() {
        //TODO: Implement Transaction Method
        return this.transactionObject;
    }
}
exports.Transaction = Transaction;
