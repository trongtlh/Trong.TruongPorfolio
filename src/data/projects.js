export const projects = [
  { slug: 'subsurface-workspace', name: 'i2g-subsurface-studio', productName: 'i2g-subsurface-studio', projectGroup: 'Professional Projects', visual: 'workspace', category: 'Web & desktop application', stack: 'Vue 3 · TypeScript · Theia · Electron · OSDU',
    company: 'ESS', teamSize: '8 members', focus: 'Application Development & Technical Research',
    summary: 'A desktop application that brings OSDU data exploration, technical documents and subsurface tools into one workspace. My contributions include Vue interface development, API and authentication integration, and document tab workflows. I also research Theia architecture and framework upgrades to assess compatibility and reduce the impact on existing code.',
    contributionSummary: 'Application development · Technical research',
    facts: [
      { label: 'COMPANY', value: 'ESS' },
      { label: 'TEAM SIZE', value: '8 people' },
      { label: 'FOCUS', value: 'Application development & technical research' },
      { label: 'MY CONTRIBUTION', value: 'Vue interfaces · API and authentication · Document workflows' },
      { label: 'TECHNOLOGIES', value: 'Vue 3 · TypeScript · Theia · Electron · OSDU' }
    ],
    sections: [
      { label: 'THE PRODUCT', title: 'One workspace for subsurface work', paragraphs: [
        'i2g-subsurface-studio brings OSDU data exploration, technical documents and subsurface tools into one desktop application.',
        'Asset navigation, document tabs and specialized viewers help people move from a record to its related information without losing their place.'
      ], figures: [
        { src: '/image/image5.jpg', alt: 'OSDU data platform software components, including applications, domain APIs, platform APIs and core platform services', caption: 'OSDU data platform components and API layers' }
      ] },
      { label: 'MY CONTRIBUTION', title: 'Building interfaces and workflows', paragraphs: [
        'I develop Vue interfaces, connect OSDU APIs and authentication, and work on preview and persistent document tabs.',
        'I also research Theia architecture and framework upgrades to check compatibility and limit changes to existing code.'
      ], figures: [
        { src: '/image/image4.png', alt: 'Eclipse Theia workbench containing a custom widget and custom HTML user interface', caption: 'A custom UI hosted as a widget in the Eclipse Theia workbench' },
        { src: '/image/extensiontypes.svg', alt: 'Diagram connecting VS Code APIs, Theia plugin APIs and custom extension types with the Eclipse Theia workbench', caption: 'Extension and plugin integration points around Eclipse Theia' }
      ] }
    ],
    challenge: 'Technical data and documents often live across several views. The interface needs to help people navigate this information without losing their working context.',
    contribution: ['Building Vue interfaces for data and document exploration.', 'Working on preview tabs, persistent tabs and multi-panel document workflows.', 'Integrating APIs and authentication flows with a desktop application.'],
    decision: 'Keep the business interface in Vue and give the workbench a focused responsibility: document tabs, splits and workspace behavior.',
    learning: 'Clear responsibilities between the interface and workbench make the user experience easier to reason about and maintain.' },
  { slug: 'reservoir-model-viewer', name: 'Reservoir Model Viewer', projectGroup: 'Professional Projects', visual: 'reservoir', category: '3D visualization module', stack: 'GRDECL · EGRID · RESQML',
    company: 'ESS', teamSize: '8 members', focus: '3D Visualization & Subsurface Data Research',
    summary: 'A viewer for exploring reservoir grids and properties through interactive 3D views and slices. My work covers research into GRDECL, EGRID and RESQML formats, grid visualization, and the presentation of properties such as porosity and permeability. I also investigate spatial alignment for integration with seismic views in i2g-subsurface-studio.',
    keyAreas: 'Reservoir Grids · Property Visualization · Slice Views · Seismic Integration',
    facts: [
      { label: 'COMPANY', value: 'ESS' },
      { label: 'TEAM SIZE', value: '8 members' },
      { label: 'FOCUS', value: '3D Visualization & Subsurface Data Research' },
      { label: 'KEY AREAS', value: 'Reservoir Grids · Property Visualization · Slice Views · Seismic Integration' }
    ],
    sections: [
      { label: 'GRIDS & FORMATS', title: 'Reservoir grids and file formats', paragraphs: [
        'The viewer reads reservoir geometry and properties from GRDECL, EGRID and RESQML models.',
        'My research focuses on corner-point geometry, cell indexing and active cells so property values stay aligned with the correct grid cells.'
      ], figures: [
        { src: '/image/gravity-column.png', alt: 'Layered reservoir grid colored by a vertical property gradient with a color scale', caption: 'Layered grid and property variation through a gravity column' },
        { src: '/image/dataset-norne.webp', alt: 'Reservoir grid geometry shown as a yellow model over a grey structural grid', caption: 'Norne dataset: grid geometry and structure' }
      ] },
      { label: 'PROPERTIES & SLICES', title: 'Reading properties through the model', paragraphs: [
        'The viewer presents properties such as porosity and permeability with selection controls, color legends and slices.',
        'Clear ranges, units and cell visibility help distinguish continuous values from categorical data and make internal variation easier to inspect.'
      ], figures: [
        { src: '/image/dataset-saigup.png', alt: 'Saigup reservoir model colored by a selected property with a property distribution plot and color scale', caption: 'Saigup dataset: property values and legend' },
        { src: '/image/dataset-johansen.webp', alt: 'Johansen reservoir model visualized with a spatial color scale', caption: 'Johansen dataset: spatial property variation' }
      ] },
      { label: 'SEISMIC INTEGRATION', title: 'Aligning reservoir and seismic views', paragraphs: [
        'I investigate coordinate systems, depth references and units for placing reservoir models alongside seismic data.',
        'Because seismic data may use time while reservoir grids use depth, meaningful comparison also depends on an appropriate time–depth relationship.'
      ] }
    ],
    challenge: 'A reservoir model contains complex geometry and property values. A useful viewer must make both the spatial structure and selected data understandable.',
    contribution: ['Researching GRDECL, EGRID and RESQML formats.', 'Developing grid, property and slice visualization.', 'Investigating spatial alignment with seismic views.'],
    decision: 'Treat the application as a viewer: display model data and make it explorable, while keeping simulation and geological interpretation separate.',
    learning: 'Legends, units and the selected property are essential parts of a technical visualization.' },
  { slug: 'taskflow', name: 'TaskFlow', projectGroup: 'Personal Projects', visual: 'taskflow', category: 'Personal Project', stack: 'Vue 3 · Electron · Firebase',
    projectType: 'Personal Project', teamSize: '1', focus: 'Application Design & Development',
    githubUrl: 'https://github.com/trongtlh/TaskFlow',
    summary: 'A personal task management application for organizing daily work and tracking progress. I designed and developed task creation, status and priority tracking, checklists, work logs and activity history. Task notes support images and code snippets, keeping implementation details alongside each task.',
    challenge: 'Tasks, time spent and supporting notes can become scattered. A personal tool should keep the context of a task together.',
    contribution: ['Creating task management views with status, priority and dates.', 'Adding work logs and activity history.', 'Working on notes with images and code, including unsaved-change handling.'],
    decision: 'Separate task details, activity and notes so the main workflow stays simple while the supporting information remains accessible.',
    learning: 'Small interaction details — draft handling, validation and clear feedback — have a large effect on everyday usability.' },
]
