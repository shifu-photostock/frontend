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
