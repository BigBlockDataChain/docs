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
