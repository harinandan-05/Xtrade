"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/ASCIIEffect.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

export default function AsciiSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let effect: AsciiEffect;
    let controls: TrackballControls;
    let sphere: THREE.Mesh;
    let plane: THREE.Mesh;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Camera
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 100, 250);

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    // Lights
    // Lights
    const light1 = new THREE.PointLight(0xffffff, 2);
    light1.position.set(200, 200, 200);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1);
    light2.position.set(-200, -200, -200);
    scene.add(light2);

    // Smaller sphere (better for ASCII)
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(80, 32, 16),
      new THREE.MeshPhongMaterial({ flatShading: true })
    );
    scene.add(sphere);

    // Plane (smaller & lower)
    plane = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.MeshBasicMaterial({ color: 0x444444 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -90;
    scene.add(plane);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // ASCII Effect
    effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
    effect.setSize(width, height);

    // ASCII style fixes
    effect.domElement.style.color = "white";
    effect.domElement.style.backgroundColor = "black";
    effect.domElement.style.fontFamily = "monospace";
    effect.domElement.style.lineHeight = "10px";
    effect.domElement.style.fontSize = "10px"; // makes sphere visible

    containerRef.current.appendChild(effect.domElement);

    // Controls
    controls = new TrackballControls(camera, effect.domElement);

    // Resize Handler
    const onResize = () => {
      const w = containerRef.current?.clientWidth || width;
      const h = containerRef.current?.clientHeight || height;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      effect.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation
    const animate = () => {
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;

      controls.update();
      effect.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (containerRef.current && effect.domElement) {
        containerRef.current.removeChild(effect.domElement);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[600px] bg-black" />;
}
