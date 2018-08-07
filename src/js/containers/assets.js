export function checkFieldsForEmpty(obj, number) {
  let counter = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key]) {
        counter++;
      }
    }
  }
  return counter === number;
}

export function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
