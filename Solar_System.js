var renderer = null,
scene = null,
camera = null,
SolarSystem = null,
cube = null,
sphereGroup = null,
sphere = null,
orbitControls = null;
var tmercury = null
,tvenus = null,
tearth = null,
tmars = null,
tjupiter = null,
tsaturn = null,
turanus = null,
tneptune = null;
var t= 0;
var duration = 5000; // ms
var currentTime = Date.now();
var mercury,venus,earth,moon,mars,jupiter,saturn,uranus,neptune,rings;
var mercpath
var merpot
function animate()
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    tmercury += 0.009;
    tvenus += 0.004;
    tearth += 0.007;
    tmars += 0.002;
    tjupiter += 0.001;
    tsaturn += 0.002;
    turanus += 0.0009;
    tneptune += 0.0004;

    // SolarSystem.rotation.x += angle;

    // Rotate the cube about its Y axis
    // sun.rotation.y = Math.PI;
    // sun.rotation.x = Math.PI /2;
    sun.rotation.y += angle / 2;
    // Rotate the sphere group about its Y axis

    mercury.rotation.y += angle;
    venus.rotation.y += angle;
    earth.rotation.y += angle;
    mars.rotation.y += angle;

    jupiter.rotation.y += angle;
    saturn.rotation.y += angle;
    uranus.rotation.y += angle;
    neptune.rotation.y += angle;
    asteroidBelt.rotation.z += angle/39;

    mercury.position.x = 25*Math.cos(tmercury) + 0;
    mercury.position.y = 20*Math.sin(tmercury) + 0;

    venus.position.x = 32*Math.cos(tvenus) + 0;
    venus.position.y = 25*Math.sin(tvenus) + 0;

    earth.position.x = 38*Math.cos(tearth) + 0;
    earth.position.y = 32*Math.sin(tearth) + 0;

    mars.position.x = 45*Math.cos(tmars) + 0;
    mars.position.y = 38*Math.sin(tmars) + 0;

    jupiter.position.x = 59*Math.cos(tjupiter) + 0;
    jupiter.position.y = 49*Math.sin(tjupiter) + 0;

    // asteroidBelt.position.x = Math.cos(tmercury);
    // asteroidBelt.position.y = Math.sin(tmercury);

    rings.position.x = 77*Math.cos(tsaturn) + 0;
    rings.position.y = 62*Math.sin(tsaturn) + 0;

    saturn.position.x = 77*Math.cos(tsaturn) + 0;
    saturn.position.y = 62*Math.sin(tsaturn) + 0;

    uranus.position.x = 94*Math.cos(turanus) + 0;
    uranus.position.y = 74*Math.sin(turanus) + 0;

    neptune.position.x = 104*Math.cos(tneptune) + 0;
    neptune.position.y = 84*Math.sin(tneptune) + 0;
}

function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();

    orbitControls.update();
}

