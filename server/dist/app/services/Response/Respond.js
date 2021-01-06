"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const Slately_1 = require("./../UnionGroup/Slately");
// Import transactions
const Transaction_1 = require("../Transactions/Transaction");
class Response extends Slately_1.Slately {
    constructor() {
        super(...arguments);
        this.headers = [];
        this.template = {
            category: 'standard',
            fill_type: 'static',
            name: 'default',
            description: "A static template for a successful query.",
            template_code: "200",
            status_code: 200,
            status_name: 'success',
            prototype: {
            /** To comply with the JSend format, the status will be added by the manager from the data above. **/
            }
        };
        this.responseParameters = {
            category: 'standard',
            fill_type: 'static',
            name: 'default',
            description: "A static template for a successful query.",
            template_code: "200",
            status_code: 200,
            status_name: 'success',
            prototype: {
                /** To comply with the JSend format, the status will be added by the manager from the data above. **/
                message: undefined,
                status_code: undefined,
                transaction: undefined,
                status_name: undefined,
                data: undefined
            }
        };
        this.built = false;
        this.responseConstructed = {};
        this.data = {
            payload: undefined
        };
    }
    setTemplate(name) {
        // Get existing templates
        const responseTemplates = require('./ResponseTemplates');
        // Set movement and scope variables
        let found = false;
        let scope = this;
        // Search
        responseTemplates.templates.some(function (template) {
            if (template.name === name) {
                scope.template = template;
                scope.responseParameters = template;
                return true;
            }
        });
        // Throw if not found
        if (!found) {
            throw new Error('Template "' + name + '" does not exist or cannot be accessed.');
        }
        return this;
    }
    addHeader(name, value) {
        let headerSet = {
            name: name,
            value: value
        };
        // add header to list
        this.headers.push(headerSet);
    }
    attachPayload(payload) {
        this.data.payload = payload;
    }
    attachMessage(message) {
        this.responseParameters.prototype.message = message;
    }
    changeHTTPStatusCode(code, message) {
        // Change the status code
        this.responseParameters.status_code = code;
        this.responseParameters.status_name = message;
        return this;
    }
    build(transactionObj = null) {
        // If a transaction was not specified, create a blank one
        let t = transactionObj ? transactionObj : new Transaction_1.Transaction();
        // Move to new location and get the transaction object
        this.responseConstructed = this.responseParameters.prototype;
        this.responseConstructed.status_code = this.responseParameters.status_code;
        this.responseConstructed.status_name = this.responseParameters.status_name;
        this.responseConstructed.transaction = (t == null ? { error_code: 500 } : t.get());
        this.responseConstructed.data = this.data;
    }
    respond(resObj, transactionObj = null) {
        // If response has not been built yet, build it
        if (!this.built) {
            this.build(transactionObj);
        }
        // Add headers to response
        this.headers.forEach((e) => {
            resObj.header(e.name, e.value);
        });
        // Attach status code
        resObj.status(this.responseConstructed.status_code);
        // Send it via the provided response Object
        resObj.send(this.responseConstructed);
    }
}
exports.Response = Response;
