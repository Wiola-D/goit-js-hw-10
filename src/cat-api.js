import axios from 'axios';
const loader = document.querySelector('.loader');

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_EmtpjuH4ROXdixrn72kWUL43kP2CtMmEewC1uPF13Fw1D11qeAzDTWgkcAyYTLsK';
  try {
    return axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(res => res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};
