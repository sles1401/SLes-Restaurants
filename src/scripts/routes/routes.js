/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import Detail from '../views/pages/detail';
import Favorites from '../views/pages/like';
import Home from '../views/pages/home';

const routes = {
    '/': Home,
    '/detail/:id': Detail,
    '/favorites': Favorites,
};

export default routes;
