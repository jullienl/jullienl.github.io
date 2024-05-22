---
layout: post
title: "Automating IT Operations with Compute Ops Management Webhooks"
categories: Compute Ops Management
image: /assets/images/COM-Webhooks/Webhooks-Title.jpg
# excerpt: Harnessing the Power of Webhooks for Real-Time Event Handling
tags: 
  - GreenLake
  - COM  
mermaid: true
---


In today's fast-paced digital landscape, operational efficiency isn't just nice to have; it's a cornerstone of success. But what if I told you there's a secret weapon that can turbocharge your operational processes? Enter webhooks—an incredibly powerful tool when integrated with HPE GreenLake for Compute Ops Management (COM).

Imagine having a high-powered alert system not just sounding alarms, but also triggering actions in real-time. That's exactly what webhooks do! They're like digital workhorses, tirelessly communicating between applications and kicking off automated workflows with precision.

Now, let's peel back the layers to discover how this impacts organizations like yours.


## What are webhooks?

At their core, webhooks are automated messages sent from apps when something happens. They're a way for apps to communicate and pass information along instantly, setting off a chain reaction of tasks without the need for manual intervention.


## The magic of automation

With Compute Ops Management, webhooks offer a seamless avenue for triggering events across your systems. When a specific event occurs—be it an outage, a new alert raised or a new server connection—webhooks spring into action, notifying your other tools and services, and initiating predefined operations tasks.

This integration translates to fewer hours lost to manual monitoring and more time reclaimed for innovation and strategy. It’s about letting technology take the wheel when it comes to routine, yet critical, tasks.

Take a common webhook use case: If a server unexpectedly goes offline—whether due to manual intervention or an automated script—a webhook can react immediately by dispatching an email notification to the relevant personnel and concurrently logging an incident in a designated database. This proactive approach ensures that teams are promptly alerted, allowing for swift action and minimizing potential downtime or disruptions.

In a webhook scenario, there is typically a source application (i.e., Compute Ops Management) that sends event notifications to a webhook endpoint (the destination URL) which is set up to receive and process these events.   
 
