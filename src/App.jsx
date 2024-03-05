import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';

const LazyMovieDetails = lazy(() =>
  import('./pages/MovieDetails/MovieDetails')
);
const LazyCast = lazy(() => import('./pages/Cast/Cast'));
const LazyReviews = lazy(() => import('./pages/Reviews/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <LazyMovieDetails />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<h1>Loading Cast...</h1>}>
                <LazyCast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<h1>Loading Reviews...</h1>}>
                <LazyReviews />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
