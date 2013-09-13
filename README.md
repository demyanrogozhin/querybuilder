## querybuilder
Create new queries from old one easily with QueryBuilder.

API is realy simple: 

querybuilder.replace - replaces query part from giving url with new one, produces new string

querybuilder.merge - adds new parameters to query part of given url, also produces string


## Install

Someday I will put it on NPM and it should be easy as:
```bash
$ npm install querybuilder
```
But unil that happen you can use it right from git, just drop querybuilder.js somewhere in your project.

## Usage

```js
    var querybuilder = require( "querybuilder" );
    querybuilder.merge( "http://server.local/path.php", {q: "test"}); //=> "http://server.local/path.php?q=test"
    querybuilder.replace( "https://github.com/?cool=hack", {}); //=> "https://github.com/?"
    querybuilder.merge( "take?a=piece", {of: "mind"}); //=> "test?a=piece&of=mind"
```
