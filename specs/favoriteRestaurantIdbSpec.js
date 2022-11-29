/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantIdb.getAllRestaurant()).forEach(async (data) => {
            await FavoriteRestaurantIdb.deleteRestaurant(data.id);
        });
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
