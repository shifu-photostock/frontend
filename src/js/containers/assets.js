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

export function getPhotoByName(photos, name) {
  let Photo;
  photos.forEach((photo) => {
    if (!photo) return;

    if (photo.filename === name) {
      console.log('Found photo', photo);
      Photo = photo;
    }
  });
  return Photo;
}

export function isLiked(likes, uid) {
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].authorId === uid) return true;
  }
  return false;
}

export function deleteLike(likes, uid) {
  return likes.filter((like) => {
    return like.authorId !== uid;
  })
}
