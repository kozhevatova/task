const input = document.querySelector('.tel-form__input');
const relatedLink = document.getElementById(input.dataset.relatedLink);

const setCursorPosition = (pos, elem) => {
  elem.focus();
  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    const range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

function mask(event) {
  const matrix = '+7 (___) ___-__-__';
  let i = 0;
  const defaultValue = matrix.replace(/\D/g, '');
  let currentValue = this.value.replace(/\D/g, '');

  if (defaultValue.length >= currentValue.length) {
    currentValue = defaultValue;
  }

  this.value = matrix.replace(/./g, (tel) => {
    let result = '';
    if (/[_\d]/.test(tel) && i < currentValue.length) {
      result = currentValue.charAt(i++);
    } else if (i >= currentValue.length) {
      result = '';
    } else {
      result = tel;
    }
    return result;
  });

  if (event.type === 'blur' && this.value.length === 2) {
    this.value = '';
  } else {
    setCursorPosition(this.value.length, this);
  }

  if (this.value.length === 18) {
    relatedLink.innerText = `Позвонить на ${this.value}`;
    relatedLink.href = `tel:${this.value}`;
    relatedLink.style.color = 'rgb(119,221,119)';
  }
}

input.addEventListener('input', mask, false);
input.addEventListener('focus', mask, false);
input.addEventListener('blur', mask, false);
