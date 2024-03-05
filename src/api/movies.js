import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = '716cd77ff0688b68c68f98413569fc1a';

const addApiKey = url => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api_key=${apiKey}`;
};

export const getTrendingMoviesApi = async () => {
  try {
    const response = await axios.get(
      addApiKey('trending/all/day?language=en-US')
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieDetailsApi = async movieId => {
  try {
    const response = await axios.get(
      addApiKey(`movie/${movieId}?language=en-US`)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getCastApi = async movieId => {
  try {
    const response = await axios.get(
      addApiKey(`movie/${movieId}/credits?language=en-US`)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching cast:', error);
    throw error;
  }
};

export const getReviewsApi = async movieId => {
  try {
    const response = await axios.get(
      addApiKey(`movie/${movieId}/reviews?language=en-US`)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching cast:', error);
    throw error;
  }
};
