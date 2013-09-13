var assert = require( "assert" );

describe( "Query Builder", function(){
    var replace, merge, simple = {
        url: "http://test.local?q=parsed",
        param: { test: "passed", another: "passed" },
        replaceResult: "http://test.local?test=passed&another=passed",
        mergeResult: "http://test.local?q=parsed&test=passed&another=passed"
    }, cyrillic = {
        url: "http://yandex.ru/yandsearch",
        param: { text: "Возьмите на работу!", lr: 2 },
        result: "http://yandex.ru/yandsearch?text=%D0%92%D0%BE%D0%B7%D1%8C%D0%BC%D0%B8%D1%82%D0%B5%20%D0%BD%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83!&lr=2"
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

        it( "Merge and replace gave save result for URL without query: "+ cyrillic.url , function(){
            assert.equal( merge( cyrillic.url, cyrillic.param), replace( cyrillic.url, cyrillic.param ));
        });
        
        it( "Cyrillic strings and reserver chars are escaped", function(){
            assert.equal( replace( cyrillic.url, cyrillic.param), cyrillic.result );
        });


    });
});
