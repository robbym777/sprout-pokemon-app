export const capitalize = (str?: string) => {
  return (str ?? "")
    .split("-")
    .map((v) => v.replace(/^\w/, (c) => c.toUpperCase()))
    .join(" ");
};

export const idFormatter = (id?: number) => {
  return `#${String(id).padStart(4, "0")}`;
};

export const heightFormatter = (height?: number) => {
  const meter = (height ?? 0) / 10;
  const feet = meter * 3.28084;
  return `${feet.toFixed(1)} ft (${meter} m)`;
};

export const weightFormatter = (weight?: number) => {
  const kilogram = (weight ?? 0) / 10;
  const lbs = kilogram * 2.20462;
  return `${lbs.toFixed(1)} lbs (${kilogram} kg)`;
};
