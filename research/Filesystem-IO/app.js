import foo from './foo.js'
import {remote} from 'electron'

const fs = remote.require('fs')
const dialog = remote.dialog;

foo()

// Create the file.
document.getElementById("btn-createfile").addEventListener("click", () => {
  let content = "Hello, this is the content of the new file";
  dialog.showSaveDialog((filename) => {
    if(filename === undefined){
      alert("Save: The user clicked the button, but didn't create a file");
      return;
    }

    fs.writeFile(filename, content, (err) => {
      if(err){
        alert("An error occured while saving: " + err.message);
        return;
      }

      alert("Sucessfully saved.");
    });
  })
}, false);

// Read the file.
document.getElementById("btn-readfile").addEventListener("click", () => {
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined){
      alert("Read: The filename is undefined.");
      return;
    }

    fs.readFile(fileNames[0], "utf-8", (err, data)=>{
      if(err){
        alert("An error occured while reading file: " + err.message);
        return;
      }

      alert("The content of the file is: " + data);
    });
  });
}, false);

// Update the file.
document.getElementById("btn-updatefile").addEventListener("click", () => {
  let theNewContent = "The new content";
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined){
      alert("Update: No file selected.");
      return;
    }

    fs.writeFile(fileNames[0], theNewContent, (err) => {
      if(err){
        alert("An error occured while updating the file: " + err.message);
        return;
      }

      alert("The file has been updated.");
    });
  });
}, false);

// Delete the file.
document.getElementById("btn-deletefile").addEventListener("click", () => {
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined){
      alert("Delete: No file selected.");
      return;
    }

    if(!fs.existsSync(fileNames[0])){
      alert("The file in " + filenames[0] + " doesn't exist.");
      return;
    }

    fs.unlink(fileNames[0], (err) => {
      if(err){
        alert("Cannot delete file.");
        return;
      }

      alert("The file has been deleted");
    });
  });
}, false);

// Run ls on the current directory.
document.getElementById("btn-view-dir").addEventListener("click", () => {
  var files = fs.readdirSync('.');
  var out = document.location.pathname + "\n" + files;
  alert(out);
}, false);

