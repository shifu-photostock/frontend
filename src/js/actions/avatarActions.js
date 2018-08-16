import { deletePhoto } from './photosActions';

export function deleteAvatar() {
  return (dispatch, getState) => {
    let avatar = getState().user.avatar;
    if (!avatar) return;

    dispatch(deletePhoto(avatar));
    dispatch(avatarDeleted());
  }
}

export function avatarDeleted() {
  return {
    type: 'AVATAR_DELETED'
  }
}

export function uploadStart() {
  return {
    type: 'UPLOAD_START'
  }
}

export function uploadEnd() {
  return {
    type: 'UPLOAD_END'
  }
}
