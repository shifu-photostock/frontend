export function showMessage(title, status) {
  return {
    type: 'SHOW_MESSAGE',
    title,
    status
  }
}

export function hideMessage() {
  return {
    type: 'HIDE_MESSAGE'
  }
}

export function showPhotoModal(filename) {
  return {
    type: 'SHOW_PHOTO_MODAL',
    filename,
  }
}

export function hidePhotoModal() {
  return {
    type: 'HIDE_PHOTO_MODAL'
  }
}

export function showLikesDrawer(likes) {
  return {
    type: 'SHOW_LIKES_DRAWER',
    likes
  }
}

export function hideLikesDrawer(likes) {
  return {
    type: 'HIDE_LIKES_DRAWER'
  }
}
