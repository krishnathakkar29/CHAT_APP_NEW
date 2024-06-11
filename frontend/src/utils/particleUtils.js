// const MIN_RADIUS = 50; // Increase the radius to cover the whole background
// const MAX_RADIUS = 100; // Increase the radius to cover the whole background
// const DEPTH = 5; // Increase depth for more visible rotation effect
// const LEFT_COLOR = "6366f1";
// const RIGHT_COLOR = "8b5cf6";
// const NUM_POINTS = 2500;

// const getGradientStop = (ratio) => {
//   ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

//   const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * (1 - ratio)
//   );
//   const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * ratio
//   );
//   const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
//   const color = ci
//     .reduce((a, v) => (a << 8) + v, 0)
//     .toString(16)
//     .padStart(6, "0");

//   return `#${color}`;
// };

// const calculateColor = (x) => {
//   const maxDiff = MAX_RADIUS * 2;
//   const distance = x + MAX_RADIUS;

//   const ratio = distance / maxDiff;

//   const stop = getGradientStop(ratio);
//   return stop;
// };

// const randomFromInterval = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

// export const pointsInner = Array.from(
//   { length: NUM_POINTS },
//   (v, k) => k + 1
// ).map((num) => {
//   const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
//   const randomAngle = Math.random() * Math.PI * 2;

//   const x = Math.cos(randomAngle) * randomRadius;
//   const y = Math.sin(randomAngle) * randomRadius;
//   const z = randomFromInterval(-DEPTH, DEPTH);

//   const color = calculateColor(x);

//   return {
//     idx: num,
//     position: [x, y, z],
//     color,
//   };
// });

// export const pointsOuter = Array.from(
//   { length: NUM_POINTS / 4 },
//   (v, k) => k + 1
// ).map((num) => {
//   const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
//   const angle = Math.random() * Math.PI * 2;

//   const x = Math.cos(angle) * randomRadius;
//   const y = Math.sin(angle) * randomRadius;
//   const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

//   const color = calculateColor(x);

//   return {
//     idx: num,
//     position: [x, y, z],
//     color,
//   };
// });

// particleUtils.js
// const MIN_RADIUS = 50;
// const MAX_RADIUS = 100;
// const DEPTH = 10; // Increased depth for more pronounced rotation effect
// const LEFT_COLOR = "6366f1";
// const RIGHT_COLOR = "8b5cf6";
// const NUM_POINTS = 2500;

// const getGradientStop = (ratio) => {
//   ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

//   const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * (1 - ratio)
//   );
//   const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * ratio
//   );
//   const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
//   const color = ci
//     .reduce((a, v) => (a << 8) + v, 0)
//     .toString(16)
//     .padStart(6, "0");

//   return `#${color}`;
// };

// const calculateColor = (x) => {
//   const maxDiff = MAX_RADIUS * 2;
//   const distance = x + MAX_RADIUS;

//   const ratio = distance / maxDiff;

//   const stop = getGradientStop(ratio);
//   return stop;
// };

// const randomFromInterval = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

// export const pointsInner = Array.from(
//   { length: NUM_POINTS },
//   (v, k) => k + 1
// ).map((num) => {
//   const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
//   const randomAngle = Math.random() * Math.PI * 2;

//   const x = Math.cos(randomAngle) * randomRadius;
//   const y = Math.sin(randomAngle) * randomRadius;
//   const z = randomFromInterval(-DEPTH, DEPTH);

//   const color = calculateColor(x);

//   return {
//     idx: num,
//     position: [x, y, z],
//     color,
//   };
// });

// export const pointsOuter = Array.from(
//   { length: NUM_POINTS / 4 },
//   (v, k) => k + 1
// ).map((num) => {
//   const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
//   const angle = Math.random() * Math.PI * 2;

//   const x = Math.cos(angle) * randomRadius;
//   const y = Math.sin(angle) * randomRadius;
//   const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

//   const color = calculateColor(x);

//   return {
//     idx: num,
//     position: [x, y, z],
//     color,
//   };
// });

// particleUtils.js
const MIN_RADIUS = 50;
const MAX_RADIUS = 100;
const DEPTH = 10;
const LEFT_COLOR = "6366f1";
const RIGHT_COLOR = "8b5cf6";
const NUM_POINTS = 7000; //

const randomFromInterval = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getGradientStop = (ratio) => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
  );
  const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * ratio
  );
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

const calculateColor = (x) => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;

  const ratio = distance / maxDiff;

  const stop = getGradientStop(ratio);
  return stop;
};

export const pointsInner = [];
export const pointsOuter = [];

// Create pointsInner array
for (let i = 0; i < NUM_POINTS; i++) {
  const angle = (i / NUM_POINTS) * Math.PI * 2;
  const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
  const randomDepth = randomFromInterval(-DEPTH, DEPTH);

  const x = Math.cos(angle) * randomRadius;
  const y = Math.sin(angle) * randomRadius;
  const z = randomDepth;

  const color = calculateColor(x);

  pointsInner.push({
    idx: i + 1,
    position: [x, y, z],
    color,
  });
}

// Create pointsOuter array
for (let i = 0; i < NUM_POINTS / 4; i++) {
  const angle = (i / (NUM_POINTS / 4)) * Math.PI * 2;
  const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
  const randomDepth = randomFromInterval(-DEPTH * 10, DEPTH * 10);

  const x = Math.cos(angle) * randomRadius;
  const y = Math.sin(angle) * randomRadius;
  const z = randomDepth;

  const color = calculateColor(x);

  pointsOuter.push({
    idx: i + 1,
    position: [x, y, z],
    color,
  });
}