<div class="mermaid">
graph LR;
    A["`**Compute Ops Management**
    [Source application]`"]
    B["`**Destination Application**
    [Webhook endpoint]`"];
    A--Webhook<br>(resource data)-->B
</div>   
<br/>
   
Here's a simple sequence diagram that illustrates a webhook process with COM:   
<br/>

<div class="mermaid">
sequenceDiagram
    autonumber
    actor User as User
    participant SourceApp as Compute Ops Management
    participant WebhookURL as Destination application<br>[Webhook endpoint]
    participant Handler as Event Handler

    User->>SourceApp: Perform action
    Note over SourceApp: Trigger event
    SourceApp->>WebhookURL: POST /event
    WebhookURL->>Handler: Invoke handler
    Handler->>WebhookURL: Process event
</div>
<br/>

Description of the different steps:

1. **Initiating the Process**   
A user starts interacting with Compute Ops Management or a specific state change occurs within the application, this is the point at which a webhook journey starts.

2. **The Trigger Event**   
As soon as a user performs an action or a specific state change occurs within the application, an event is triggered within Compute Ops Management. This event could be any number of activities pre-defined by the administrator as noteworthy—ranging from the deletion of a server group to the completion of a server firmware update, the addition of a new server, or the occurrence of unplanned events such as a server failure or an alert.

3. **Sending the Notification**   
The next step is crucial. Once an event occurs, Compute Ops Management—the source application—formulates an HTTP POST request. This request contains information about the event, essentially providing the most recent representation of the resource associated with that event. This POST request is directed towards a specific URL—the webhook URL—which is pre-configured to listen for such calls.

4. **Processing the Event**   
Upon receiving the POST request, the destination application at the webhook URL kicks into action. An event handler takes over, which is essentially a piece of code designed to process the incoming data. This handler might update a database, send out notification emails, or trigger other workflows as required.

5. **Completing the Loop**   
After the event has been processed according to the instructions laid out in the event handler, the loop comes to a close. The workflow ends until a new event is triggered, and the process starts all over again.




## Available resources in Compute Ops Management

The concept of available resources in the context of webhooks refers to the different types of events or actions within an application or service that a webhook can be configured to listen for. With Compute Ops Management, you can be set up webhooks to monitor a large range of event resources such as servers, alerts, groups, server settings, jobs, compliance checks, and firmware bundles. 

  > The process of creating webhooks in Compute Ops Management and the various resource types that are available are documented in the [API documentation](https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/webhooks/overview/). 


For each resource, certain specific properties are capable of initiating the dispatch of a webhook. These triggers are detailed in the table below:

<table>
<thead>
<tr>
<th align="left">Resource Type</th>
<th align="center">API Documentation</th>
<th align="center">Monitorable Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">compute-ops/server</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_server_by_id/">Get v1beta2 server by ID</a></td>
<td align="center"><code class="language-text">hardware</code>, <code class="language-text">state</code>, <code class="language-text">firmwareInventory</code>, <code class="language-text">softwareInventory</code>, <code class="language-text">lastFirmwareUpdate</code>, <code class="language-text">tags</code>, <code class="language-text">autoIloFwUpdate</code></td>
</tr>
<tr>
<td align="left">compute-ops/alert</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_server_alerts/">Get v1beta2 server alerts</a></td>
<td align="center">N/A - no specific properties can be monitored. Will only send <code class="language-text">Created</code> and <code class="language-text">Deleted</code> events</td>
</tr>
<tr>
<td align="left">compute-ops/group</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_group_by_id/">Get v1beta2 group by ID</a></td>
<td align="center"><code class="language-text">name</code>, <code class="language-text">autoFwUpdateOnAdd</code>, <code class="language-text">groupComplianceStatus</code>, <code class="language-text">serverSettingsUris</code>, <code class="language-text">devices</code>, <code class="language-text">serverPolicies</code>, <code class="language-text">autoAddServerTags</code></td>
</tr>
<tr>
<td align="left">compute-ops/server-setting</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta1_server_settings_by_id/">Get v1beta1 server settings by ID</a></td>
<td align="center"><code class="language-text">name</code>, <code class="language-text">settings</code></td>
</tr>
<tr>
<td align="left">compute-ops/job</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta3_job_by_id/">Get v1beta3 job by ID</a></td>
<td align="center"><code class="language-text">state</code></td>
</tr>
<tr>
<td align="left">compute-ops/group/compliance</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_compliance_by_compliance_id/#!c=200&#x26;path=id&#x26;t=response">Get v1beta2 compliance by compliance ID</a></td>
<td align="center"><code class="language-text">complianceStatus</code></td>
</tr>
<tr>
<td align="left">compute-ops/firmware-bundle</td>
<td align="center"><a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_firmware_bundle_by_id/">Get v1beta2 firmware bundle by id</a></td>
<td align="center"><code class="language-text">advistories</code>, <code class="language-text">isActive</code></td>
</tr>
</tbody>
</table>

 > More information about these monitorable properties can be found in the related API documentation which is linked in this table.



## Filtering options

When setting up webhooks in Compute Ops Management, it is mandatory to specify filters using the `eventFilter` property. These filters determine which event payloads the webhook will transmit to its designated endpoint. The webhook operates on an opt-in basis, meaning that only events that align with the criteria defined in the `eventFilter` are dispatched to the receiving URL.

The following example illustrates a typical `POST` request payload that includes five mandatory attributes required to define a webhook via the COM API:
```json
{
  "name": "Webhook for any server events whose health summary transitions out of an OK state",
  "destination": "https://webhook-test.com/baea2fa0f8be4d546445c98253392058",
  "state": "ENABLED",
  "eventFilter": "type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True",
  "headers": {
  }
}
```

Filters defined by the `eventFilter` property can be based on various attributes such as:

- **Event types**: Using expressions like `type eq` to match on the resource type.
- **Event operations**: Specifying the operation with `operation eq Created`, `Deleted`, or `Updated`.
- **Event changes**: Indicating modifications with `new`, `old`, and `changed` which relate to custom fields in the API's payload structure.

The specifics of these filter attributes are described in the following table:


<table>
<thead>
<tr>
<th>Property</th>
<th>Description</th>
<th>Example Values</th>
<th>Example <em>eventFilter</em></th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><code class="language-text">type</code></td>
<td>Allows matching on <a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/webhooks/resources/#resource-types">resource types</a></td>
<td><code class="language-text">compute-ops/job</code>, <code class="language-text">compute-ops/server</code></td>
<td><code class="language-text">type eq 'compute-ops/job'</code></td>
<td>Match all events related to jobs</td>
</tr>
<tr>
<td><code class="language-text">operation</code></td>
<td>Allows matching on different operations</td>
<td><code class="language-text">Created</code>, <code class="language-text">Deleted</code>, <code class="language-text">Updated</code></td>
<td><code class="language-text">type eq 'compute-ops/alert' and operation eq 'Created'</code></td>
<td>Match all events related to created alerts</td>
</tr>
<tr>
<td><code class="language-text">changed</code></td>
<td>Allows matching on <a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/webhooks/resources/#resource-types">monitorable properties</a> if the value has changed</td>
<td><code class="language-text">changed/name</code>, <code class="language-text">changed/state</code></td>
<td><code class="language-text">type eq 'compute-ops/group' and changed/name eq True</code></td>
<td>Match any events related to groups whose <code class="language-text">name</code> property changed</td>
</tr>
<tr>
<td><code class="language-text">new</code></td>
<td>Allows matching on <a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/webhooks/resources/#resource-types">monitorable properties</a> of the current state of the resource</td>
<td><code class="language-text">new/complianceStatus</code>, <code class="language-text">new/isActive</code></td>
<td><code class="language-text">type eq 'compute-ops/group' and new/groupComplianceStatus ne 'Compliant'</code></td>
<td>Match any events related to groups whose <code class="language-text">groupComplianceStatus</code> is not currently <code class="language-text">Compliant</code></td>
</tr>
<tr>
<td><code class="language-text">old</code></td>
<td>Allows matching on <a href="https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/webhooks/resources/#resource-types">monitorable properties</a> of the previous state of the resource</td>
<td><code class="language-text">old/devices</code>, <code class="language-text">old/settings</code></td>
<td><code class="language-text">type eq 'compute-ops/group' and old/name eq 'Group Name'</code></td>
<td>Match any events related to a group whose previous <code class="language-text">name</code> was "Group Name" until the group's name is changed again</td>
</tr>
<tr>
<td><code class="language-text">name</code></td>
<td>Alias for <code class="language-text">new/name</code></td>
<td></td>
<td><code class="language-text">type eq 'compute-ops/group' and name ne 'New Group'</code></td>
<td>Match any events related to groups whose current <code class="language-text">name</code> is not "New Group"</td>
</tr>
</tbody>
</table>


### New and Old

`new` and `old` can be employed to determine when to trigger webhooks based on changes in data. These filters can be used to monitor for specific updates or modifications that occur.

When an event occurs that modifies data, the system can look at the `new` state (the updated data) and the `old` state (the data before it was updated). Using these two snapshots, you can apply filters to decide whether to fire a webhook.

Suppose a group named "Group1" is created at the initial stage (referred to as event 0) and then, after a sequence of n events, its name is altered to "Group2". Using a filter with criteria such as `type eq 'compute-ops/group'` combined with `new/name eq 'Group1'`, you would capture all events from the start (event 0) up to but not including the event where the change occurs (event n-1). In contrast, if the filter is set to `old/name`, it targets a different set of events, in this case from event 1 through to the event where the update happens (event n).


### OData style filters

Filters use OData style filters as described in the [HPE GreenLake specification](https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/guide/#filtering). 

The general syntax for an OData filter looks like `property op value` with:
- `property` refers to the field or property to filter on in the entity.
- `op` is the operator, such as `eq` (equals), `ne` (not equal), `gt` (greater than), `ge` (greater or equal), `lt` (less than), `le` (less or equal), etc.
- `value` is the value to compare against the property.

Logical Operators can also be used to combine conditions using `and`, `or`, and `not`. The nesting separator to specify a nested resource is `/` (e.g. `property eq 'compute-ops/group'`).


### Filter examples

Filtering with OData allows for both simple and complex querying possibilities, here are some examples:

- **To receive webhooks for group and server events only**:  
 
  ```txt
  type eq 'compute-ops/group' or type eq 'compute-ops/server'
  ```
  => Match all group and server events


- **To receive webhooks for all servers that are shut down**:   
 
  ```txt
  type eq 'compute-ops/server' and old/hardware/powerState eq 'ON' and changed/hardware/powerState eq True
  ```
  => Match any server events whose power state transitions from `ON` to `OFF`

  **Note**: Make sure that the Boolean value `True` is used without quotes, as it represents a logical Boolean change (`True` or `False`) for the `powerState` property. `old` specifies the previous state of the `powerState` property (`ON`).


- **To receive webhooks for all servers that get disconnect from Compute Ops Management**:   
  
  ```txt
  type eq 'compute-ops/server' and old/state/connected eq True and changed/state/connected eq True
  ```

  => Match any server events whose connected state transitions from `True` to `False`

  **Note**: The `connected` property of the servers API is a Boolean as indicated in the [API reference](https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/get_v1beta2_server_by_id/#tag/servers-v1beta2/operation/get_v1beta2_server_by_id!c=200&path=state&t=response), therefore ensure you use the Boolean value `True` without enclosing it in quotation marks as they represent Boolean literals for both expressions because quotation marks would indicate a string type rather than a Boolean type:

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-1.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-1.png){:class="body-image-post"}{: data-lightbox="gallery"}
  

- **To receive webhooks for all jobs that run a server firmware update**:

  ```txt
  type eq 'compute-ops/job' and contains(name, 'FirmwareUpdate.New') and new/state eq 'RUNNING'
  ```

  => Match any firmware update job events that have a new `state` set to `RUNNING`


- **To receive webhooks for all servers that transition to an unhealthy status**:

  ```txt
  type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True
  ```

  => Match any server events whose health summary transitions out of an `OK` state


- **To receive webhooks for all events within a specified group**:

  ```txt
  type eq 'compute-ops/group' and contains(name, 'Production')
  ```

  => Match all group events that have a `name` containing "Production"


- **To receive webhooks for all new firmware bundles that are available**:

  ```txt
  type eq 'compute-ops/firmware-bundle' and operation eq 'Created'
  ```

  => Match all events related to created firmware bundles

- **To receive webhooks for all servers added to COM that require activation**:

  ```txt
  type eq 'compute-ops/server' and operation eq 'Created'
  ```

  => Match any events related to servers that are assigned to a COM instance but with iLOs not connected to COM

- **To receive webhooks for all new servers added and connected to COM**:

  ```txt
  type eq 'compute-ops/server' and old/state/connected eq False and changed/state/connected eq True
  ```

  => Match any server events whose connected state transitions out of a `false` state, which occurs after the iLO establishes a connection with COM



## Secure handshake mechanism

Compute Ops Management uses webhook verification through challenges in headers. This is a common security measure used by providers to verify the receiver's endpoint authenticity before starting to send webhook data. 

Here's an overview of typical API request interactions that take place between Compute Ops Management and a webhook endpoint when a user initiates webhook creation:
<br>

<div class="mermaid">
sequenceDiagram
    autonumber
    actor User 
    participant SourceApp as Compute Ops Management
    participant WebhookURL as Destination<br>(webhook receiver's endpoint)

    User->>SourceApp: POST /webhooks
    Note right of User: Webhook creation<br>with among others<br>destination and filter <br>in json payload
    SourceApp->>User: 201 Created
    Note left of SourceApp: Acknowledge creation response<br>Returns webhook id<br>and webhook status as `PENDING`
    SourceApp->>WebhookURL: Verification GET Request (Challenge)
    Note right of SourceApp : Send request with a verification header:<br> x-compute-ops-mgmt-verification-challenge:&lt;token&gt;
    WebhookURL->>SourceApp: Challenge response
    Note left of WebhookURL : Response must return:<br>verification:&lt;token&gt;<br>content-type: application/json<br>status code: 200
    User->>SourceApp: GET /webhooks/&lt;id&gt;
    Note right of User: Retrieve webhook &lt;id&gt; information 
    SourceApp->>User: webhook data response
    Note left of SourceApp: Returns webhook status as `ACTIVE`
</div>
<br>


Description of the different requests:

- **Stage 1**: Webhook creation ([API Reference](https://developer.greenlake.hpe.com/docs/greenlake/services/compute-ops-mgmt/public/openapi/compute-ops-mgmt-latest/operation/post_v1beta1_webhooks/))

    - `POST` **Request**: Compute Ops Management offers an API that lets you register your webhook endpoint by sending a POST request containing the URL of your webhook listener, the events you wish to subscribe to, a name, a state and a header:

      
      ```
      POST /compute-ops-mgmt/v1beta1/webhooks
      Content-Type: application/json
      ```
      ```json
        {
            "name": "Webhook event for servers that get unhealthy",
            "destination": "https://hook.eu2.make.com/4wt8t3dswckl1s7hm98jilgv5fg6p",
            "state": "ENABLED",
            "eventFilter": "type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True",
            "headers": {
            }
        }
      ```

      > When creating a webhook, five attributes are mandatory however it is not necessary to include extra headers so the `headers` field can be defined as an empty object `{}` at the time of creation.

- **Stage 2**: Creation confirmation response

    - Compute Ops Management acknowledges the creation and sends back a confirmation response. This response includes a `"status": "PENDING"` and an `id` associated with the webhook creation.

      ```http
      HTTP/1.1 201 Created
      ```
      ```json
        {
            "name": "Webhook event for servers that get unhealthy",
            "destination": "https://hook.eu2.make.com/4wt8t3dswckl1s7hm98jilgv5fg6p",
            "state": "ENABLED",
            "eventFilter": "type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True",
            "type": "compute-ops-mgmt/webhook",
            "id": "200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "generation": 1,
            "createdAt": "2024-04-16T15:22:58.205785Z",
            "updatedAt": "2024-04-16T15:22:58.245366Z",
            "status": "PENDING",
            "statusReason": "User enabled the webhook.",
            "resourceUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "deliveriesUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348/deliveries"
        }
      ```

- **Stage 3**: Verification Challenge

    - `GET` **Request** / **Challenge-Response**: Compute Ops Management sends a verification challenge to ensure the endpoint is valid before sending actual event data. The challenge involves the webhook endpoint responding with a specific body that includes the challenge string.

       ```
       GET https://hook.eu2.make.com/4wt8t3dswckl1s7hm98jilgv5fg6p
       Header: x-compute-ops-mgmt-verification-challenge: <verification_value>
       ```

- **Stage 4**: Challenge response

    - The webhook endpoint responds to the verification challenge by returning the challenge parameter received in the GET request. This confirms to Compute Ops Management that the endpoint is prepared to receive events.

      ```http
      HTTP/1.1 200 OK
      Content-Type: application/json
      ```
       ```json
        {
            "verification": "<verification_value>"
        }
       ```

       >  If the endpoint fails to respond with a response body containing the verification key and the corresponding string from the header, the webhook handshake will fail, leaving the webhook disabled.

- **Stage 5**: Webhook verification 

    - `GET` **Request**: The user retrieves webhook details using `id`, the webhook identifier associated with webhook creation.

       ```
       GET /compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348
       ```

- **Stage 6**: Webhook data response
   
   - After a successful handshake, the Compute Ops Management response to the webhook GET request is:

     ```http
     HTTP/1.1 200 OK
     ```
     ```json
       {
           "name": "Webhook event for servers that get unhealthy",
            "destination": "https://hook.eu2.make.com/4wt8t3dswckl1s7hm98jilgv5fg6p",
            "state": "ENABLED",
            "eventFilter": "type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True",
            "type": "compute-ops-mgmt/webhook",
            "id": "200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "generation": 1,
            "createdAt": "2024-04-16T15:22:58.205785Z",
            "updatedAt": "2024-04-16T15:22:58.245366Z",
            "status": "ACTIVE",
            "statusReason": "Webhook handshake accepted.",
            "resourceUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "deliveriesUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348/deliveries"
        }
       ```

       > The webhook transitions to a `state` of `ENABLED` and a `status` of `ACTIVE` when the endpoint successfully responds with the expected verification body and returns a `200` status code.
         In addition, `statusReason` indicates `Webhook handshake accepted.`


    - After an unsuccessful handshake, the response is:

      ```http
      HTTP/1.1 200 OK
      ```
      ```json
      {
           "name": "Webhook event for servers that get unhealthy",
            "destination": "https://hook.eu2.make.com/4wt8t3dswckl1s7hm98jilgv5fg6p",
            "state": "DISABLED",
            "eventFilter": "type eq 'compute-ops/server' and old/hardware/health/summary eq 'OK' and changed/hardware/health/summary eq True",
            "type": "compute-ops-mgmt/webhook",
            "id": "200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "generation": 1,
            "createdAt": "2024-04-16T15:22:58.205785Z",
            "updatedAt": "2024-04-16T15:22:58.245366Z",
            "status": "WARNING",
            "statusReason": "Incorrect handshake response.",
            "resourceUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348",
            "deliveriesUri": "/compute-ops-mgmt/v1beta1/webhooks/200039ff-0c27-4d1f-aa7b-791d40dc4348/deliveries"
        }
      ```

        > The webhook transitions to a `state` of `DISABLED` and a `status` of `WARNING` when the endpoint fails to respond with the expected body or when it returns a non-200 status code. 
          In addition, `statusReason` indicates `Incorrect handshake response.`


## Integrating COM webhooks with automation tools

To manage webhook events, you can use any programming language—such as Node.js, Python, or PHP—to set up a server that listens for webhook events. Alternatively, you can use tools like Zapier or Make (formerly known as Integromat), which have become very popular in the no-code/low-code arena. There are also solutions available from major providers like Google Cloud, Amazon Web Services (AWS), and Microsoft Azure.

Typical scenarios involving these tools include responding to server lifecycle events (e.g., startup, shutdown), auto-provisioning actions based on new server connections, handling maintenance notifications (such as when new firmware bundles are released), and deploying server updates. These tools help automate responses to webhooks for operational efficiency and provide real-time updates within the IT infrastructure.

When an event occurs—for instance, a server shutdown—Compute Ops Management sends a webhook to the configured endpoint with details. The receiver can then:

- Log the event in a third-party application like a CSV file, Google Sheets, Notion database, Airtable, etc.
- Send alerts via email, SMS, or chat applications such as Slack
- Trigger backup procedures
- Scale down operations in a load balancer
- Create a record in ServiceNow

And more - there are numerous potential applications!

### A step-by-step workflow creation guide with Make

To illustrate this, let's explore how to create a typical workflow using Make (formerly known as Integromat). 

Make is a powerful no-code/low-code automation tool that greatly enhances Compute Ops Management's webhook capabilities to streamline and automate workflows without requiring extensive coding knowledge. With its intuitive visual interface, complex integrations between various online services become much simpler, significantly reducing the time spent on manual tasks.

[![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-5.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-5.png){:class="body-image-post"}{: data-lightbox="gallery"}  


> Despite being no-code friendly, Make doesn't compromise on complexity. It supports multi-step integrations, enabling users to craft detailed processes that perform several actions across different platforms seamlessly.

The multifaceted automated workflow must handle the initial validation challenge issued during the setup of the COM webhook but also execute several actions each time a webhook is triggered by a server shutdown event. The workflow will include the following actions:
- Dispatch an email notification containing information about the impacted server to a designated inbox.
- Post an update to a specified Slack channel, detailing the shutdown server.
- Create a new record in a Notion database, cataloguing particulars of the affected server.

The following steps describe how to implement this scenario in Make:
<a name="1-setup-your-make-account"></a>

1. **Setup your Make account**
   
   - Sign in to your Make account.
   
   - If you don’t have an account, create one from [https://www.make.com/en](https://www.make.com/en).   

     > Make offers a free plan that includes 1,000 operations per month. This can be a good option if you're looking to test your COM webhooks. The operations quota can comfortably accommodate testing your COM webhook setup to see how the integration works and ensure that your workflow is correctly configured.  If your testing phase or ongoing usage consumes more than the allotted operations, you may need to consider upgrading to a higher-tier plan.
   <br>
<a name="2-create-a-new-scenario"></a>

2. **Create a new scenario**
  
   - Go to the Scenarios section and click on **Create a new scenario**.   
   <br>
<a name="3-search-and-add-the-webhooks-module"></a>

3. **Search and add the webhooks module**
   
   - Search for the Webhooks module then select **Custom webhook** and add it to the scenario.
      
     [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-3.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-3.png){:class="body-image-post"}{: data-lightbox="gallery"}  
 <br> 
<a name="4-configure-the-webhook-trigger"></a>

4. **Configure the webhook trigger**

   - Click on **Create a webhook** in the Webhooks module.

     [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-4.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-4.png){:class="body-image-post"}{: data-lightbox="gallery"}  

   - Set up the webhook by giving it a name and click on **Show advanced settings** and turn the **Get request headers** to **Yes**.
    
     [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-6.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-6.png){:class="body-image-post"}{: data-lightbox="gallery"}  

   - Save it to get the unique URL then copy the webhook URL by clicking on **Copy address to clipboard** then click **OK**.
    
     [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-7.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-7.png){:class="body-image-post"}{: data-lightbox="gallery"}  
   <br>
<a name="5-run-the-webhooks-module-once"></a>

5. **Run the webhooks module once**

    - Click on the **Run once** button. This action is necessary to capture the data structure that will be transmitted by COM when you create the webhook in the following step.  
      
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-12.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-12.png){:class="body-image-post"}{: data-lightbox="gallery"}  
  <br>
<a name="6-create-the-webhook-using-the-com-api"></a>

6. **Create the webhook using the COM API**

    - While the module in Make awaits incoming data, proceed with the following steps using your preferred tool or programming language:

        1. Construct a COM API request.
        2. Use the webhook URL you copied in step 4 as the destination attribute.
        3. Apply the proper filter for server shutdown events. This filter should include:
           - The server resource type.
           - The state change of the powerState property.

       The request should use: 

        ```
        POST /compute-ops-mgmt/v1beta1/webhooks
        Content-Type: application/json
        ```
        ```json
          {
              "name": "Webhook event for server shutdown",
              "destination": "<PASTE THE WEBHOOK URL COPIED EARLIER IM MAKE>",
              "state": "ENABLED",
              "eventFilter": "type eq 'compute-ops/server' and old/hardware/powerState eq 'ON' and changed/hardware/powerState eq True",
              "headers": {
              }
          }
        ```

    
        > For this step, you can refer to my Postman public collection for Compute Ops Managment. In the [Webhooks](https://www.postman.com/jullienl/workspace/lionel-jullien-s-public-workspace/folder/991177-71b32a6f-361a-4ac5-88fc-27975cad01f9) folder, you'll find several examples of webhook creation requests including the webhook for server shutdown events.

        >   [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-11.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-11.png){:class="body-image-post"}{: data-lightbox="gallery"}  

        > These examples should assist you in creating your own webhooks successfully.

    - Send the request to create the webhook. Verify that the COM API responds with a `201 Created` status code, indicating successful creation. The response body should indicate a status of `PENDING`.
      
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-8.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-8.png){:class="body-image-post"}{: data-lightbox="gallery"}   

    - Ensure you record the Webhook ID returned by the webhook creation request. You will need this ID later to update the webhook in order to renegotiate the handshake.
    
        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-20.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-20.png){:class="body-image-post"}{: data-lightbox="gallery"}  
      
        > **Note**: If you run a `GET /compute-ops-mgmt/v1beta1/webhooks/<webhook-id>`, you should notice that the webhook status is set to `WARNING` with the reason being an `Incorrect handshake response`. This behavior is expected because Make has not responded with the verification challenge as COM anticipates. Steps 7 and 8 are designed to address this issue.

        >  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-21.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-21.png){:class="body-image-post"}{: data-lightbox="gallery"}  


    - In Make, check that the Run once task has stopped and that the webhooks module has turned green, indicating that data has been received.

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-14.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-14.png){:class="body-image-post"}{: data-lightbox="gallery"}  
  <br>
<a name="7-create-a-variable-to-capture-the-verification-challenge-sent-by-com"></a>

7. **Create a variable to capture the verification challenge sent by COM**

    - Click on **+** to add another module 

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-9.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-9.png){:class="body-image-post"}{: data-lightbox="gallery"}  

    - Search for the Tools module then select **Set variable**
    
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-10.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-10.png){:class="body-image-post"}{: data-lightbox="gallery"}  

    - Enter **verification** as the variable name and for the variable value, enter:
      
      \{\{get(toCollection(;&quot;name&quot;;&quot;value&quot;); &quot;x-compute-ops-mgmt-verification-challenge&quot;)\}\}

      > The `toCollection()` function is being called with arguments. This function converts the HTTP header object into a collection for easier access. The `get()` is used to retrieve the value of `x-compute-ops-mgmt-verification-challenge` available in the header collection.
      
        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-15.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-15.png){:class="body-image-post"}{: data-lightbox="gallery"}  
    
    - Click just after `toCollection(`:
  
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-24.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-24.png){:class="body-image-post"}{: data-lightbox="gallery"}
          

    - Click on the `Headers[]` item from the Make mapping pane:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-25.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-25.png){:class="body-image-post"}{: data-lightbox="gallery"}

      > The Make mapping pane allows users to connect data outputs from one module to inputs in another. It enables drag-and-drop functionality for easy mapping, and supports the use of functions and formulas to manipulate data as it moves between modules. This feature is central to creating workflows that automate tasks by integrating various apps and services within Make scenarios.

      > `Headers[]` represents the variable holding headers from the first module, the Webhooks module. This is where the verification challenge sent by COM is found.

    - Click on **OK**:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-26.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-26.png){:class="body-image-post"}{: data-lightbox="gallery"}   
      
    - Click on **Run once** 

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-27.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-27.png){:class="body-image-post"}{: data-lightbox="gallery"} 
  <br>
<br>
<a name="8-renegociate-the-webhook-handshake-to-set-the-variable"></a>

8. **Renegotiate the webhook handshake to set the variable**

    - For the moment, the `verification` variable just set is not populated, and you need to ask COM to renegotiate the handshake again. To do so, you have to modify the existing webhook by sending a `PATCH` request with the previously used payload, targeting the webhook ID recorded earlier:

        ```
          PATCH /compute-ops-mgmt/v1beta1/webhooks/<webhook-id>
          Content-Type: application/merge-patch+json
        ```
        ```json
            {
              "name": "Webhook event for server shutdown",
              "destination": "<PASTE THE WEBHOOK URL COPIED EARLIER IM MAKE>",
              "state": "ENABLED",
              "eventFilter": "type eq 'compute-ops/server' and old/hardware/powerState eq 'ON' and changed/hardware/powerState eq True",
              "headers": {
              }
            }
        ```
    
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-31.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-31.png){:class="body-image-post"}{: data-lightbox="gallery"}

    - Once the request has been sent, return to the Make interface and verify that the execution stopped and the status of all modules is green:
  
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-28.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-28.png){:class="body-image-post"}{: data-lightbox="gallery"}

    - You can click on the output details and verify that the `verification` variable value is now populated:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-29.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-29.png){:class="body-image-post"}{: data-lightbox="gallery"}  
  <br>
<a name="9-use-the-verification-challenge-in-the-webhook-response"></a>

9. **Use the verification challenge in the webhook response**

    - In the next step, you need to add another module that will generate the response expected by COM. From the Tools module, click on **+** and add the **Webhook response** module.

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-16.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-16.png){:class="body-image-post"}{: data-lightbox="gallery"}

    - Leave the status as **200**. Click on the body field, and enter:
    
        {&quot;verification&quot;: &quot;&quot;}
    
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-17.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-17.png){:class="body-image-post"}{: data-lightbox="gallery"} 

    - Then drag and drop `verification` from the Make mapping pane between the last two quotes:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-30.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-30.png){:class="body-image-post"}{: data-lightbox="gallery"} 

    - Click on **Show advanced settings** then **Add item** then enter the following header: 
      - Key: `content-type` 
      - Value: `application/json`   
      <br>
      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-18.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-18.png){:class="body-image-post"}{: data-lightbox="gallery"}   
    <br>
    - Click on **OK** then click on **Run once** 

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-22.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-22.png){:class="body-image-post"}{: data-lightbox="gallery"}
 <br>
<br>
<a name="10-renegociate-the-webhook-handshake-to-generate-the-response"></a>

10. **Renegotiate the webhook handshake to generate the response**

      - The Make scenario is now ready to return the verification challenge key to COM to enable the handshake mechanism. To force renegotiation, you can run the PATCH request again using the same payload content targeting the same webhook ID.

        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-32.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-32.png){:class="body-image-post"}{: data-lightbox="gallery"}

      - Once the `PATCH` request has been executed, return to Make and verify that all modules are displaying a green status and that the response body now includes the verification token:

        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-33.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-33.png){:class="body-image-post"}{: data-lightbox="gallery"}
 <br>
<br>
<a name="11-check-the-webhook-status-in-com-optional"></a>

11. **Check the webhook status in COM (optional)**

      - To verify that the webhook status is now `ACTIVE`, you can perform a `GET` request:

    
        ```
          GET /compute-ops-mgmt/v1beta1/webhooks/<webhook-id>
        ```

        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-35.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-35.png){:class="body-image-post"}{: data-lightbox="gallery"}
 <br>
<br>
<a name="12-configure-a-variable-to-store-the-server-tags"></a>

12. **Configure a variable to store the server tags**
      
      The webhook data that Make will receive from COM will include server resource data, including Tags information. 
      
      Server tags are a form of metadata used in COM to categorize and organize server resources. It serves an essential role in facilitating the search, filter, and management of resources according to various specified criteria, such as purpose, owner, environment, among others. The `tags` property is structured into key-value pairs as shown below:

      ```json
        "tags": {
                      "Location": "Houston",
                      "Owner": "James"
                }
      ```
      Given the importance of tags in facilitating server identification, it's clear that our Make scenario must include a mechanism to process tag information found within the server resource. 
      
       > Toward the end of this blog, I'll demonstrate an enhanced scenario utilizing tags.

      This process will involve converting the key-value pair structure into a human-readable text format, which might look like the following:

      ```text
      Tag1:Location/Houston
      Tag2:Owner/James
      ```     
      
      To do this, you need to add 3 modules:

      1. Transform the tags structure into an array: 
      
          - Add the module **Tools**: **Set variable**.

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-46.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-46.png){:class="body-image-post"}{: data-lightbox="gallery"}
          
          - For the variable name, enter `tagsArray` and for the value `{% raw %}{{toArray(1.tags)}}{% endraw %}`.

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-47.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-47.png){:class="body-image-post"}{: data-lightbox="gallery"}

      2. Split the array into individual elements: 
      
          - Add the module **Iterator**.

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-48.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-48.png){:class="body-image-post"}{: data-lightbox="gallery"}
          
          - In the Array field, drag and drop the `tagsArray` variable from module `4`:

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-49.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-49.png){:class="body-image-post"}{: data-lightbox="gallery"}

      3. Combine multiple tag items into a single text block: 
      
          - Add the module **Tools**: **Text aggregator**.

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-50.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-50.png){:class="body-image-post"}{: data-lightbox="gallery"}
          
          - For the source module, select `Iterator [5]` and for the text, enter: 
            
            `{% raw %}Tag:{{5.value}}/{{5.key}}{% endraw %}`  

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-51.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-51.png){:class="body-image-post"}{: data-lightbox="gallery"}

          - Then drag and drop the `Bundle order position` variable from module `5` between **Tag** and **:** 
          
              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-52.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-52.png){:class="body-image-post"}{: data-lightbox="gallery"}

          - Click on **Show advanced settings**, then select **New row** for the **Row separator** option: 
          
              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-53.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-53.png){:class="body-image-post"}{: data-lightbox="gallery"}

            This aggregator module will generate text in the format of `Tag1:Owner/James` when there is one tag. When there are two or more tags, the row separator option ensures that additional tags are displayed on new lines such as:
            ```
            Tag1:Location/Houston
            Tag2:Owner/James
            ```

       The initialization process has been successfully completed. 
        
       [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-54.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-54.png){:class="body-image-post"}{: data-lightbox="gallery"}
                
       You may now proceed to configure the event handlers, which will enable the triggering of specific actions.
 <br>
<br>
<a name="13-Configure-the-event-handlers"></a>

13. **Configure the event handlers**

      To configure the following actions: sending an email, posting on a Slack channel, and adding a record in a Notion database, a router module in Make is essential. The router module enables you to create multiple branches within your scenario, allowing different actions to take place either conditionally or in parallel. For this particular scenario, no conditions will be used since I want to trigger various actions from the same webhook event concurrently. The router effectively manages these simultaneous executions, ensuring that each action is processed without the need for any conditional logic.

      - From the Webhooks response module, click on **+** and add the **Router** module:

          [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-36.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-36.png){:class="body-image-post"}{: data-lightbox="gallery"}
        

      - Let's begin with the action to post a message on a Slack channel, click on the first **+** sign to add a new module, then select the **Slack**: **Create a message** module:

          [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-37.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-37.png){:class="body-image-post"}{: data-lightbox="gallery"}
        
      - Once you select the **Create a message** action, you will need to configure it with the necessary details: 

          - Connect to your Slack account if not already connected. Refer to the Make online help for more information.
          - Select the channel where the message will be posted.
          - Enter the message you want to send. As an example, you can use the following content in the block field:

            ```
            {% raw  %}{
                  "type": "home",	
                  "blocks":  [
                      {			
                        "type": "section",
                        "text": {
                              "type": "mrkdwn",
                              "text": ":warning: Server *{{1.name}}* has just been shut down ! "
                        }
                      },	
                      {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": " - *iLO*: {{1.hardware.bmc.ip}}"
                        }
                      },
                      {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": " - *S/N*: {{1.hardware.serialNumber}}"
                        }
                      },	
                      {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": " - *Model*: {{1.hardware.model}}"
                        }
                      },
                      {
                        "type": "section",			
                              "text": {
                          "type": "mrkdwn",
                          "text": " - {{replace(6.text; newline; space + "-" + space)}}"
                          }
                      }
                  ]
            }{% endraw %}
            ```

            > This example includes variable names defined with double curly braces, such as `{% raw %}{{1.hardware.model}}{% endraw %}`; this syntax is used to define variables in Make. The prefix `1.` specifies the first module, and `hardware.model` accesses the model attribute within the hardware property of the webhook data sent by COM. The goal is to display the server's model, serial number, tags, and iLO IP address in the Slack message to provide better insight into the system's details. The `replace()` function is used for tags, to remove newline characters contained in the text variable that was constructed earlier in module `6`.

            > To build an interactive block message, you can use [Block Kit Builder](https://app.slack.com/block-kit-builder/).

          - Once the block is set, click **OK**.

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-39.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-39.png){:class="body-image-post"}{: data-lightbox="gallery"}
          
          - Let's continue with the action to send a message to an email recipient, click on the second **+** sign to add another module, then select the **Email**: **Send an Email** module:

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-40.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-40.png){:class="body-image-post"}{: data-lightbox="gallery"}

          - Once you select the **Send an Email** action, you will need to configure it with the necessary details:

            - Create a connection to your email account if not already done. You can connect your email account to Make using different methods such as using a Gmail account, an IMAP, or a Microsoft SMTP/IMAP OAuth connection. Refer to the Make online help for more information.

            - In the **To** field, add a recipient email address and enter the subject you want to have.

            - Enter the message you want to send. As an example, you can use the following HTML in the content field:

              ```html
                {% raw  %}<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Server Notification</title>
                </head>
                <body>
                    <p>Server <strong>{{1.name}}</strong> has just been shut down!</p>

                    <ul>
                        <li><strong>Model:</strong> {{1.hardware.model}}</li>
                        <li><strong>iLO:</strong> {{1.hardware.bmc.ip}}</li>
                        <li><strong>SN:</strong> {{1.hardware.serialNumber}}</li>
                        <li>{{6.text}}</li>
                    </ul>
                </body>
                </html>{% endraw %}
              ```

            - Configure any additional options then click **OK**.

              [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-41.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-41.png){:class="body-image-post"}{: data-lightbox="gallery"} 


      - For the final action in this scenario, I aim to create a record in a Notion database to capture historical activity. Click on the router module to add another module, and then select the **Notion**: **Create a Database Item** module:

          [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-42.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-42.png){:class="body-image-post"}{: data-lightbox="gallery"}

          - Connect to your Notion account if not already connected. Refer to the Make online help for more information.

              > Notion is an all-in-one workspace application that allows users to create, organize, and collaborate on notes, tasks, databases, and documents. It combines the functionalities of note-taking, project management, and database management into a single, flexible platform for personal use or team collaboration.

          - Select the database where the record will be created. Use the **Select from the list** option, then click on the **Search** button. You can press the **OK** button directly afterward, even without providing any query parameters:

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-44.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-44.png){:class="body-image-post"}{: data-lightbox="gallery"}

          - Then select the database to record the shutdown events:

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-45.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-45.png){:class="body-image-post"}{: data-lightbox="gallery"}
        
            > To learn about Notion database and how to create one, see [Intro to databases](https://www.notion.so/help/intro-to-databases) and [Creating a database](https://www.notion.so/help/guides/creating-a-database). 

          - For this example, you need to create a database in Notion with the following properties:
            
            1. **Date**, Type: `Date`
            2. **Name**, Type: `Title`
            3. **Serial Number**, type: `Multi-select`
            4. **Model**, Type: `Text`
            5. **Health**, Type: `Status`- Show as: `Select` - To-do: `OK` (Green), `WARNING` (Orange), `CRITICAL` (Red), `NOT_PRESENT`, `READY`, `UNKNOWN`
            6. **iLO**, Type: `URL`
            7. **Fixed?**, Type: `Checkbox`
            8. **Tags**, Type: `Text`   
            <br>

            > The `Fixed?` property is used as a Boolean flag to indicate the resolution status of a server shutdown problem.
            
            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-43.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-43.png){:class="body-image-post"}{: data-lightbox="gallery"}  
              
              
          - For the Notion module in Make, configure the following options:

            - **Name**: `{% raw %}{{1.name}}{% endraw %}`  
            - **Tags**: `{% raw %}{{6.text}}{% endraw %}`  
            - **Serial Number**: `{% raw %}{{1.hardware.serialNumber}}{% endraw %}`  
            - **Start Time**: `{% raw %}{{1.updatedAt}}{% endraw %}`  
            - **iLO**: `{% raw %}https://{{1.hardware.bmc.ip}}{% endraw %}`  
            - **Health**: `{% raw %}{{1.hardware.health.summary}}{% endraw %}`  
            - **Model**: `{% raw %}{{1.hardware.model}}{% endraw %}`  
            <br>

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-55.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-55.png){:class="body-image-post"}{: data-lightbox="gallery"}  
<br>
<a name="14-scheduling-and-activation"></a>

