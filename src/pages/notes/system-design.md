---
layout: ../../layouts/Blog.astro
title: "System Design Notes"
tags: ["system_design", "web_development"]
---

## URL

Universal Resource Locater

`http://sub.example.com/product/electric/phone/`

- http: (scheme)
- sub (subdomain)
- example.com (domain)
- product/electric (path)
- phone (resource)

The distinction between path and resource does not matter that much.

URLs are a _type of_ URI.

https://danielmiessler.com/study/difference-between-uri-url/

## DNS

Domain Name System

DNS translates domain names to IP addresses. Similarly to a phone book.

### DNS Lookup Process

1. Look up browser cache
2. Look up OS cache
3. Look up DNS resolver which recursively looks up the domain name
   1. This involves many different servers.
   2. The "domain -> IP" mapping is cached in each of these servers.

## TCP

Transmission Control Protocol

**[HTTP](#http)**

Browser needs to establish TCP connection with web server. This takes several network round trips. This is an expensive operation.

Modern browsers use a "keep-alive" connection to reuse already established TCP connection.

After which, the browser sends HTTP requests to the server. Server then sends back HTTP responses. There usually are multiple requests and responses on a typical website. Also, each image / file and javascript bundle / file has to be separately requested.

**[HTTPS](#https)**

HTTPS requires a SSL/TLS handshake to establish an encrypted connection. This handshake is even more expensive than regular TCP handshake.

Browser uses tricks like SSL session resumption to reduce cost.

## Request-Response API

[Playlist: Web API Design Series](https://www.youtube.com/playlist?list=PLP_rkG1reBjrCKy2Pb1bvjJKbKfantijk)

Application Programming Interface

[Video: REST vs RPC vs GraphQL API - How do I pick the right API paradigm?](https://www.youtube.com/watch?v=hkXzsB8D_mo)

[Article: Debunking the Myths of RPC & REST](https://web.archive.org/web/20141104223736/http://etherealbits.com/2012/12/debunking-the-myths-of-rpc-rest/)

1. REST API
2. Remote Procedure Call (RPC)
3. GraphQL

### HTTP Status Codes

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

- 100-level: Informational responses
- 200-level: Successful responses
- 300-level: Redirection messages
- 400-level: Something is wrong with _request_
- 500-level: Something is wrong with _server_ (client might re-try, especially for idempotent requests)

Common codes:

- `200`: OK
  - `GET`: Resource fetched successfully and returned in body.
  - `HEAD`: Representation headers are included in response without any message body.
  - `PUT` or `POST`: Resource describing the result of the action is in body.
  - `TRACE` Message body contains request message as received by server.
- `201`: Created
  - indicates a resource has been created, usually after `POST`, and sometimes `PUT`
- `301`: Moved Permanently
  - New URL is given in the response
  - Typically used by URL shorteners (bit.ly, goo.gl) for click tracking
- `304`: Not Modified
  - Informs the client that the response is not modified, i.e. client can use the cached version
- `400`: Bad Request
  - Client made an invalid request, perhaps invalid request syntax
- `401`: Unauthorised
  - Although specified as unauthorised, it means unauthenticated.
  - Client needs to be authenticated to access the resource (client's identity is unknown).
- `403`: Forbidden
  - Client's identity is known, but does not have access to this resource.
  - Can send `404` instead of `403` to hide the existence of the resource.
- `404`: Not Found
  - Typically, resource does not exist.
  - Can send `404` instead of `403` to hide the existence of the resource.
- `418`: I'm a teapot
  - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
- `429`: Too Many Requests
  - Exceeded rate limit
- `500`: Internal Server Error
  - Server cannot handle the situation.
- `501`: Not Implemented
  - Request method is not supported by the server.
  - `GET` and `HEAD` methods must be supported by the server.
- `502`: Bad Gateway
  - Server, while acting as a gateway, got an invalid response.
- `503`: Service Unavailable
  - Server cannot handle the request for reasons like:
    - down for maintenance
    - server overloaded
  - Should include a user-friendly page explaining the problem
  - Should include a `Retry-After` HTTP header, if possible
- `504`: Gateway Timeout
  - Server, while acting as a gateway, cannot get response in time.

### API Versioning

Allows newer versions to introduce changes that would otherwise break compatibility.

#### Additive-Change Strategy

[Video: Web API Versioning | Additive Change Strategy](https://www.youtube.com/watch?v=y6wXRMDtZd8)

Changes to API will **always** not break compatibility.

- Cannot change behaviour of existing API endpoints
- Cannot remove or rename any parameters / fields
- Cannot change types for response fields
- Cannot change error codes
- Cannot add new **required** parameters / fields
- Can add new fields
- Can add new endpoints
- Can change response based on **opt-in** parameters
  - Query parameter with a boolean flag to use a "newer version" of the endpoint
- Adding new response fields may increase response size and break consumer limits

> Better for _smaller_ and _simpler_ projects that are not likely to change in the future.

#### Explicit-Version Strategy

[Video: Explicit Versioning](https://www.youtube.com/watch?v=Yv_B0dniVhI)

Use a numbered versioning scheme to allow the user to pick which version of the endpoint.

> Better for _larger_ projects and _enterprise_ applications.

**Methods**

- URI Components
- HTTP Headers
- Request Parameters

**URI Components**

- Before resource `https://www.youtube.com/api/v1.1/channels`: use when version scheme applies to a collection of endpoints
- After resource `https://www.youtube.com/api/channels/v1.1`: use when version scheme applies to a single endpoint

- Easier to debug, because more visible
- URIs need to be permanently supported links
  - Might need to use 300-level codes to redirect the requests

**HTTP Headers**

Use either:

- Custom Header: `Youtube-Version: 1.2`
- Accept Header: `Accept: application/json; version=1.2`

- Reduces noise in URIs
- Harder to debug, because less visible
- Potential client caching issues
  - Client might believe that two different versions are the same and return the cached copy

**Request Parameters**

`https://youtube.com/api/channels?version=1.2`

- Similar benefits as URI components
- Challenging to manage on a server level: all versions are handled by a single endpoint
  - Can cause load balancing issues

#### Semantic Versioning

[semver.org | Semantic Versioning](https://semver.org/)

Major.Minor.Patch (2.0.1)

- Major: breaking changes or backwards incompatible versions
- Minor: adding new features and functionality in backwards compatible manner
- Patch: fix bugs in a backwards compatible way

Typically, only major versions are exposed differently to the end user.

#### Sunset Headers / Decommissioning Versions

Deprecate old versions to lower maintenance work.

Need to communicate to consumers, through email, newsletters, articles, etc... BUT can use Sunset Response Headers.

Sunset Response Headers specify the sunset date. `Sunset: Sat, 31 Dec 2022 23:59:59 GMT`

After the sunset date, accessing the resource should result in a either 400-level or 300-level error.

## REST API

[Video: What Is REST API? Examples And How To Use It](https://www.youtube.com/watch?v=-mN3VyJuCjM)

Representational State Transfer Application Programming Interface

Models the problem domain as resources.

**Stateless**: client & server does not need to store information about each other; every request is independent

- easy to scale
- well-behaved

Organises resources into a set of URIs (Uniform Resource Identifiers). They differentiate the different types of resources.

Resources should be nouns rather than verbs: `GET /user`, rather than `GET /get_user`.

**CRUD**: create, read, update, delete

- `GET` - Read
- `POST` - Create
  - often includes form data
- `PUT` - Full Update
- `PATCH` - Partial Update
- `DELETE` - Delete
- `HEAD` - `GET` but without the response body (only the headers)
  - used for testing if the other party is there

Typically returns JSON or XML.

`PUT` - full update - overwrites the entire resource if it exists, otherwise create the new resource
`PATCH` - partial update - only send the data to be updated (a set of changes/instructions to be implemented), other parameters will not be affected

**PUT vs PATCH idempotent**

- [SO post #1](https://stackoverflow.com/a/34400076)
- [SO post #2](https://stackoverflow.com/a/39338329)

- `PUT` is idempotent.
- `PATCH` can have "commands", like `"op": "add"` to `/users/` for adding a user.
- Using an operation like adding a user, `PATCH` is not idempotent (if usernames are not unique).

### REST API Parameters & Resources

https://stackoverflow.com/questions/4024271/rest-api-best-practices-where-to-put-parameters

- `/api/user/XXX` (path variables)
- `/api/user?username=XXX` (query parameters)

Path variables are generally used for:

- IDs / unique identifiers
- subresources

> One reason why it is recommended to use path variables as much as possible is because some browsers do not cache the results if the query contains query parameters (because of RPC APIs)

Query parameters are generally used for:

- optional parameters
- filters
- other modifiers (e.g. sorted by)

> However, these are not set in stone, and there is no general consensus on when to use which. It is more important to be consistent!

### Non-CRUD with REST API

Some operations like archiving, deactivate, search do not naturally fit into any of the CRUD operations.

**Archive**

Typically, would use `PATCH` with a `flag` of `"archive": true`.

**Deactivate**

- `PUT /users/user-1/deactivate`
- Acceptable to use verbs in sub-resource, because there is no way otherwise.

**Search**

- `GET /search/code?name=bob`
- Recommended to use `GET` with query parameters. This is because browsers cache `GET` requests.

> Do NOT use the request body because browser caching works only with the URL. `GET` requests with a request body also breaks the REST principle.

### Pros of REST API

- standard method names, arguments and status codes
- utilises HTTP features
- easy to maintain and build

### Cons of REST API

- big payloads: not all data may used
- multiple HTTP roundtrips: if there is a need to get a resource and a sub-resource

## RPC API

Remote Procedure Call

Exposes _actions_ (think function calls), rather than _CRUD operations_.

Has endpoints for each action.

Examples:

- `https://slack.com/api/chat.postMessage`
- `https://slack.com/api/chat.scheduleMessage`
- `https://slack.com/api/chat.deleteScheduledMessage`

Supports only

- GET requests (read-only)
- POST requests (everything else)

### Pros of RPC API

- easy to understand
- lightweight payloads
- high performance: action-oriented

### Cons of RPC API

- not standardised: hard to discover endpoints, have to constantly reference documentation
- number of endpoints can grow _too much_

### gRPC

[Video: What is RPC? gRPC Introduction](https://www.youtube.com/watch?v=gnchfOojMk4)

Google's implementation of RPC that is very widely used.

Protocol Buffers are used as the data interchange format, it is language-agnostic and platform-agnostic (works the same on all languages and platforms).

- Many languages are supported by gRPC
- Data / Schema is strongly typed and defined in a `.proto` file
- gRPC service is also defined in a `.proto` file
- These `.proto` files can be used to generate code / classes in the client and server for making RPC calls
- High performance
  - Protocol Buffers are binary encoded and faster than JSON
  - gRPC is built on top of HTTP/2 streams
- Browser support is not strong enough to support a gRPC client
- gRPC is used more for communication between microservices

## GraphQL API

Only a single endpoint.

Client requests a structure and the server returns the result in the exact format requested.

Supports only

- GET requests
- POST requests

### Pros of RPC API

- saves multiple round trips: only needs a single call
- avoids versioning: because there is no need for any versioning
- smaller payload: client requests exactly what is needed

### Cons of RPC API

- complexity: server needs to handle much more complex queries
  - too complicated for simple APIs
- optimising performance is difficult: hard to identify _what_ to optimise for

## Event-Driven API

https://www.youtube.com/watch?v=6RvlKYgRFYQ

Instead of constantly polling using Request-Response APIs, use Event-Driven APIs instead.

1. WebHooks
2. WebSockets
3. HTTP Streaming

**Producer**: Server producing / writing events.
**Consumer**: Client consuming / reading events.

### Kafka

Distributed system of servers and clients communicating using **TCP** network protocol, can be deployed on bare-metal hardware, virtual machines, containers, cloud environments and the like.

There are Kafka Streams libraries in various popular programming languages.

Producer <-> Kafka Cluster (contains multiple brokers) <-> Consumer

https://kafka.apache.org/intro#intro_platform

Kafka use cases: https://www.neovasolutions.com/2020/07/20/apache-kafka-a-quick-overview/

- Implements event streaming end to end
- Handle connection between micro-services
- Useful for real-time data processing, monitoring, tracking
- Many types of connections, between different services, are implemented in Kafka, don't need to implement them yourself

## WebHooks API

1. User registers with (interested events and callback URL)
2. Whenever there is an event, the Provider sends updates to the User's callback URL

- API provider is responsible for providing updates to the user
- User has to expose a API endpoint, which can be a security flaw
- Spike in events can be noisy

## WebSockets

1. Handshake with HTTP (Client -> Server)
2. Upgrade to WebSocket (Client <- Server)
3. Bidirectional Communication established (Client <-> Server)

**Pros**

- Bidirectional low latency communication
  - Chat, games, etc...
- Reduced overhead of HTTP requests
  - Don't need headers, cookies, etc...

**Cons**

- Clients are responsible for connections
  - client has to re-connect when connection dies
- Challenges when scaling: server has to maintain a connection with every client at the same time

## HTTP Streaming

Typically, HTTP responses are of a finite length. But with HTTP streaming, the server responds with an indefinite response.

1. Client sends a request to Server
2. Server responds with a response that does not terminate (so it can keep sending data)

**How?**

1. Set transfer encoding header to "chunked"
   - common for non-browser clients, like server-server connections
2. Stream data via Server-Sent-Events
   - common for browser clients: can use standardised event source API web interface
   - Twitter uses this to push new tweets

**Pros**

- Can stream over simple HTTP
- Browsers natively support this

**Cons**

- Bidirectional communication is challenging (only server can send data to the client)
- Buffering due to buffer limits: client might only render the data after a certain amount of data is received

## Pagination

https://blog.logrocket.com/infinite-scrolling-graphql/ (first section is more relevant)

[Video: Web API Pagination](https://www.youtube.com/watch?v=WUICbOOtAic)

- more scalable for both client and server
- don't want to respond with `N` products when `N` can be really large, like thousands, millions, billions...
- avoids unnecessary resource wastage for both client and server

Two main ways:

1. Offset-based pagination
2. Cursor-based pagination

### Offset-Based Pagination

Commonly use `limit` & `offset` as parameters. If not specified, usually there are sensible default values.

- limit - maximum number of items in a batch
- offset - starting position
- similar to SQL syntax => easier to implement

#### Pros of Offset-Based Pagination

- simple to implement for both client and server
- can jump to any arbitrary page

#### Cons of Offset-Based Pagination

- unreliable results if there are changes to data as query is happening
- inefficient for large or distributed datasets
  - database query have to count and skip rows for every query: very inefficient for large offsets -> re-read rows and from unnecessary shards

### Cursor-Based Pagination

1. Client requests with only a `limit`
2. Server responds with results and a `next-cursor` (typically integer value), aka continuation tokens
3. Client includes this cursor in subsequent requests

Basically a pointer that the server uses to optimise performance. There are many ways to implement this.

A possible cursor is: timestamp of row creation.

```sql
SELECT * FROM Products
WHERE created_timestamp < $1 -- $1 is the cursor
ORDER BY created_timestamp
LIMIT 50;
```

> Be sure to index columns that the cursor value comes from to improve performance. SQL: `CREATE INDEX index_name ON table_name (column_name);`

#### Pros of Cursor-Based Pagination

- improved performance
- consistent results: even if data changes during query, it is fine

#### Cons of Cursor-Based Pagination

- pages need to be traversed one by one: cannot jump pages
  - acceptable for _infinite scrolling page_
- records need to be added sequentially (not really a problem most of the time)
- client needs to store the `next-cursor`

## Storing Passwords in DB

Open Web Application Security Project (OWASP)

Guidelines from OWASP.

1. Use modern hashing algorithm
   1. slow functions -> like bcrypt
2. Salt
   1. Without salts, can use pre-computation attacks like rainbow tables or database-based lookups
   2. Salts are unique to each password and are randomly generated when storing a password
   3. password + salt = salted password => hash this salted password
3. Store the hash (of salted password) + salt in plain text

**Validation**

1. Take user input + salt (from DB) = salted user input
2. Hash this salted user input. Check if it's the same as the salted password!

## Security: Authentication and Authorisation

[Video: Web API Security | Basic Auth, OAuth, OpenID Connect, Scopes & Refresh Tokens ](https://www.youtube.com/watch?v=x6jUDfpESmA)

- Authentication: Verifying _who_ you are.
- Authorisation: Verifying _what_ you can access and do (role), aka what you are authorised to do.

### Basic Authentication

1. base64 encode username & password
2. send encoded data in header, with SSL

**Cons**

- username & password needs to be sent with every request to the server: increases chances of compromise
- no way to use 3rd party application without sharing username and password!
- no way to revoke access to a single 3rd party application
- 3rd party applications have full access to the entire account

### OAuth

https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth (very in-depth article)

OAuth is a open standard for authorisation.

Allows users to grant access to applications without having to share passwords with them.

One such service is Auth0.

Used for authorisation, not authentication (user email, id, etc)!

1. no passwords being shared
2. can revoke access to each application individually
3. can control and limit access to each resource

- Redirect URI - callback URL: URL that the user is redirected to after authorisation
- response type (`code` is the most commonly used - authorisation code flow)
- scopes: read access, write access, ... (usually, can have multiple)

Returns authorisation code, then the client exchanges this code with the authorisation server to get an access token. Subsequent requests to the API uses this access token.

Need to exchange authorisation code to an access token for security reasons. During this exchange, a secret is also provided as a proof of identity.

#### OAuth Scopes

- Have limited scopes that serve a single or a few related purposes: to allow for more fine grained access.
- Don't have too many scopes: to prevent scopes from being too cluttered

#### OAuth Refresh Tokens

- Access tokens _should_ expire: usually a few minutes to a few days, depends on use case
- Need to have a way to refresh this tokens without the user re-logging in
- Issue a refresh token alongside the access token
- Application uses (client ID + secret + refresh token) to get a new access token

## Single Sign-On (SSO)

[Video: What is Single Sign-on (SSO)? How It Works](https://www.youtube.com/watch?v=O1cRJWYF-g4)

https://stormpath.com/blog/oauth-is-not-sso

SSO is not a protocol. Instead, it is a high-level concept.

Both OpenID Connect and SAML are both very similar and are widely supported by most services.

### OpenID Connect

A layer on top of the **OAuth** protocol that enables authentication. Allows client to verify the identity of end-users to get basic user profile.

Add a scope of `openid`.

Then, exchange for a (access token + ID token) from the authorisation server.

Uses JWT (JSON Web Token) to share identity between services.

The workflow is similar to [SAML](#saml) below, but instead of a signed SAML Assertion, a signed JWT is instead used.

### SAML

Security Assertion Markup Language

XML-based open standard for exchanging identity information. An alternative to OpenID.

Generally used in enterprise. One account to connect to many services.

**Basic SSO Login Flow**

1. When logging in to a Service Provider (e.g. Gmail) with a (email with work domain).
2. Service Provider returns a SAML Authentication Request to the browser.
3. Browser redirects user to the Identity Provider for the company. (Identity Provider examples: Okta, Auth0, OneLogin)
4. User logs in via a login page.
5. Identity Provider generates and returns a signed _SAML Assertion_.
   - SAML Assertion is a XML document that contains: user info and user access permissions
6. Browser forwards signed SAML Assertion to the Service Provider.
7. Service Provider validates the assertion is signed by the Identity Provider.
   - Typically done with public key cryptography

**Navigating to another SSO application**

1. When logging in to _another_ Service Provider (e.g. Workday) with a (email with work domain).
2. Service Provider returns a SAML Authentication Request to the browser.
3. Browser redirects user to the Identity Provider for the company. (Identity Provider examples: Okta, Auth0, OneLogin)
4. _Login is skipped_ because the user is still logged in.
5. (from here on, same as before)

## Rate Limiting

[Video: Web API Rate Limiting - Why it's so IMPORTANT for your APIs](https://www.youtube.com/watch?v=ZgYyHr-ubCs)

**Why**

- Prevents some forms of DOS (denial of service) from breaking your API
- Prevents misuse of API: a client accidentally spamming your API

**Considerations**

- Avoid global rate limits
  - different endpoints might be able to handle different loads
- Measure clients based on use case
  - limit by per-user, per-application, IP address basis
- Design for occasional traffic bursts
- Allow exceptions for high profile clients
  - Allow for different types of clients having different rates
- Consider rate limiting's performance: rate limiting should not affect the API's performance
  - Can use in-memory databases like Redis, Memcached for the speed
  - Choose the right rate limiting algorithms
    - Token bucket (https://en.wikipedia.org/wiki/Token_bucket)
      - Credit is accumulated into a bucket at a (given rate)
      - This bucket is not infinite and has a (given depth), with allows for controlled bursts of consumption
      - Whenever a packet is received, consume the credit as required
      - If there is not enough credit, the packet is dropped (or appended into a queue)
    - Fixed Window Counter
      - Allows for only (X amount of packets) per (window of time)
      - Not very often used because bursts of packets at the start of each window can still be a problem
    - Sliding Window Counter
      - Similar to Fixed Window Counter, but takes into account the previous window's consumption

## Proxy

[Video: Proxy vs Reverse Proxy (Real-world Examples)](https://www.youtube.com/watch?v=4NB0NDtOwIQ)

### Forward Proxy

A Forward Proxy sits between a User and Internet. Forward Proxy intercepts requests to web servers and acts as a middleman between a User and a Web Server.

- Forward Proxy hides the Client's identity (IP address)
- Forward Proxy can bypass some browsing restrictions / firewalls
- Forward Proxy can block access to certain contents, by filtering them
- Forward Proxies require the Client to explicitly connect to them
  - But, there exists Transparent Proxies to redirect traffic to proxies automatically

### Reverse Proxy

A Reverse Proxy sits between the Internet and a Web Server. Reverse Proxy intercepts requires from clients and acts as a middleman between a User and a Web Server.

- Reverse Proxy can hide a website's IP address: makes it harder to DOS attack
- Reverse Proxy can act as a load balancer by distributing requests to different web servers
  - Services like CloudFare put a lot of Reverse Proxy servers all around the world
- Reverse Proxy caches static content
- Reverse Proxy can handle SSL encryptions on behalf of all the clients

> There can be many layers of reverse proxies.
> CloudFare + API Gateway / Load Balancer

> Nginx, Apache are popular reverse proxies.

#### Anycast

https://en.wikipedia.org/wiki/Anycast

Anycast is a method used for having many destination devices (which can be in different locations) share a _single IP address_.

This method is used by [Content Delivery Networks](#content-delivery-network-cdn) to serve content closer to end users to minimise latency.

### API Gateway

[Video: What is API Gateway?](https://www.youtube.com/watch?v=6ULyxuHKxg8)

Typically, handles:

- authentication and security policy enforcements
- load balancing and circuit breaking
- protocol translation and service discovery
- monitoring, logging, analytics and billing
- caching
- error handling
- logging / monitoring
- analytics

**Request flow**

1. Client sends request to the server (API Gateway acts as the entry point)
2. API Gateway validates the HTTP request
3. API Gateway checks the IP address against Allow-list, Deny-list
4. API Gateway can also act as basic Rate Limiter
5. API Gateway handles authentication and authorisation
6. API Gateway does Rate Limiting based on the user's authentication
7. API Gateway does Service Discovery to locate the correct backend service, by checking the path
8. API Gateway transforms the request into the appropriate protocol via Protocol Conversion
9. API Gateway forwards this transformed request to the appropriate service
10. API Gateway receives the response
11. API Gateway transforms the response into the public-facing protocol
12. API Gateway returns the transformed response to the client

## Content Delivery Network (CDN)

[Video: What is a CDN? How Does It Work?](https://www.youtube.com/watch?v=RI9np1LWzqw)

CDN brings content closer to the user by caching the site in a nearer (physical) location.

CDNs employ servers in various locations, called Point of Presence (PoPs). A server in a PoP is called an Edge Server.

There are different technologies for directing user requests to nearest PoP. For example: Amazon Cloudfront, Cloudfare, Akamai, Microsoft Azure CDN. They use [Anycast](#anycast) or DNS-based routing.

Edge Servers act as [Reverse Proxies](#reverse-proxy) with a content cache.

**Benefits**

Modern Edge Servers also do further optimisation, like mini-fication, or transforming file formats to more modern and web-friendly ones.

All TLS handshakes terminate at the edge server. This reduces the cost (remember that TLS handshakes require multiple back-and-forth round trips to establish). So, even for dynamic un-cacheable content, edge servers are used.

Edge Servers are more resilient to DDOS attacks by distributing the attack. This is even more effective with Anycast, because the server can re-direct requests to servers with a lower load.

### DNS-Based Routing

Each PoP has its own IP address. When the User looks up the IP address of the CDN, the DNS returns the IP address of the nearest / best PoP.

## Geospatial DB

[Video: FAANG System Design Interview: Design A Location Based Service (Yelp, Google Places)](https://www.youtube.com/watch?v=M4lR_Va97cQ)

For efficiently querying nearby locations.

### Hash-Based Solution (GeoHash)

1. Divide the world into 4 quadrants. Name them "00", "01", "10", "11". "0" for left/bottom. "1" for right/top. For example, the top left corner is "01".
2. Recursively divide each of these 4 quadrants until desired size is reached.
3. This very long binary string is typically converted into a base32 string for ease of storage and querying.
4. Index this column in the database for faster reads.

To query for nearby locations, typically will find the quadrant in O(1) and then find the 8 neighbouring quadrants in O(1) again. These will be the nearby locations.

Many libraries exist to convert GeoHash <-> latitude & longitude

**Relational Database**

Any relational database can handle this because it only requires a TEXT column!

Use compound key of (business_id, geohash) to allow for efficient removal of businesses.

### Tree-Based Solutions

- QuadTree (https://en.wikipedia.org/wiki/Quadtree)
  - Recursively sub-divide into 4 quadrants to form a 4-child tree.
- Google S2 Geometry (https://s2geometry.io/)
- RTree (https://en.wikipedia.org/wiki/R-tree)

In-memory data structures, **not** database solutions!

## Distributing Databases: Replication vs Sharding

Distributed databases are often handled via Load Balancers.

### Partitioning Data

- **Horizontal Partitioning**: split one table's rows into multiple different tables (partitions). Each partition has the exact same schema, but contains different rows.
- **Vertical Partitioning**: split columns into new, distinct tables, joined by foreign keys

### Cache Layer / DB Caching

https://en.wikipedia.org/wiki/Database_caching

Add a cache layer in front of the database to cache commonly queried data to minimise actual DB queries.

There are many ways to achieve this.

- in-memory
- redis
- primary database
- etc...

### DB Sharding

https://www.digitalocean.com/community/tutorials/understanding-database-sharding

Split the data into multiple smaller databases, called logical shards. Each shard contains a subset of the total data. Collectively, the shards hold the entire dataset.

Each data point might exist in more than 1 shard. There are some situations where this is useful: a table that contains conversion rate data.

Sharding is typically implemented at the application level. However, some DBMS have sharding capabilities built in.

#### Pros of Sharding

- Facilitates horizontal scaling: allows for adding more machines to spread out load
- Speed up query response times: with lesser rows, each shard can return the data faster (through concurrently checking)
- Minimise impact of outages: only some data is still not accessible

#### Cons of Sharding

- Complexity of properly sharding databases
  - Improper sharding can lead to data loss or corruption
  - More work has to be done to access and manage the data
- Unbalanced shards can defeat the benefits of sharding
- Difficult to return to "unsharded" architecture
- Not supported by every database engine

#### Sharding Architectures

**Key Based (Hash Based) Sharding**

Essentially, just hashing.

1. Compute a hash of each row, based on some determined candidate key (called shard key).
2. Place the rows into shards based on the hash of each row.

Shard keys chosen should ideally be static (don't change often over time).

Hash function must be chosen appropriately, otherwise shards can become very unbalanced.

Cons: hard to add/remove servers, because there is a need to re-balance everything, which leads to downtime.

_Consistent Hashing_: to counter the need to re-balance keys, by minimising movement of data on adding/removing shards

- hash (object key + server names) instead of (object key)
- only a small portion of the servers are affected on adding/removing servers
- "hash rings"

**Range Based Sharding**

Similar to key-based, but using range of values instead.
Very simple to implement but unfortunately, it often leads to unbalanced shards.

**Directory Based Sharding**

Similar to key based, but instead of a hash function, use a _lookup table_ instead.

It is the most flexible option out of the 3, but there is an additional lookup cost involved.

### DB Replication

https://www.integrate.io/glossary/what-is-database-replication/

https://www.indeed.com/career-advice/career-development/database-replication

Create partial or complete copies of a database.

Publisher Database -- (replicates to) -> Subscriber Databases

DDBMS - Distributed Database Management System

1. DDBMS replicates and distributes (syncs) data from the publisher database to the various subscriber databases.
2. DDBMS ensures changes are reflected in subscriber databases.

Change Data Capture (CDC) records the changes made to the publisher database. Then, the DDBMS applies these changes into the subscriber databases.

#### DB Replication Types

1. Transaction Replication: replicates transactions made in near-real-time
2. Snapshot Replication: captures a snapshot of data and overwrites on the subscriber database periodically; data is potentially outdated
3. Merge Replication: merges data from two or more databases into a receiving database; allows any of the databases to be modified; more complex to manage
4. Heterogeneous Replication: use the other types in combination

#### Pros of Replication

- Speed up read queries: can be read from any of the replicated servers; servers can be distributed across the world for lower latency
- Improve disaster recovery: there are many copies of the DB
- Improve reliability and uptime: even if one crashes, the full dataset is still available everywhere else

#### Pros of Full Replication

- Availability: all the data is available everywhere
- Consistency: data is kept consistent
- Security: redundancy allows for quicker recoveries from security breaches and data loss

#### Pros of Partial Replication

- Tailored access: allows for more fine-tuned access to each database; prevents unauthorised access and changes
- Faster updates
- Fewer resources

#### Cons of Replication

- Outdated data: data in subscriber databases might not be fully up to date
- Resource usage: naturally uses more resources than not replicating
- Complexity

## HTTP

[Video: SSL, TLS, HTTPS Explained](https://www.youtube.com/watch?v=j9QmMEWmcfo)

Hypertext Transfer Protocol

### HTTPS

Hypertext Transfer Protocol Secure

HTTP extended to be encrypted by SSL/TLS.

1. [TCP](#tcp) Handshake
2. Certificate Check
   1. Client Hello (Client -> Server) informs server of the following:
      - TLS version supported
      - Cyber suite supported: set of encryption algorithms
   2. Server Hello (Client <- Server)
      - Server chooses TLS version and cyber suite
   3. Certificate (Client <- Server)
      - Public key of server: used for asymmetric encryption
   4. Server Hello Done (Client <- Server)
   - Both the client and the server also refer to a trusted authority for authentication
     - The client verifies the server's SSL certificate this way
3. Key Exchange
   - Client comes up with the shared encryption key, encrypted with the server's public key
   - Server decrypts said encrypted key with its private key
   - Now, both sides hold the same encryption key
4. Data Transmission
   - Now, both sides transmit data encrypted with the shared encryption key

### SSL

https://www.cloudflare.com/en-gb/learning/ssl/what-is-ssl/

Secure Sockets Layer

SSL is the predecessor to [TLS](#tls). SSL is now deprecated and has not been updated since 1996, but people still refer to both technologies collectively as SSL/TLS.

### TLS

Transport Layer Security

Man-in-the-middle attack only can see encrypted data.

Refer to [HTTPS section](#https) for how it is used.

## Monolith, Multi-Tier, Microservices

[Video: Microservices explained in 5 minutes](https://www.youtube.com/watch?v=lL_j7ilk7rc) (high-level overview)

### Monolith

(UI + Business Logic + Data) all in 1 application.

- used to be the main way to build systems
- difficult to maintain, evolve and scale

### Multi-Tier

Separate different parts of the application into various tiers.

A common model is 3-tier Architecture:

1. Presentation Layer
   - Responsible for user interaction
   - Visual interface
2. Logic Layer
   - Responsible for business logic and processes relevant to business functions
3. Data Layer
   - Responsible for storing, accessing data

### Microservices

Split the application into smaller, independent microservices. Each microservice deals with a single service of the application.

Microservices communicate through either HTTP or message queues.

## Processes & Threads

[Video: Process vs Thread](https://www.youtube.com/watch?v=4rLW7zg21gI)

### Process

A process is an instance of an application / executable.

Processes are independent from each other.

Each process has its own:

- Processor registers (belonging to a thread)
- Program counters (belonging to a thread)
- Stack pointers (belonging to a thread)
- Memory pages

Each process will have at least one thread: the main thread.

CPUs perform Context Switching, by saving a process's state and loading another process's state to run different processes on one core. This is expensive.

Since Context Switching is expensive, there are other mechanisms like Fibers and Coroutines which are more efficient. However, these are more complex and generally require the application to manage the threads itself (instead of the OS).

### Thread

A thread is the unit of execution within a process.

Each thread has its own:

- Stack
- Registers
- Program counters

Threads within a Process share a memory address space. So, threads within a process can communicate. One malfunctioning thread can crash the entire process.

CPUs perform Context Switching on Threads too, similarly to Processes. Switching threads is generally faster than switching processes because there is no need to switch out memory pages.

### Go Goroutines

https://www.quora.com/What-is-difference-between-Goroutines-vs-OS-threads

Goroutines use `N:M` scheduling, where `N` goroutines are backed by `M` OS threads.

## CAP Theorem

aka Brewer's Theorem

[Video: CAP Theorem Simplified | System Design Fundamentals](https://www.youtube.com/watch?v=BHqjEjzAicA)

https://en.wikipedia.org/wiki/CAP_theorem

CAP Theorem refers to the fact that any _distributed system_ can only achieve _2 out of the 3_ guarantees of CAP.

**Consistency**: Every read receives the most recent write or an error.

**Availability**: Every request receives a (non-error) response, without the guarantee that it is the most recent write.

**Partition Tolerance**: System continues to operate regardless of the number of messages being dropped or delayed by the network between nodes.

When a network partition failure occurs, a decision must be made between:

- cancelling operation: choose consistency over availability
- proceed with operation: choose availability over consistency

> However, this "two out of three" concept is somewhat misleading because partitions are rare in most systems.

As an example, most traditional database systems with ACID guarantees consistency over availability. However, some NoSQL systems based around BASE philosophy choose availability over consistency.

## Go Contexts

https://www.digitalocean.com/community/tutorials/how-to-use-contexts-in-go

https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/context

`context` package in standard library!

Convention is to use `ctx` as the variable name and to use it as the _first_ parameter of every function.

### Empty Contexts

`context.TODO()` and `context.Background()` create "empty" contexts.

**Background**

> main function, initialisation, and tests, and as the top-level Context for incoming requests

**TODO**

> when it's unclear which Context to use or it is not yet available (because the surrounding function has not yet been extended to accept a Context parameter).

\* these are directly quoted from the library's documentation

### HTTP Requests

`http.Request` interface has a `Context()` function that returns the context of that request. It also ends if the client disconnects before the request is done.

### Context Values

Context can contain values, but it is not wise to use them as they are **untyped**!

Instead, explicitly pass the values as function parameters!

### Context Cancelling

`context.WithCancel(parent context.Context) (ctx context.Context, cancel context.CancelFunc)`

### Context Deadline

Similar to cancel, but provide a deadline where the context will be done.

`context.WithDeadline(parent context.Context, d time.Time) (context.Context, context.CancelFunc)`

### Context Timeout

Similar to deadline, but provide a duration instead of a time.

`context.WithTimeout(parent context.Context, timeout time.Duration) (context.Context, context.CancelFunc)`

### Context Done

`ctx.Done()` returns a `<-chan struct{}` that closes when the context is done.

```go
select {
case <-ctx.Done():
    // context is done!
    return
case result := <-data:
    // await data from channel
default:
    // if not using a data channel, use a default clause instead
}
```

### Context Errors

`ctx.Err()`

> If Done is not yet closed, Err returns nil. If Done is closed, Err returns a non-nil error explaining why: Canceled if the context was canceled or DeadlineExceeded if the context's deadline passed. After Err returns a non-nil error, successive calls to Err return the same error.

## KYC (Know Your Customer)

https://www.thalesgroup.com/en/markets/digital-identity-and-security/banking-payment/issuance/id-verification/know-your-customer

**Customer Identification** to fight against financial crime, money laundering, and fraud.

- Mandatory process of identifying and verifying the client's identity when opening an account and periodically over time
- Need to ensure that the customer is who they claim to be

## Database Normalisation / Denormalisation

### Database Normalisation

https://en.wikipedia.org/wiki/Database_normalization

1. Reduce database into normal form
2. Split table into multiple smaller tables, that when joined together will form the original table

- Reduces data redundancy
- Improves data integrity

### Database Denormalisation

https://en.wikipedia.org/wiki/Denormalization

Strategy used on a previously normalised database, aims to

- Improve read performance (because joins are slow)
- At expense of losing write performance, by adding redundant copies of data or grouping data
  - Need to ensure that redundant data is kept consistent
- **Not** the same as an un-normalised database!

Simple forms of denormalisation

- Keep track of the count of a particular data (e.g. number of Groups a User has)
  - Useful for one-to-many relationship
- Adding attributes to a relation from another relation, which it is joined to

#### Methods to Denormalise

1. Keep logical design normalised, but allow DBMS to store additional redundant information to optimise query responses: DBMS is responsible for ensuring that redundant data is kept consistent.
   1. Can use Views in SQL to achieve this
2. Denormalise the logical data design: database designer's responsibility to ensure that the database remains consistent.

## Other Resources

[Article: The complete guide to System Design](https://www.educative.io/blog/complete-guide-to-system-design): Short introductions to a lot of topics, but with links to more in-depth content (some of which are paid content).

[Article: The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html): Talks about various types of testing and how to effectively utilise them.
