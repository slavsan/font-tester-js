(function( global ){

  function FontTester() {
    this.doc = global.document;
    this.inspectorTurnedOn = true;
    this.sampleText = 'The quick brown fox jumps over the lazy dog';
    this.fonts = [
      {name:'Open Sans',url:'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,600,300,700,800'},
      {name:'Oswald',url:'http://fonts.googleapis.com/css?family=Oswald:400,300,700'},
      {name:'Doris',url:'http://fonts.googleapis.com/css?family=Dosis:400,200,300,500,600,700,800'},
      {name:'Shadows Into Light',url:'http://fonts.googleapis.com/css?family=Shadows+Into+Light'},
      {name:'Arial'},
      {name:'Verdana'}
    ];
    return this;
  }
  FontTester.prototype = {
    constructor: FontTester,

    render: function() {
      // create the elements
      this.fontChooserElement = this.doc.createElement('div');
      this.inspectorElement = this.doc.createElement('div');
      this.hintElement = this.doc.createElement('div');
      // set stuff
      this.inspectorElement.id = 'font-tester-inspector';
      this.hintElement.textContent = 'Press [e] to edit font';
      this.fontChooserElement.id = 'font-tester-chooser';
      this.fontChooserElement.innerHTML = '<div>Font:</div><div><select></select></div><div><button class="close">close</button></div>';
      // cache styles
      var inspectorStyle = this.inspectorElement.style;
      var hintStyle = this.hintElement.style;
      var fontChooserStyle = this.fontChooserElement.style;
      // set inspector style
      inspectorStyle.border = '2px dashed deepskyblue';
      inspectorStyle.position = 'absolute';
      inspectorStyle.top = '10px';
      inspectorStyle.left = '10px';
      inspectorStyle.pointerEvents = 'none';
      inspectorStyle.background = 'rgba(0,0,0,0.04)';
      // set hint style
      hintStyle.position = 'absolute';
      hintStyle.top = '0px';
      hintStyle.left = '0px';
      hintStyle.background = 'rgba(0,0,0,0.5)';
      hintStyle.color = '#fff';
      hintStyle.padding = '2px';
      // set font chooser style
      fontChooserStyle.border = '1px solid #999';
      fontChooserStyle.position = 'absolute';
      fontChooserStyle.display = 'none';
      fontChooserStyle.padding = '5px';
      fontChooserStyle.background = '#fff';
      fontChooserStyle.fontSize = '24px !important';
      fontChooserStyle.boxShadow = '0 0 3px #999';
      this.fontChooserElement.querySelector('select').style.fontSize = '19px';
      // append
      this.inspectorElement.appendChild(this.hintElement);
      this.doc.querySelector('body').appendChild(this.inspectorElement);
      this.doc.querySelector('body').appendChild(this.fontChooserElement);
    },

    loadFont: function( font ) {
      console.log('Load font: "%s": %o', font.name, font);
      if (font.url) {
        var link = this.doc.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = font.url;
        this.doc.querySelector('head').appendChild(link);
      }
      var option = this.doc.createElement('option');
      option.value = font.name;
      option.textContent = font.name + ': ' + this.sampleText;
      option.style.fontFamily = font.name + ', sans-serif';
      this.fontChooserElement.querySelector('select').appendChild(option);
    },

    loadFonts: function() {
      for (var i = 0; i < this.fonts.length; i += 1) {
        this.loadFont(this.fonts[i]);
      }
    },

    showInspector: function() {
      this.inspectorTurnedOn = true;
      this.inspectorElement.style.display = 'block';
    },

    hideInspector: function() {
      this.inspectorTurnedOn = false;
      this.inspectorElement.style.display = 'none';
    },

    showFontChooser: function() {
      var fontChooserStyle = this.fontChooserElement.style;
      fontChooserStyle.top = (this.inspectorElement.offsetTop + this.inspectorElement.offsetHeight) + 'px';
      fontChooserStyle.left = this.inspectorElement.offsetLeft + 'px';
      fontChooserStyle.display = 'block';
      this.hideInspector();
    },

    hideFontChooser: function() {
      this.fontChooserElement.style.display = 'none';
    },

    handleMouseOver: function( e ) {
      if (!this.inspectorTurnedOn) return;
      var style = this.inspectorElement.style, target = e.target;
      style.width = target.offsetWidth + 'px';
      style.height = target.offsetHeight + 'px';
      style.top = (target.offsetTop - 2) + 'px';
      style.left = (target.offsetLeft - 2) + 'px';
      this.currentTarget = e.target;
    },

    handleKeyPress: function( e ) {
      switch (e.charCode) {
        case 101: this.showFontChooser(); break; // charCode "e"
      }
    },

    changeFont: function( e ) {
      console.log('Change font to: %s', e.target.options[e.target.selectedIndex].value);
      this.currentTarget.style.fontFamily = e.target.options[e.target.selectedIndex].value;
    },

    bind: function() {
      var self = this;
      this.doc.onmouseover = this.handleMouseOver.bind(this);
      this.doc.onkeypress = this.handleKeyPress.bind(this);
      this.fontChooserElement.querySelector('select').onchange = this.changeFont.bind(this);
      this.fontChooserElement.querySelector('.close').onclick = function() {
        self.hideFontChooser();
        self.showInspector();
      };
    },

    init: function() {
      this.render();
      this.loadFonts();
      this.bind();
    }
  };

  global.FontTester = FontTester;

}( window ));
