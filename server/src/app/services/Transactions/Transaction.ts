import { Slately as SlatelyCore } from './../UnionGroup/Slately';

class Transaction extends SlatelyCore{
    transactionObject = {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        response_time: "23.5 ms",
        access_key : "ACCESSKEY",
        support_reference: "https://stately.uniongroup.com/support/api/transaction/xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx?key=ACCESSKEY"
    }
    constructor(id=null){
        super();
    }

    get(){
        //TODO: Implement Transaction Method
        return this.transactionObject;
    }

}

export { Transaction };