//Emiliano Abascal Gurria A01023234
var renderer = null, scene = null, camera = null, SolarSystem = null, cube = null, sphereGroup = null, sphere = null, orbitControls = null, timeForMercury = null,timeForVenus = null, timeForEarth = null, timeForMars = null, timeForJupiter = null, timeForSaturn = null, timeForUranus = null, timeForPluto = null, timeForNeptune = null;
var duration = 5000; // ms
var currentTime = Date.now();
var moons = [];
var mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,rings;
var fract, angle, movement, now, timeDelta;

function animate(){
    now = Date.now();
    timeDelta = now - currentTime;
    currentTime = now;
    fract = timeDelta / duration;
    angle = Math.PI * 2 * fract;
    movement = now * 0.001;

    timeForMercury += 0.009;
    timeForVenus += 0.005;
    timeForEarth += 0.003;
    timeForMars += 0.002;
    timeForJupiter += 0.0009;
    timeForSaturn += 0.0005;
    timeForUranus += 0.0003;
    timeForNeptune += 0.0002;
    timeForPluto += 0.0002;


    sun.rotation.y += angle / 2;
    mercury.rotation.y += angle;
    earthMoon.rotation.z -= angle;
    
    venus.rotation.y += angle;
    earth.rotation.y += angle;
    mars.rotation.z += angle;
    
    
    for (var i = 1; i < moons.length; i++){
      moons[i].rotation.z += angle;
    }
    jupiter.rotation.z += angle/10;
    saturn.rotation.y += angle/20;
    uranus.rotation.y += angle/5;
    neptune.rotation.y += angle/9;
    asteroidBelt.rotation.z += angle/39;
    pluto.rotation.y += angle/10;

    mercury.position.x = 22*Math.cos(timeForMercury) + 0;
    mercury.position.y = 24*Math.sin(timeForMercury) + 0;
    venus.position.x = 33*Math.cos(timeForVenus) + 0;
    venus.position.y = 30*Math.sin(timeForVenus) + 0;
    earth.position.x = 38*Math.cos(timeForEarth) + 0;
    earth.position.y = 48*Math.sin(timeForEarth) + 0;
    earthMoon.position.x = earth.position.x;
    earthMoon.position.y = earth.position.y;
    mars.position.x = 45*Math.cos(timeForMars) + 0;
    mars.position.y = 53*Math.sin(timeForMars) + 0;
    jupiter.position.x = 75*Math.cos(timeForJupiter) + 0;
    jupiter.position.y = 70*Math.sin(timeForJupiter) + 0;
    asteroidBelt.position.x = 0
    asteroidBelt.position.y = 0
    saturnRings.position.x = 105*Math.cos(timeForSaturn) + 0;
    saturnRings.position.y = 110*Math.sin(timeForSaturn) + 0;
    saturn.position.x = 105*Math.cos(timeForSaturn) + 0;
    saturn.position.y = 110*Math.sin(timeForSaturn) + 0;
    uranus.position.x = 120*Math.cos(timeForUranus) + 0;
    uranus.position.y = 125*Math.sin(timeForUranus) + 0;
    uranusRings.position.x = 120*Math.cos(timeForUranus) + 0;
    uranusRings.position.y = 125*Math.sin(timeForUranus) + 0;
    neptune.position.x = 130*Math.cos(timeForNeptune) + 0;
    neptune.position.y = 135*Math.sin(timeForNeptune) + 0;
    pluto.position.x = 140*Math.cos(timeForPluto) + 0;
    pluto.position.y = 145*Math.sin(timeForPluto) + 0;
    
    
    
    
}

function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    animate();    
    orbitControls.update();
}

