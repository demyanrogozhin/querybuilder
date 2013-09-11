var assert = require( "assert" );

describe( "Query Builder", function(){
    var simple = {
        url: "http://test.local?q=parsed",
        param: { test: "passed", another: "passed" },
        replaceResult: "http://test.local?test=passed&another=passed"
    }
    describe( "module API", function(){

        it( "should exports 'replace' function", function(){
            replace = require( "./querybuilder" ).replace;
            assert.equal( typeof replace, "function" );
        });

        it( "Simple replace gives " + simple.replaceResult, function(){
            assert.equal( replace( simple.url, simple.param), simple.replaceResult );
        });

    });
});
