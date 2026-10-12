# OSDU & Subsurface Data Integration: From API Connections to Usable Data

_Research notes on connecting applications to OSDU, understanding subsurface records and translating distributed data into practical exploration workflows._

Finding a well record is only the beginning of a subsurface workflow. A user may also need to identify its wellbores, inspect available logs, open a report and locate relevant seismic information.

Each step introduces a different integration question. Where is the information stored? How are records related? Does the user have permission to access the content? Which service can deliver it in a form that an application can display?

My work on i2g-subsurface-studio brought these questions together through OSDU integration and interface development.

The central research question is:

**How can an application turn OSDU records and services into a connected, understandable subsurface workflow?**

This article combines documentation research with the integration concerns explored during that work. The request examples are illustrative; they must be adapted to the authentication configuration, service routes and schema versions of the target environment.

## 1. Understanding the Service Boundaries

I approached OSDU documentation by following the actions a user needs to perform: discover information, inspect a record, resolve its relationships and retrieve its content.

Search supports discovery across indexed records. Storage provides record operations, including retrieval of metadata. Their responsibilities are connected, but a search result and a complete record should not be treated as interchangeable application objects.

Content retrieval adds another boundary. The Dataset service provides storage and retrieval instructions for different dataset types, allowing retrieval to be delegated to the appropriate service.

This led to a practical division in my integration design:

| Application task             | Integration responsibility                   |
| ---------------------------- | -------------------------------------------- |
| Find a well or document      | Construct a discovery query                  |
| Inspect a selected item      | Retrieve and interpret its record            |
| Navigate related information | Resolve references and domain relationships  |
| Open the associated content  | Select the appropriate retrieval service     |
| Display a technical view     | Transform the retrieved content for a viewer |

This division helps explain why a successful search does not necessarily mean that a document or technical dataset is ready to open.

![Diagram of OSDU domain services, platform services and core platform capabilities](/image/image1.jpg)

_OSDU platform services connect discovery, storage, identity, datasets and domain-specific capabilities._

## 2. Establishing a Reproducible Connection

Before building a data explorer, the connection itself needs to be understood.

In the environment I worked with, authentication involved Keycloak. That is an environment-specific choice rather than a requirement that every OSDU deployment uses the same identity provider.

A useful connection definition needs enough information to identify both the platform and the active data context:

| Configuration                | Purpose                                               |
| ---------------------------- | ----------------------------------------------------- |
| API base URL                 | Identifies the target environment                     |
| Gateway prefix               | Determines how service routes are exposed             |
| Authentication configuration | Defines how the application obtains an accepted token |
| Client configuration         | Identifies the registered application                 |
| Data partition               | Selects the partition addressed by requests           |
| Connection name              | Helps users distinguish environments                  |

OSDU Search requests require a partition header. Access also depends on service permissions and membership in the relevant data groups, so successful authentication alone does not establish that the user can discover the expected records.

For connection testing, I therefore distinguish several outcomes: the endpoint is reachable, authentication succeeds, a service accepts the request and permitted data can be retrieved.

Those outcomes should be recorded separately. A single “Connected” label can otherwise conceal which part of the integration was actually verified.

## 3. Following a Minimal Discovery Workflow

A small, reproducible request is more useful than immediately loading an entire dashboard.

The first step is to query a record kind known to exist in the target environment. For example:

```http
POST {baseUrl}/api/search/v2/query
Authorization: Bearer {accessToken}
data-partition-id: {partitionId}
Content-Type: application/json

{
  "kind": "osdu:wks:master-data--Well:1.0.0",
  "limit": 10
}
```

The kind above is an example, not a guarantee that the environment uses that exact version. The `/api` prefix also depends on gateway configuration. Search documentation defines the query structure and supports filtering by kind.

After selecting a result, the next step is record retrieval:

```http
GET {baseUrl}/api/storage/v2/records/{recordId}
Authorization: Bearer {accessToken}
data-partition-id: {partitionId}
```

The returned record becomes the starting point for inspecting metadata and relationships. The precise endpoint contract should be checked against the deployed Storage API.

At this stage, I would capture the request, response status, selected record ID and any missing fields. These observations make later UI problems easier to trace back to their source.

## 4. Translating Records into Domain Navigation

My Explorer work covered basins, blocks, fields, wells and wellbores, together with related documents, logs and seismic datasets.

A browsing sequence such as **Basin → Block → Field → Well → Wellbore** is understandable to users. However, I treat it as an application navigation model rather than assume that every dataset provides a complete, uniform tree.

The integration needs to answer more specific questions:

- Which reference establishes a relationship?
- Is the relationship available in the current record?
- Does the referenced record exist and remain accessible?
- Can one item appear in more than one browsing context?
- How should incomplete relationships appear in the interface?

For example, two records with similar names should not automatically be joined. Names help users recognize information; identifiers and documented relationship fields should drive record resolution.

This suggests keeping relationship mapping outside the visual tree component. The component can then focus on selection, expansion and loading states, while a domain service determines which records belong together.

## 5. Separating Metadata from Technical Content

A record describes information. A viewer needs the content required to display it.

That distinction became especially important when considering different subsurface data types:

