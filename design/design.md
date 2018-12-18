# Design


## Data Format and Storage

### Directory structure
```
root/
  settings
  index
  metadata
  file1
   .
   .
   .
  fileN
```

### settings (JSON or YAML or INI)
User settings and default settings are stored here. Other application default, internal
configurations and miscellaneous data may also appear here.

### index (JSON)
```
{
  "file1": ["file2", "file3"],
  "file3": ["file4", "file5"],
    .
    .
    .
}
```

Key-value pairs representing a file hierarchy. The key corresponds to a file. The value is
an array of other files. The pair presents a parent and children. Children themselves may
also appear has have their own children. A file that is not referenced as a child is a top
level file. All keys are unique. A key may only be referenced a single time in the whole
document as a value (in an array) -- meaning a file may only have a single parent.

Example of a file hierarchy
  file1
    file2
    file3
      file4
      file5

### metadata
```
{
  "file1": {
    "title": "Notes",
    "last-modified": "2018-01-01 23:51:05+0500",
    "created": "2018-01-01 23:51:05+0500",
    "tags": ["tagA", 'tagB"]
  },
   .
   .
   .
}
```

### file
Contains raw Unicode/ASCII data.


## Modules

### Low Level File IO and File Management
This group of modules will expose APIs for performing the actual file IO and file
management. The modules will contain information about the structure of the data and how
to do various IO operations.

### Application Logic
Application logic will be contained within this group of modules. This level will expose
APIs for the view layer to access information as required, as well as perform data
management operations as required.

### View
The view layer will be solely responsible for providing an interface based on data exposed
by the Application Logic layer. The view layer will make extensive use of the APIs exposed
by the Application Logic layer to hand of actual task execution and will update rendered
data when the Application Logic layer performs changes to the renderable data.

### Overview

#### *Main*
- Primary process that launches the GUI process
- uses: App
- input: void
- output: void
- secrets: managing lifecycle of GUI process

#### App
- Application framework and GUI logic
- uses:
  - DataManager
  - EditorComponent
  - TextEditorComponent
  - HandWritingEditorComponent
  - SettingsComponent
  - GraphViewComponent
- input: void
- output: void
- secrets: Managing lifecycle of components, providing a platform for handling user
  interactions, and provides a platform for rendering GUI elements

#### EditorComponent
- Provides editing capabilities
- input: file content
- output: event, file content
- secret: Handling user interaction and editing and displaying textual and hand written
  notes

#### TextEditorComponent
- Provides editing capabilities for textual notes
- input: textual file content
- output: event, textual file content
- secret: Handling user interaction and editing and displaying textual notes

#### HandWritingEditorComponent
- Provides editing capabilities for hand written notes
- input: hand written file content
- output: event, hand written file content
- secret: Handling user interaction and editing and displaying hand written notes

#### SettingsComponent
- Provides an interface for managing application settings
- input: settings
- output: event, settings
- secret: Handling user interaction and displaying settings

#### GraphViewComponent
- Provides an application managed wrapper for the graph visualizations
- uses:
  - D3Graph
- input: graph data, writable event stream
- output: void
- secret: Manages lifecycle of and interface with graph visualizer

#### DataManager
- Provides application logic for searching, retrieving and managing application data
- input: application event
- output: application data
- secret: Handling application events and managing, retrieving and updating application
  data

#### GraphDataManager
- Provides application logic for searching, retrieving and managing graph data
- uses:
  - FileSystemInterfacer
  - HandWritingParser
  - GraphSearcher
  - GraphFilter
- input: command
- output: graph data
- secret: Managing, retrieving and updating graph data

#### SettingsManager
- Provides logic for retrieving and updating application settings
- uses:
  - FileSystemInterfacer
- input: command, application settings
- output: application settings, void
- secret: Managing, retrieving and updating application settings

#### GraphSearcher
- Provides searching functionality based on graph metadata and nodes relations
- input: search query, graph data
- output: graph data
- secret: Graph searching, traversal and understanding relations between nodes

#### GraphFilter
- Used to retrieve subtrees
- input: filter criteria, graph data
- output: graph data
- secret: Extracting specific subsets of data

#### D3Graph
- Responsible for rendering and managing the graph visualizations. Communication between
  the D3 Graph and the client will be through a call to the Init function at the start,
  then through data streams to provide the client with streams of data
- input: graph data, writable event stream
- output: graph event
- secrets: Rendering graph data and providing a user interface for viewing and
  manipulating graph data
- methods:
  - init: Initialize the D3 graph at runtime when the containing host element and
    dimensions are known
  - render: Given data, render the visualization and interactive elements

#### HandWritingParser
- Provides an API for extracting textual data from hand written notes
- input: hand written note (image or file reference)
- output: parsed text
- secrets: Extracting text from graphical data

#### FileSystemInterfacer
- Provides low level API for file IO
- input: command, graph data
- output: void, graph data
- secrets: Managing filesystem level details and providing IO primitives and operations
