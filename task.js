const input = document.querySelector('.tel-form__input');
const relatedLink = document.getElementById(input.dataset.relatedLink);
const matrix = '+7 (___) ___-__-__';
const defaultValue = matrix.replace(/\D/g, '');
input.value = matrix;

function changeRelatedLink(value) {
  relatedLink.innerText = `Позвонить на ${value}`;
  relatedLink.href = `tel:${value}`;
  relatedLink.style.color = 'rgb(119,221,119)';
}

function mask(event) {
  let i = 0;
  let currentValue = this.value.replace(/\D/g, '');

  if (defaultValue.length >= currentValue.length) {
    currentValue = defaultValue;
  }

  this.value = matrix.replace(/./g, (tel) => {
    if (/[_\d]/.test(tel) && i < currentValue.length) {
      return currentValue.charAt(i++);
    } if (i >= currentValue.length) {
      return '';
    }
    return tel;
  });

  if (event.type === 'blur' && this.value.length === 2) {
    this.value = '';
  }

  if (this.value.length === 18) {
    changeRelatedLink(this.value);
  }
}

input.addEventListener('input', mask, false);
input.addEventListener('focus', mask, false);
input.addEventListener('blur', mask, false);
