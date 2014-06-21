(function( global ){

  function FontTester() {
    this.doc = global.document;
    this.inspectorTurnedOn = true;
    return this;
  }
  FontTester.prototype = {
    constructor: FontTester,

    render: function() {
      this.inspectorElement = this.doc.createElement('div');
      this.inspectorElement.id = 'font-tester-inspector';
      this.hintElement = this.doc.createElement('div');
      this.hintElement.textContent = 'Press [e] to edit font';
      var inspectorStyle = this.inspectorElement.style;
      var hintStyle = this.hintElement.style;
      // inspector style
      inspectorStyle.border = '2px dashed deepskyblue';
      inspectorStyle.position = 'absolute';
      inspectorStyle.top = '10px';
      inspectorStyle.left = '10px';
      inspectorStyle.pointerEvents = 'none';
      inspectorStyle.background = 'rgba(0,0,0,0.04)';
      // hint style
      hintStyle.position = 'absolute';
      hintStyle.top = '0px';
      hintStyle.left = '0px';
      hintStyle.background = 'rgba(0,0,0,0.5)';
      hintStyle.color = '#fff';
      hintStyle.padding = '2px';
      // append
      this.inspectorElement.appendChild(this.hintElement);
      this.doc.querySelector('body').appendChild(this.inspectorElement);
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
      this.hideInspector();
    },

    hideFontChooser: function() {

    },

    handleMouseOver: function( e ) {
      if (!this.inspectorTurnedOn) return;
      var style = this.inspectorElement.style, target = e.target;
      style.width = target.offsetWidth + 'px';
      style.height = target.offsetHeight + 'px';
      style.top = (target.offsetTop - 2) + 'px';
      style.left = (target.offsetLeft - 2) + 'px';
    },

    handleKeyPress: function( e ) {
      switch (e.keyCode) {
        case 101: this.showFontChooser(); break;
      }
    },

    bind: function() {
      this.doc.onmouseover = this.handleMouseOver.bind(this);
      this.doc.onkeypress = this.handleKeyPress.bind(this);
    },

    init: function() {
      this.render();
      this.bind();
    }
  };

  global.FontTester = FontTester;

}( window ));
