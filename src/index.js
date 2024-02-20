import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

async function fetchData() {
  try {
    loader.classList.remove('hidden');
    const breedsData = await fetchBreeds();
    renderSelect(breedsData);
    new SlimSelect({
      select: '#single',
      settings: {
        closeOnSelect: true,
        hideSelected: true,
        openPosition: 'auto',
      },
    });
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
}
fetchData();

document.querySelector('.error').style.display = 'none';

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value ="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.innerHTML = markup;
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', async e => {
  try {
    loader.classList.remove('hidden');
    const catData = await fetchCatByBreed(e.target.value).then(data =>
      renderCat(data[0])
    );
  } catch (error) {
    catInfo.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, something went wrong. Please choose another cat breed.'
    );
  }
});

function renderCat(catData) {
  const { url } = catData;
  const { name, temperament, description } = catData.breeds[0];
  const newDiv = `

<img src="${url}" alt="${name}" width="800"/>
<div class="cat-description">
<h2 class="name">${name}</h2>
<p><strong>Description: </strong>
${description}</p>
<p><strong>Temperament: </strong>
${temperament}</p>
</div>
`;
  catInfo.innerHTML = newDiv;
  loader.classList.add('hidden');
}
