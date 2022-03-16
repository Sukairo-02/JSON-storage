# JSON-storage

## Introduction

A simple JSON storage. Allows to store JSON objects at your desired routes.

## How to use

To begin uploading your documents, you must first `POST` folder in which it will be contained.  
 `http://myhost.dom/newfolder/`  
 After folder is created, you'll receive `password` in `response`.  
 With that `password`, you now can `POST` files to your folder.  
 `http://myhost.dom/newfolder/newfile`  
 After that is done, you can now `GET` your documents by the same address you have uploaded them to.  
 `GET`ting your folder will return you a list of all files stored in it.

:warning: While some operations require a `password`, folder and it's contents are publicly accessible.

## Before you read

:lock: - Means route is protected by a password.  
 To access it, you must pass your folder's password in request's body, like:

```JSON
{
    "password": "this-is-a-password-i've-received"
}
```

## Routes

### `/:folderName`

-   `GET` - returns listing of files in that folder;
-   `POST` - creates a new folder if a name is valid (latin alphabet letters or numbers only) and not occupied;
-   `PATCH` :lock: - renames your folder, new name is passed in `"folderName": "newName"` of request's body;
-   `DELETE` :lock: - deletes your folder and all it's contents.

### `/:folderName/:fileName`

-   `GET` - returns your previously saved data in JSON format;
-   `POST` :lock: - creates a new file from your request's body if a name is valid and not occupied;
-   `PATCH` :lock: - renames your file, new name is passed in `"fileName": "newName"` of request's body;
-   `DELETE` :lock: - deletes your file and all it's contents.
