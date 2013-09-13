"use strict"; /*jslint node: true */

var queryparser = require( "./queryparser" ),
    parse = queryparser.parse;

function construct( url, parameters, fragment, sep, eq ){
    return url.concat( "?", objectToQuery( parameters, sep, eq ), fragment );
};

function objectToQuery( obj, sep, eq ){
    var buff = "", sep = sep || "&", eq = eq || "=";
    for( var key in obj ){
        obj.hasOwnProperty( key )
            && ( buff = buff.concat(sep, encodeURI( key ), eq, encodeURI( obj[ key ] )));
    }
    return buff.substring( 1 );
};

function parseURL( url ){
    var safeUrl = "" + url,
        queryStart = safeUrl.indexOf( "?" ),
        fragmentStart = safeUrl.indexOf( "#" ),
        fragment = ~fragmentStart ? safeUrl.substring( fragmentStart ) : "",
        urlPart = safeUrl.substring( 0, ~queryStart ? queryStart : safeUrl.length - fragment.length ),
        oldQuery = ~queryStart
        ? ( safeUrl.substring( 1 + queryStart, ~fragmentStart ? fragmentStart : undefined ) ) : "";
    return {url: urlPart, query: oldQuery, fragment: fragment };
};

function buildParameters( parameters, oldQuery, mode ){
    var oldParameters,
        newParameters = typeof parameters === "string"
        ? parse( parameters )
        : new Object( parameters );

    if( typeof mode !== "undefined" && mode.merge ){
        oldParameters = parse( oldQuery );
        // Merge new parameters into old query
        Object.getOwnPropertyNames( parameters ).forEach( function( key ){
            var value = parameters[ key ];
            if ( oldParameters[ key ] !== value )
                oldParameters[ key ] = value;
        });
        return oldParameters;
    } else {
        return newParameters;
    }
};

// Function produces new query URL from string `url` and object `parameters`.
// It leaves old query parameters and replace matched with new ones
//
//  url - string with arbitraty URL
//  parameters - required parameters for query
//  separator and equivalency are optional

exports.merge = function( url, parameters, separator, equivalency ) {
    var urlParts = parseURL( url ),
        newParameters = buildParameters( parameters, urlParts.query, { merge: 1 });
    return construct( urlParts.url, newParameters, urlParts.fragment, separator, equivalency );
};

// Function produces new query URL from string `url` and object `parameters`.
// It completely replace old query with new one

exports.replace = function( url, parameters, separator, equivalency ) {
    var urlParts = parseURL( url ),
        newParameters = buildParameters( parameters );
    return construct( urlParts.url, newParameters, urlParts.fragment, separator, equivalency );
};