14. **Scheduling and Activation**   

      - To ensure the scenario runs automatically every time webhook data is received from COM, click on the **Scheduling** button and make sure the **Immediately as data arrives** option is selected:

        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-57.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-57.png){:class="body-image-post"}{: data-lightbox="gallery"}  

      - Finally, save your scenario by clicking on the **Save** button:

        [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-56.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-56.png){:class="body-image-post"}{: data-lightbox="gallery"}  
  <br>  

      This completes the configuration of the scenario. You are ready to test the full flow. 
  <br>  
<a name="15-trigger-a-webhook-to-test-the-full-flow"></a>

15. **Trigger a webhook to test the full flow**

      The last step will be the testing phase where you'll verify that everything operates as expected. Exit the editor to monitor the scenario and check logs for any issues:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-59.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-59.png){:class="body-image-post"}{: data-lightbox="gallery"}  

      To trigger a webhook, you can choose from two options:

      1. Shut down a server for real in COM using the GUI to test the entire flow:

          - Navigate to the control panel within your COM user interface.
          - Locate the server that needs to be shut down.
          - Use the server options to initiate a shut down.

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-58.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-58.png){:class="body-image-post"}{: data-lightbox="gallery"}  
            <br>
      2. Simulate a webhook using a POST request:

          - Prepare a POST request with the necessary payload data.
          - Send this request to your Make endpoint URL.
        
            Example of a webhook test sending server data:

            ```
              POST https://your.make.endpoint.url/webhook
              Content-Type: application/json
            ```
            ```json
                {
                    "id": "878970-B21+XM1234567KC",
                  "host": {
                      "osName": "VMware ESXi",
                      "osType": 25,
                      "hostname": "ESX-1.handsonlab.local",
                      "osVersion": "8.0.2 Build-22380479 Update 2",
                      "osDescription": "VMkernel ESX-1.handsonlab.local 8.0.2 #1 SMP Release build-22380479 Sep  4 2023 15:00:49 x86_64 x86_64 x86_64 ESXi"
                  },
                  "name": "ESX-1.handsonlab.local",
                  "tags": {
                      "Location": "Houston",
                      "Application": "Hypervisor"

                  },
                  "type": "compute-ops/server",
                  ...
                }
            ```

            Replace `https://your.make.endpoint.url/webhook` with your actual Make endpoint URL and adjust the JSON payload as required for your scenario. A webhook test example can be found on [my Postman collection](https://www.postman.com/jullienl/workspace/lionel-jullien-s-public-workspace/request/991177-dac32650-76cb-49de-9f4f-8a3be34cde2b?tab=body).
            
            > The advantage of this method is that you can easily send numerous webhook tests without relying on COM. This significantly streamlines the troubleshooting process and is particularly useful for populating the module variable mappings of your scenario. However, it's critical to understand that this approach will not test or validate your webhook configurations and filter operations within COM.

            [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-66.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-66.png){:class="body-image-post"}{: data-lightbox="gallery"}  


      In Make, monitor the scenario. Ensure that the webhook is received and that it triggers the corresponding actions. Check the [Make history](https://www.make.com/en/help/scenarios/scenario-execution-history) for any issues. All modules should turn green, indicating success, with no errors displayed:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-60.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-60.png){:class="body-image-post"}{: data-lightbox="gallery"}  
    
      You should receive the following message template in Slack:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-61.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-61.png){:class="body-image-post"}{: data-lightbox="gallery"}  
      
      You should receive the following message template in your mailbox:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-62.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-62.png){:class="body-image-post"}{: data-lightbox="gallery"}  

      You should have a new record in your Notion database:

      [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-63.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-63.png){:class="body-image-post"}{: data-lightbox="gallery"}  
  <br>  


