import {FILE_TYPES} from './data.js';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhoto = document.querySelector('.ad-form__photo');
const photos = [];

const startListenerPreview = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', () => {
    Array.from(photoChooser.files).forEach((file) => {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          previewPhoto.style.display = 'flex';
          const photo = document.createElement('img');
          photo.style.height = '70px';
          photo.style.width = '70px';
          photo.src = reader.result;
          previewPhoto.appendChild(photo);
          photos.push(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  });
};

export {startListenerPreview};
