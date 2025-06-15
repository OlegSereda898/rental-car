export const getUniqueBrands = (cars) => {
  if (!Array.isArray(cars)) return [];

  const brandSet = new Set();
  cars.forEach((car) => {
    if (car.brand) {
      brandSet.add(car.brand);
    }
  });
  return Array.from(brandSet).sort();
};