## Using the Make On-premise agent

In this Make scenario with COM, you've learned how to create actions using public resources, such as Slack, Email, Notion. But what happens when someone wants to interact with local files, databases, and services?

Good news, Make offers an On-premise agent designed to bridge the gap between Make's cloud-based integration platform and an organization's private, on-premises resources. This software component enables users to securely automate workflows that require local network access. For instance, if you want to create an action on iLOs, such as restarting a server that was accidentally shutdown, the On-premise agent makes this possible by allowing your Make scenarios to communicate with and control local systems.

To learn more, see [Using the On-premise agent](https://www.make.com/en/help/connections/using-an-on-premise-agent).

> According to the Make website as of April 2024, the On-premise agent is still in beta and is exclusively available with their Enterprise plan.


## Taking automation a step further?

An enhanced scenario could incorporate more sophisticated actions, such as sending HTTP requests to Compute Ops Management to execute tasks informed by data received from a webhook. For example, expanding on the initial scenario, I could introduce an additional action to automatically restart a server. This enhancement would necessitate the integration of several modules:

[![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-64.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-64.png){:class="body-image-post"}{: data-lightbox="gallery"}  

Moreover, using filters, offers another layer of automation. Consider a webhook that activates upon the integration of new servers into the HPE GreenLake platform. In this case, it's feasible to automate diverse operations within Make. For instance, servers can be automatically added to specific groups utilizing filters based on their tag values — such as location or application type — to apply particular configurations and firmware levels:

[![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-65.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-65.png){:class="body-image-post"}{: data-lightbox="gallery"}  


Details about the different modules to use in Make to interact with COM:

- To create a COM session, you can use the HTTP: **Make a request** module with the following configuration:

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-68.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-68.png){:class="body-image-post"}{: data-lightbox="gallery"}  

- To capture the COM access token, use:

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-69.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-69.png){:class="body-image-post"}{: data-lightbox="gallery"}  

- To create a **GET** request, use:  

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-70.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-70.png){:class="body-image-post"}{: data-lightbox="gallery"}  