function createScene(canvas)
{
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color
    scene.background = new THREE.Color( 0,0,0 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 5, 4000);
    camera.position.set(0, -100, 100);
    scene.add(camera);

    SolarSystem = new THREE.Object3D;
    SolarSystem.position.set(0, 0, 0);

    // Add a directional light to show off the objects
    var light = new THREE.PointLight(0xffffff, 1, 10000 );

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    var ambientLight = new THREE.AmbientLight(0xffcc00, 0.5);
    scene.add(ambientLight);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);


    var textureUrl = "images/sun.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshBasicMaterial({map: texture})
    var geometry = new THREE.SphereGeometry(11, 32, 32);
    sun = new THREE.Mesh(geometry, material);
    SolarSystem.add( sun );

    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/mercury.jpg";
    var mercuryBumpUrl = "images/mercurybump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mercury = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/venus.jpg";
    var mercuryBumpUrl = "images/venusbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    venus = new THREE.Mesh(geometry, material);

    // Earth
    geometry = new THREE.SphereGeometry(1, 20, 20);
    var earthMapUrl = "images/earth.jpg";
    var earthNormalMapUrl = "images/earthnormal.jpg";
    var earthspecularMapUrl = "images/earthspecular.jpg";
    map = new THREE.TextureLoader().load(earthMapUrl);
    normalMap = new THREE.TextureLoader().load(earthNormalMapUrl);
    specularMap = new THREE.TextureLoader().load(earthspecularMapUrl);
    var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
    earth = new THREE.Mesh(geometry, earth_materials);

    geometry = new THREE.SphereGeometry(2, 20, 20);
    var merctextureUrl = "images/mars.jpg";
    var mercuryBumpUrl = "images/marsbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mars = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(5, 20, 20);
    var textureUrl = "images/jupiter.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    jupiter = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(4, 20, 20);
    var textureUrl = "images/saturn.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    saturn = new THREE.Mesh(geometry, material);

    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/7.1 - saturn ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    rings = new THREE.Mesh( geometry, saturnMaterials );

    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/uranus.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    uranus = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/neptune.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    neptune = new THREE.Mesh(geometry, material);

    sun.rotation.x = Math.PI /2;
    mercury.rotation.x = Math.PI /2;
    venus.rotation.x = Math.PI /2;
    earth.rotation.x = Math.PI /2;
    jupiter.rotation.x = Math.PI /2;
    saturn.rotation.x = Math.PI /2;
    neptune.rotation.x = Math.PI /2;
    uranus.rotation.x = Math.PI /2;
    // pluto.rotation.x = Math.PI /2;

    mercpath = new THREE.EllipseCurve(0,0,25,20,0,  2 * Math.PI,true,0);
    
    var merpot = mercpath.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMer = new THREE.Line( geometry, material );

    var venpath = new THREE.EllipseCurve(0,0,32,25,0,  2 * Math.PI,false,0);
    var points = venpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseVen = new THREE.Line( geometry, material );

    var earthpath = new THREE.EllipseCurve(0,0,38,32,0,  2 * Math.PI,false,0);
    var points = earthpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseEart = new THREE.Line( geometry, material );

    var marspath = new THREE.EllipseCurve(0,0,45,38,0,  2 * Math.PI,false,0);
    var points = marspath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMart = new THREE.Line( geometry, material );

    var juppath = new THREE.EllipseCurve(0,0,59,49,0,  2 * Math.PI,false,0);
    var points = juppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseJup = new THREE.Line( geometry, material );

    var satpath = new THREE.EllipseCurve(0,0,77,62,0,  2 * Math.PI,false,0);
    var points = satpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseSat = new THREE.Line( geometry, material );

    var urapath = new THREE.EllipseCurve(0,0,94,74,0,  2 * Math.PI,false,0);
    var points = urapath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseUrn = new THREE.Line( geometry, material );

    var neppath = new THREE.EllipseCurve(0,0,104,84,0,  2 * Math.PI,false,0);
    var points = neppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseNep = new THREE.Line( geometry, material );

    // Create a group for the sphere
    sphereEllipse = new THREE.Object3D;
    Planets = new THREE.Object3D;

    sphereEllipse.add( ellipseMer );
    sphereEllipse.add( ellipseVen );
    sphereEllipse.add( ellipseEart );
    sphereEllipse.add( ellipseMart );
    sphereEllipse.add( ellipseJup );
    sphereEllipse.add( ellipseSat );
    sphereEllipse.add( ellipseUrn );
    sphereEllipse.add( ellipseNep );

    Planets.add( mercury );
    Planets.add( venus );
    Planets.add( earth );
    Planets.add( mars );
    Planets.add( jupiter );
    Planets.add( rings );
    Planets.add( saturn );
    Planets.add( uranus );
    Planets.add( neptune );

    SolarSystem.add(sphereEllipse);
    SolarSystem.add(Planets);

    asteroidBelt = new THREE.Object3D();
    Planets.add(asteroidBelt);
      for(var x=0; x<1000; x++) {
        tneptune += 0.0004;
          var asteroidSize = getRandomArbitrary(0.005, 0.5),
              asteroidShape1 = getRandomArbitrary(4, 10),
              asteroidShape2 = getRandomArbitrary(4, 10),
              asteroidPositionY = getRandomArbitrary(-2.7, 2.7);
          var asteroid = new THREE.Mesh( new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),   new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
          asteroid.position.z = asteroidPositionY;
          var radians = getRandomArbitrary(0, 360) * Math.PI / 2;
          asteroid.position.x = Math.cos(radians) * 50;
          asteroid.position.y = Math.sin(radians) * 48;
          asteroidBelt.add(asteroid);
      }

    scene.add( SolarSystem );
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
