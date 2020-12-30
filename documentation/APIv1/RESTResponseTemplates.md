---
DOC-LEVEL: critical

---

# REST API Response Templates

One of the most important aspects of a REST API is its JSON response format. At UnionGroup, we have a loose standard format on how our APIs respond to our request. We work off of a modified version of [JSend](https://github.com/omniti-labs/jsend), which is a specification for modern REST APIs. For us, however, we slightly modify this standard to fit our needs and our system.



### Response Formats

There are 3 different response types according to **JSend**. The response types are as follows:

1. **Success ** The request succeeded with no errors.
2. **Fail**  The request failed due to a user or usage error.
3. **Error** The request failed due to a server error.

**ℹ️ More information on these types and the according GRUD methods can be found in the [JSend Documentation](https://github.com/omniti-labs/jsend)**.



#### An Example Request

```javascript
{
  	/** -- START JSend CONVENTION -- **/
  	status: 'success',
    data: {
        venues: [
            { venue_id: 'xxxxxxxx0' },
            { venue_id: 'xxxxxxxx1' },
        ]
    },
  	/** -- END JSend CONVENTION -- **/
    status_code: 200,
    transaction: {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        response_time: "23.5 ms",
      	access_key : "ACCESSKEY",
        support_reference: "https://stately.uniongroup.com/support/api/transaction/xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx?key=ACCESSKEY"
    }
}
```

As you can see, the convention is closely followed. The only differences are some additions that make the transaction more transparent for our end user. The additions are:

1. **The** `transaction` **Object** A lookup able object that contains information about the transaction
2. **The** `status_code` A HTTP code describing the transaction



#### The Transaction Object

For us, supporting our customers and developers is paramount to what we do. In order to keep up with that standard, we keep track of many things on our server. These transactions can be looked up both internally and externally. Externally, of course, the data that we provide about that transaction is fairly limited, however, using our internal tools, we can pinpoint many things about the request. Details such as origin, user, intent, infrastructure used, endpoints and logs can be accessed internally using this object.



##### So, what does the object look like?

The object consists of the following properties:

1. `id` The transaction ID
2. `response_time` The time it took from request to response (this is a KPI that we can use to determine how well our requests run through our infrastructure)
3. `access_key` For support, we need to verify that this was actually the request sender and recipient. This key usually is a string.
4. `support_reference` Using this link, the user can look at their transaction using our public interfacne



[JSend]: https://github.com/omniti-labs/jsend	"JSend Documentation"