- To capture the **GET** response into a variable: 

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-71.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-71.png){:class="body-image-post"}{: data-lightbox="gallery"}  

- To create a **POST** request with a particular payload, use:

  [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-72.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-72.png){:class="body-image-post"}{: data-lightbox="gallery"}  

  > Note that you must remove all spaces in the JSON payload for the COM API to accept the request.

 - [Filters](https://www.make.com/en/help/scenarios/filtering) used to detect the application name in the Tag values, must be configured with the `text` variable where the server tags have been stored from module `6` and must use the `Contains()` operator with the string value that you want to filter:  

   [![]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-67.png)]( {{ site.baseurl }}/assets/images/COM-Webhooks/COM-webhooks-67.png){:class="body-image-post"}{: data-lightbox="gallery"}  


To wrap things up, I'm genuinely excited about the opportunities here! The combination of COM webhooks with some nifty tools opens up a world of possibilities for automating all sorts of things in HPE GreenLake. Imagine having complicated tasks just flow smoothly on their own—less manual work for us humans, and you get a server management system that's agile and super responsive. By tapping into the magic of webhooks through Compute Ops Management, you're looking at a real game-changer for boosting how you handle IT operations and making everything run like a well-oiled machine. It's pretty awesome what you can achieve with this tech! 🚀
