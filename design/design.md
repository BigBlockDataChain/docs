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

### Overview
- Main // Primary process that launches the GUI process
  - uses: App

- App // Application framework and GUI logic
  - uses: DataManagement
  - EditorComponent // Provides editing capabilities
    - TextEditorComponent // Provides editing capabilities for textual notes
    - HandwritingEditorComponent // Provides editing capabilities for hand written notes
      - uses: HandWritingParser
  - SettingsComponent // Provides an interface for managing application settings
  - GraphViewComponent // Provides a application controlled wrapper for the graph
                          visualizations
    - uses: D3Graph

- DataManagement // Provides application logic for searching, retrieving and managing data
  - uses: FileSystemInterfacer
  - GraphSearcher // Provides searching functionality based on graph metadata and nodes
                     relations
  - GraphFilter // used to retrieve subtrees

- D3Graph // Provides visualizations and event handling for the graph
- HandWritingParser // Provides an API for extracting textual data from hand written notes
- FileSystemInterfacer // provides low level API for file IO


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

### D3 Graph
An object that will be responsible for rendering and managing the D3 visualizations.
Communication between the D3 Graph and the client will be through a call to the Init
function at the start, then through data streams to provide the client with streams of
data

#### Methods
- Init: Initialize the D3 graph at runtime when the containing host element and dimensions
  are known
- Render: Given data, render the visualization and interactive elements
