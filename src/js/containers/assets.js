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
