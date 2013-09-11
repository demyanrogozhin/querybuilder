"use strict"; /*jslint node: true */

var Builder = {},
    querystring = require( "querystring" ),
    parse = querystring.parse;

function construct( url, parameters, fragment, sep, eq ){
    return url.concat( "?", querystring.stringify( parameters, sep, eq ), fragment );
};

function parseURL( url ){
    var safeUrl = "" + url,
        queryStart = safeUrl.indexOf( "?" ),
        fragmentStart = safeUrl.indexOf( "#" ),
        fragment = ~fragmentStart ? safeUrl.substring( fragmentStart ) : "",
        urlPart = safeUrl.substring( 0, ~queryStart ? queryStart : safeUrl.length - fragment.length ),
        oldQuery = ~queryStart
        ? ( safeUrl.substring( 1 + queryStart, ~fragmentStart ? fragmentStart : undefined ) ) : "";
    return [ urlPart, oldQuery, fragment ];
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

// Function produces new query URL from `url` string and `parameters`
// object. It leaves old query parameters and replace matched with new ones
//
//  url - string with arbitraty URL
//  parameters is required, parameters for query separator and
//  equivalency are optional

exports.merge = Builder.merge = function( url, parameters, separator, equivalency ) {
    var urlParts = parseURL( url ),
        newParameters = buildParameters( parameters, urlParts[ 1 ], { merge: 1 });
    return construct( urlParts[ 0 ], newParameters, urlParts[ 2 ], separator, equivalency );
};

// Function produces new query URL from `url` string and `parameters`
// object. It completely replace old query with new one

exports.replace = Builder.replace = function( url, parameters, separator, equivalency ) {
    var urlParts = parseURL( url ),
        newParameters = buildParameters( parameters );
    return construct( urlParts[ 0 ], newParameters, urlParts[ 2 ], separator, equivalency );
};