| Selected information | What the interface needs to establish                              |
| -------------------- | ------------------------------------------------------------------ |
| Well report          | Which content reference provides the document                      |
| Well log             | Which source supplies curves, depth information and units          |
| Seismic dataset      | Which service can provide the requested slice or volume            |
| Reservoir model      | Which source provides geometry, properties and supporting metadata |

The retrieval route is not necessarily identical for each type. OSDU’s DDMS model supports specialized services that manage domain data while making it discoverable and retrievable through the platform.

![OSDU data platform components showing applications, Domain APIs, DDMS and core platform services](/image/image3.jpg)

_Domain APIs and DDMS extend the platform for specialized data workflows._

For the application, I use this distinction to frame a content-resolution step: inspect the selected record, identify the relevant dataset or service and prepare a response suitable for the intended viewer.

This avoids placing assumptions about every content type inside a generic “Open” button.

## 6. Preserving Meaning During Visualization

Retrieving values is insufficient if the application loses their technical meaning.

For a well-log view, the integration questions include the depth reference, measurement units, missing-value conventions and available curves. For geographic information, coordinate interpretation matters. For seismic or reservoir views, the application must understand the geometry and property context expected by the viewer.

![ResInsight well-log plotting workspace with tracks, curves and depth scales](/image/image2.jpg)

_A well-log view depends on preserving depth, curve and unit context while presenting the data._

These are questions to validate against the source data and format documentation. A plausible-looking visualization is not evidence that the interpretation is correct.

My visualization research included SEG-Y and OpenVDS workflows, as well as reservoir formats such as GRDECL, EGRID and RESQML. A useful development approach is to validate a viewer with understood local data before introducing remote retrieval.

That separates two investigations:

1. Can the viewer interpret and display the data correctly?
2. Can the integration retrieve the correct data under the active connection?

A local viewer prototype does not, by itself, demonstrate a completed OSDU domain-service integration.

## 7. Managing Connection and Session Changes

A connected workspace also needs to behave correctly when the user changes accounts or environments.

In my application work, session-related investigations included token refresh, logout, cookie interference between instances and previously opened tabs remaining visible under another login.

These issues suggest that workspace identity should include more than the document ID. The connection, partition and user context can determine whether a saved tab or cached response is still relevant.

For a connection switch, I would evaluate the following behavior:

- Stop or disregard requests belonging to the previous context.
- Clear or separate cached domain data.
- Restore only workspace state associated with the active context.
- Revalidate access before reopening content.

This is particularly important for asynchronous interfaces. A response from an earlier connection should not populate a screen that now represents a different environment.

## 8. Making Integration Failures Understandable

An empty panel can represent several different situations.

The application might have received no matching records. A relationship might be missing. Content retrieval might be unavailable. The viewer might not support the format.

Those situations need different explanations.

| Observation                                          | Investigation                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| Authentication succeeds, but the request is rejected | Check token acceptance, service authorization and partition context |
| Search returns no expected records                   | Check filters, available kinds, permissions and indexing            |
| A record loads, but its document does not            | Inspect content references and retrieval instructions               |
| Content is retrieved, but cannot be displayed        | Check parsing, format support and viewer assumptions                |
| Old information appears after switching connections  | Inspect cache keys and in-flight request handling                   |

The table describes diagnostic directions, not guaranteed causes.

The application should report the stage that failed without exposing credentials or internal service details. That gives users a useful explanation and gives developers a more precise investigation path.

## 9. Documenting Evidence and Limitations

The output of integration research should be reproducible.

For each workflow, I would preserve the environment assumptions, service routes, example requests, observed responses and any transformation applied before rendering.

I would also distinguish four levels of progress:

| Status       | Meaning                                                  |
| ------------ | -------------------------------------------------------- |
| Documented   | Supported by the referenced service documentation        |
| Investigated | Examined as a possible integration approach              |
| Prototyped   | Demonstrated in a limited implementation                 |
| Validated    | Checked against defined behavior in a stated environment |

This distinction matters because a working Search request, a local seismic viewer and a proposed connection architecture demonstrate different things.

A useful research article should make those boundaries visible rather than describe all three as a completed platform capability.

## Conclusion

OSDU integration requires a connected understanding of services, identity, relationships and technical content.

The most useful result is a workflow that users can follow: discover an item, understand its context, navigate related information and open the appropriate content.

For my application-development work, the main lesson is to investigate every transition in that workflow. A clear API contract helps establish connectivity; explicit domain mapping and careful viewer integration make the retrieved information usable.

## References

1. [OSDU Search Service — API Documentation](https://osdu.pages.opengroup.org/platform/system/search-service/api/)
2. [OSDU Storage Service — Overview](https://osdu.pages.opengroup.org/platform/system/storage/)
3. [OSDU Storage Service — APIs](https://osdu.pages.opengroup.org/platform/system/storage/api/)
4. [OSDU Dataset Service — Documentation](https://osdu.pages.opengroup.org/platform/system/dataset/)
5. [OSDU — How to Become a DDMS](https://osdu.pages.opengroup.org/platform/system/register/HowToBecomeADDMS/)

_Request examples use placeholders. Authentication settings, gateway paths, available services and schema versions must be verified against the target deployment._
