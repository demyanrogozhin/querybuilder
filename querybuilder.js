"use strict"; /*jslint node: true */

var Builder = {},
    querystring = require("querystring"),
    parse = querystring.parse;

// Function produces new query URL from `url` string and `parameters`
// object. It leaves old query params and replace matched with new ones
//
//  url - string with arbitraty URL
//  parameters is required, parameters for query separator and
//  equivalency are optional
exports.merge = Builder.merge = function( url, parameters, separator, equivalency ) {
  var queryStart = url.indexOf( "?" ),
      fragmentStart = url.indexOf( "#" ),
      fragment = ~fragmentStart ? url.substring( fragmentStart ) : "";
      urlPart = url.substring( 0, ~queryStart ? queryStart : url.length - fragment.length ),
      oldQuery = ~queryStart
        ? ( url.substring( 1 + queryStart, ~fragmentStart ? fragmentStart - 1 : undefined ) )
        : "",
      oldParameters = parse( oldQuery );
  
  parameters = typeof parameters === "string"
    ? parse( parameters )
    : parameters;

};

// Function produces new query URL from `url` string and `parameters`
// object. It completely replace old query with new one

exports.replace = Builder.merge = function( url, parameters, separator, equivalency ) {
  
};