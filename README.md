font-tester-js
==============

A small js app for dynamically changing fonts on a page.

Works with native and google fonts.

This tool is useful for experimenting with the looks of a page while designing it.
Since fonts are a very important part of a successful design and switching between
fonts in firebug or the chrome developer toolbar is a bit slow, I figured out it would 
be nice to make things more simple and fun.

Enjoy.

Usage
---------
Just include the <code>fonttester.js</code> file in any HTML page you want and then initialize the app like so:

    <script>
        (function() {
            var ftest = new FontTester();
            ftest.init();
        }());
    </script>

An alternative is to uncomment the line 

    this.init();
    
in the constructor and it will be loaded just by including the file.

There is a handful fonts but more fonts can be added from <a href="https://www.google.com/fonts">Google Fonts</a>.

You just need to add an object containing the font name (as it's used CSS) and the font url. Example:

      {name:'Doris',url:'http://fonts.googleapis.com/css?family=Dosis:400,200,300,500,600,700,800'},
      {name:'Oswald',url:'http://fonts.googleapis.com/css?family=Oswald:400,300,700'}


Demo
---------
<a href="http://slavchoslavchev.com/demo/font-tester-js">Try it out here</a>