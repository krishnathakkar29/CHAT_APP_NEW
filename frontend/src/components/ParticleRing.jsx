// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Sphere } from "@react-three/drei";
// import { pointsInner, pointsOuter } from "../utils/particleUtils";

// const ParticleRing = () => {
//   return (
//     <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: -1 }}>
//       <Canvas
//         camera={{
//           position: [0, 0, 50],
//         }}
//         style={{ height: "100vh", width: "100vw", backgroundColor: "#1E293B" }} // Update the background color here
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[1, 1, 1]} />
//         <PointCircle />
//       </Canvas>
//     </div>
//   );
// };

// const PointCircle = () => {
//   const ref = useRef(null);

//   useFrame(({ clock }) => {
//     if (ref.current?.rotation) {
//       ref.current.rotation.y = clock.getElapsedTime() * 0.05; // Rotating around Y-axis
//     }
//   });

//   return (
//     <group ref={ref}>
//       {pointsInner.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//       {pointsOuter.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//     </group>
//   );
// };

// const Point = ({ position, color }) => {
//   return (
//     <Sphere position={position} args={[0.5, 16, 16]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };

// export default ParticleRing;


// ParticleRing.js
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../utils/particleUtils";

const ParticleRing = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: -1 }}>
      <Canvas
        camera={{
          position: [0, 0, 30], // Adjusted camera position to bring particles closer
        }}
        style={{ height: "100vh", width: "100vw", backgroundColor: "#1E293B" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} />
        <PointCircle />
      </Canvas>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.5, 16, 16]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