function createScene(canvas)
{
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color
    scene.background = new THREE.TextureLoader().load( "images/space.jpg" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 0.5, 40000);
    camera.position.set(0, -50, 100);
    scene.add(camera);

    SolarSystem = new THREE.Object3D;
    SolarSystem.position.set(0, 0, 0);

    // Add a directional light to show off the objects
    var light = new THREE.PointLight(0xffffff, 1, 10000);

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    var ambientLight = new THREE.AmbientLight(0xffcc00, 0.5);
    scene.add(ambientLight);
    
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    //Sun Creation
    var textureUrl = "images/sun.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshBasicMaterial({map: texture})
    var geometry = new THREE.SphereGeometry(20, 32, 32);
    sun = new THREE.Mesh(geometry, material);
    SolarSystem.add(sun);
    //Planet Creation
    mercury = createPlanet(1, "images/mercury.jpg", "", "", "images/mercurybump.jpg");
    venus = createPlanet(1.5, "images/venus.jpg", "", "", "images/venusbump.jpg");
    earthAndItsMoons = createPlanet(1.5, "images/earth.jpg", "images/earthnormal.jpg", "images/earthspecular.jpg", "", 1);
    marsAndItsMoons = createPlanet(1, "images/mars.jpg", "", "", "images/marsbump.jpg", 2);
    jupiterAndItsMoons = createPlanet(10, "images/jupiter.png", "", "", "", 79)
    jupiter = jupiterAndItsMoons[0];
    jupiterMoons = jupiterAndItsMoons[1];
    saturn = createPlanet(10, "images/saturn.png", "", "", "")
    uranus = createPlanet(5, "images/uranus.png", "", "", "")
    neptune = createPlanet(5, "images/neptune.jpg", "", "", "")
    pluto = createPlanet(1, "images/pluto.png", "images/plutonormal.png", "", "")
    mars = marsAndItsMoons[0]
    marsMoon = marsAndItsMoons[1]
    earth = earthAndItsMoons[0];
    earthMoon = earthAndItsMoons[1];
    
    var geometry = new THREE.RingGeometry(5, 20, 32);
    var saturnRingsTexture = new THREE.TextureLoader().load("images/saturnRing.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    saturnRings = new THREE.Mesh(geometry, saturnMaterials);
    
    var geometry = new THREE.RingGeometry(0, 8, 32);
    var uranusRingsTexture = new THREE.TextureLoader().load("images/uranusRing.png");
    var uranusMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    uranusRings = new THREE.Mesh(geometry, saturnMaterials);


    sun.rotation.x = Math.PI /2;

    // Create a group for the sphere and the planets
    sphereEllipse = new THREE.Object3D;
    Planets = new THREE.Object3D;
    //Set the Ellipses
    sphereEllipse.add(createEllipseForObjects(22, 24));
    sphereEllipse.add(createEllipseForObjects(33, 30));
    sphereEllipse.add(createEllipseForObjects(38, 48));
    sphereEllipse.add(createEllipseForObjects(45, 53));
    sphereEllipse.add(createEllipseForObjects(75, 70));
    sphereEllipse.add(createEllipseForObjects(105, 110));
    sphereEllipse.add(createEllipseForObjects(120, 125));
    sphereEllipse.add(createEllipseForObjects(130, 135));
    sphereEllipse.add(createEllipseForObjects(140, 145));
    //Set the planets to the planet group.
    Planets.add(mercury);
    Planets.add(venus);
    Planets.add(earth);
    Planets.add(earthMoon);
    Planets.add(mars);
    Planets.add(marsMoon);
    Planets.add(jupiter);
    Planets.add(jupiterMoons);
    Planets.add(saturnRings);
    Planets.add(saturn);
    Planets.add(uranus);
    Planets.add(uranusRings);
    Planets.add(neptune);
    Planets.add(pluto);
    SolarSystem.add(sphereEllipse);
    SolarSystem.add(Planets);
    
    //Creation of asteroid belt (In this part of the code i'd like to thank my friend Enrique Lira, for explaining me how to add the asteroid belt).
    asteroidBelt = new THREE.Object3D();
    Planets.add(asteroidBelt);
      for(var x=0; x<1000; x++) {
        timeForNeptune += 0.0004;
          var asteroidSize = getRandomArbitrary(0.005, 0.5),
              asteroidShape1 = getRandomArbitrary(4, 10),
              asteroidShape2 = getRandomArbitrary(4, 10),
              asteroidPositionY = getRandomArbitrary(-2.7, 2.7);
          var asteroid = new THREE.Mesh(new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
          asteroid.position.z = asteroidPositionY;
          var radians = getRandomArbitrary(0, 360) * Math.PI / 2;
          asteroid.position.x = Math.cos(radians) * 60;
          asteroid.position.y = Math.sin(radians) * 60;
          asteroidBelt.add(asteroid);
      }
    //Add the entire Solar System
    scene.add(SolarSystem);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createPlanet (planetSize, planetMapURL, planetNormalMapUrl, planetSpecularMapUrl, planetBumpUrl, nOfMoons){
  var maps = {}
  if(planetNormalMapUrl != ''){
    normalMapLoad = new THREE.TextureLoader().load(planetNormalMapUrl);
    maps['normalMap'] = normalMapLoad;
  }
  if(planetSpecularMapUrl != ''){
    specularMapLoaded = new THREE.TextureLoader().load(planetSpecularMapUrl);
    maps['specularMap'] = specularMapLoaded;
  }
  if(planetBumpUrl != ''){
    bumpMapLoaded = new THREE.TextureLoader().load(planetBumpUrl);
    maps['bumpMap'] = bumpMapLoaded;
    maps['bumpScale'] = 1.5;
  }
  mapLoaded = new THREE.TextureLoader().load(planetMapURL);
  geometry = new THREE.SphereGeometry(planetSize, 40, 40);
  maps['map'] = mapLoaded;
  var planetMaterials = new THREE.MeshPhongMaterial(maps);
  planet = new THREE.Mesh(geometry, planetMaterials);
  planet.rotation.x = Math.PI /2;
  if(planetMapURL != "images/earth.jpg" && nOfMoons != null){
    planet = addMoon(planet, 0.1, nOfMoons, planetSize);
  }else{
    moon = addMoon(planet, 0.5, nOfMoons, planetSize);
  }
  if(nOfMoons != null){
    return [planet, moon];
  }
  else {
    return planet;
  }
}

function addMoon(planet, size, nOfMoons, planetSize) {
  planetSize += 0.5;
  PlanetGroup = new THREE.Object3D;
  for (var i = 0; i < nOfMoons; i++){
    var moon = new THREE.Mesh(new THREE.SphereGeometry(size, 50, 50), new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
    if(size == 0.5){
      moon.position.x = planet.position.x + 2;
      moon.position.y = planet.position.y + 0.5;
      moon.position.z = planet.position.z + 1;
    }else{
      moon.position.x = planet.position.x + getRandomArbitrary(-planetSize, planetSize);
      moon.position.y = planet.position.y + getRandomArbitrary(-planetSize, planetSize);
      moon.position.z = planet.position.z + getRandomArbitrary(-planetSize, planetSize);
    }
    moons.push(moon);
    PlanetGroup.add(moon);
  }
  PlanetGroup.add(planet)
  return PlanetGroup;
  
}

function createEllipseForObjects(cord1, cord2){
  var planetPath = new THREE.EllipseCurve(0,0,cord1,cord2,0,  2 * Math.PI,false,0);
  var points = planetPath.getPoints(50);
  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  var material = new THREE.MeshPhongMaterial({color: 'white', });
  var ellipse = new THREE.Line(geometry, material);
  return ellipse;
  
}

