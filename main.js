// ===== Stars background =====
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.8 + 0.2,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// ===== 3D Earth =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  (window.innerWidth * 0.5) / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.getElementById("earth").appendChild(renderer.domElement);

// Geometry + Textures
const geometry = new THREE.SphereGeometry(5, 64, 64);
const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);
const bumpMap = textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg"
);
const specularMap = textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"
);

const material = new THREE.MeshPhongMaterial({
  map: earthTexture,
  bumpMap: bumpMap,
  bumpScale: 0.05,
  specularMap: specularMap,
  specular: new THREE.Color("grey"),
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 0, 5);
scene.add(pointLight);

camera.position.z = 15;

// Animate Earth
function animateEarth() {
  requestAnimationFrame(animateEarth);
  earth.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animateEarth();

// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
  camera.aspect = (window.innerWidth * 0.5) / window.innerHeight;
  camera.updateProjectionMatrix();
});
