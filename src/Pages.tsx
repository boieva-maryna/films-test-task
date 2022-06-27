import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import FavouriteFilms from "./pages/FavouriteFilms";
import FilmDetails from "./pages/FilmDetails";
import Home from "./pages/Home";

const Pages: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Home />}/>
          <Route path="wish-list" element={<FavouriteFilms/>}/>
            <Route path=":id" element={<FilmDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
