/**
 * ╦═══════════════════════════════════════════╗
 * ║                                           ║
 * ║          Important Documentation:         ║
 * ║        REST API RESPONSE TEMPLATES        ║
 * ║                                           ║
 * ╚═══════════════════════════════════════════╝
 *
 * DOC-LEVEL: Critical
 * DOC-TITLE:
 *
 */

module.exports = {
    placeholders : {
        node : class node {
            data = {};
        }
    },
    templates: [
        {
            category: 'standard',
            fill_type: 'static',
            name: 'query_successful_basic',
            description: "A static template for a successful query.",
            template_code: "200",
            status_code: 200,
            status_name: 'success',
            prototype: {
                /** To comply with the JSend format, the status will be added by the manager from the data above. **/
            }
        },
        {
            category: 'standard',
            fill_type: 'static',
            name: 'query_successful_data',
            description: "A static template for a successful query.",
            template_code: "200",
            status_code: 200,
            status_name: 'success',
            prototype: {
                /** To comply with the JSend format, the status will be added by the manager from the data above. **/
                data: null
            }
        }
    ]
}