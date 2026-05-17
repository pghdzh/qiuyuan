import * as THREE from "three";

/**
 * 仇远·抽象几何背景 (动画修复版)
 * 使用 performance.now() 驱动动画，确保所有几何体、粒子持续运动
 */
export default function initQiuyuanStar(container: HTMLElement): {
  cleanup: () => void;
} {
  // ========== 基础场景 ==========
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050a0c);
  scene.fog = new THREE.FogExp2(0x050a0c, 0.00015);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.5, 12);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // ========== 光照 ==========
  scene.add(new THREE.AmbientLight(0x2e8f74, 0.4));
  const moonLight = new THREE.DirectionalLight(0xcfeee8, 0.8);
  moonLight.position.set(5, 8, 5);
  scene.add(moonLight);
  const fillLight = new THREE.PointLight(0x26785a, 0.5, 20);
  fillLight.position.set(-3, -2, 2);
  scene.add(fillLight);

  // ========== 核心几何体：剑意之核 ==========
  const coreGroup = new THREE.Group();
  const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x2e8f74,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  coreGroup.add(new THREE.Mesh(icoGeo, icoMat));

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xcfeee8,
    emissive: 0x0a1a16,
    roughness: 0.4,
    metalness: 0.7,
  });
  const rings: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.TorusGeometry(2.2 - i * 0.3, 0.03, 16, 100);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = (i * Math.PI) / 3;
    coreGroup.add(ring);
    rings.push(ring);
  }
  scene.add(coreGroup);

  // ========== 外层轨道环 ==========
  const orbitGroup = new THREE.Group();
  const orbitMat = new THREE.MeshStandardMaterial({
    color: 0xb4e6e2,
    emissive: 0x030608,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.3,
  });
  const orbitGeo = new THREE.TorusGeometry(4.5, 0.025, 32, 200);
  const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
  orbitMesh.rotation.x = Math.PI / 3;
  orbitMesh.rotation.z = 0.5;
  orbitGroup.add(orbitMesh);
  const orbitMesh2 = new THREE.Mesh(orbitGeo, orbitMat);
  orbitMesh2.rotation.x = -Math.PI / 4;
  orbitMesh2.rotation.z = -0.8;
  orbitGroup.add(orbitMesh2);
  scene.add(orbitGroup);

  // ========== 粒子系统 ==========
  const particleCount = 800;
  const particlesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const color1 = new THREE.Color(0x2e8f74);
  const color2 = new THREE.Color(0xcfeee8);
  const color3 = new THREE.Color(0xb4e6e2);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const radius = 3.5 + Math.random() * 5;
    positions[i * 3] = Math.cos(theta) * Math.cos(phi) * radius;
    positions[i * 3 + 1] = Math.sin(phi) * radius * 1.5;
    positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * radius;

    const mixColor = color1.clone().lerp(color2, Math.random() * 0.7);
    mixColor.lerp(color3, Math.random() * 0.3);
    colors[i * 3] = mixColor.r;
    colors[i * 3 + 1] = mixColor.g;
    colors[i * 3 + 2] = mixColor.b;
  }
  particlesGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.7,
    })
  );
  scene.add(particles);

  // 中心剑光
  const spark = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xcfeee8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  scene.add(spark);

  // ========== 动画循环（使用 performance.now 确保运动） ==========
  let animationId: number;
  let lastTime = performance.now();

  function animate() {
    animationId = requestAnimationFrame(animate);

    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1); // 限制最大步长
    lastTime = now;

    const elapsed = now * 0.001; // 总秒数

    // 核心组缓慢旋转
    coreGroup.rotation.y += delta * 0.4;
    coreGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.08;

    // 内部环各自旋转
    rings.forEach((ring, i) => {
      ring.rotation.z += delta * (0.9 + i * 0.3);
    });

    // 外层轨道
    orbitGroup.rotation.y += delta * 0.2;
    orbitGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15;

    // 粒子浮动
    particles.rotation.y += delta * 0.1;
    particles.rotation.x = Math.sin(elapsed * 0.25) * 0.04;
    particles.rotation.z += delta * 0.06;

    // 中心光点呼吸
    const pulse = 1 + Math.sin(elapsed * 6) * 0.25;
    spark.scale.setScalar(pulse);

    // 相机微动
    camera.position.x = Math.sin(elapsed * 0.2) * 0.3;
    camera.position.y = 0.5 + Math.cos(elapsed * 0.25) * 0.3;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // ========== 响应式处理 ==========
  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener("resize", onResize);

  // ========== 清理函数 ==========
  function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    renderer.dispose();
    container.removeChild(renderer.domElement);
  }

  return { cleanup };
}
