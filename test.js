var assert = require( "assert" );

describe( "Query Builder", function(){
    var replace, merge, simple = {
        url: "http://test.local?q=parsed",
        param: { test: "passed", another: "passed" },
        replaceResult: "http://test.local?test=passed&another=passed",
        mergeResult: "http://test.local?q=parsed&test=passed&another=passed"
    };

    describe( "module API", function(){

        it( "should exports 'replace' and 'merge' function", function(){
            var querybuilder = require( "./querybuilder" );
            merge = querybuilder.merge;
            replace = querybuilder.replace;
            assert.equal( typeof replace, "function" );
            assert.equal( typeof merge, "function" );
        });

        it( "Simple replace gives " + simple.replaceResult, function(){
            assert.equal( replace( simple.url, simple.param), simple.replaceResult );
        });

        it( "Simple merge gives " + simple.mergeResult, function(){
            assert.equal( merge( simple.url, simple.param), simple.mergeResult );
        });

    });
});
