//initialize graph
var cy = cytoscape({
  // very commonly used options
  container: document.getElementById('cy'),
          elements: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          {
            data: {
              id: 'ab',
              source: 'a',
              target: 'b'
            }
          }],
      style: [
        {
            selector: 'node',
            style: {
                shape: 'barrel',
                'background-color': 'blue'
            }
        }],
  

		layout: {
    		name: 'grid'
		},

  // initial viewport state:
  zoom: 1,
  pan: { x: 0, y: 0 },

  // interaction options:
  minZoom: 0.5,
  maxZoom: 10,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: true,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,

  // rendering options:
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  hideLabelsOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto'
});

//adding nodes
for (var i = 0; i < 10; i++) {
    cy.add({
        data: { id: 'node' + i }
        }
    );
    var source = 'node' + i;
    cy.add({
        data: {
            id: 'edge' + i,
            source: source,
            target: (i % 3 == 0 ? 'a' : 'b')
        }
    });
}

    cy.add({
        data: { id: 'ClickMe', label: "CLICK ME" },
        style: [ 
          {
            shape: 'circle',
            width: 'data(label)', 
            height: 'data(label)',
            'background-color': 'blue', 
            label: 'data(label)'
          }
        ]
        });

//change graph layout
cy.layout({
    name: 'cose'
}).run();

var flag = true;
//event system
cy.on('tap', 'node', function(evt){
  var node = evt.target;
  switch(node.id()) {
    case 'ClickMe':
    console.log(node);
    var newC;
    if(flag){
      newC = 'red';
      flag = !flag;
    }
    else{
      newC = 'blue';
      flag = !flag;
    }
    //change node colors when click on this node
    cy.style().selector('node').style({'background-color': newC}).update();
    break;
    case 'a':
        window.alert( 'tapped ' + node.id() );
        break;
    default:
        console.log('tapped: ' + node.id());
} 
});