/* eslint-disable import/no-cycle */
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurant-source';
import '../../../styles/main.css';
import '../../../styles/responsive.css';
import '../../index';
import { createLikeRestaurantButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
    async render() {
        return `
        <section class="content">
        <div class="latest">
            <h1 class="latest__label">Detail Restaurant</h1>
            <div class="movie post-item__title">
                <div id="detail"></div>
                <div id="likeButtonContainer"></div>
            </div>
        </div>
        </section>
      
    `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();

        let dataDetail = '';
        let listCategory = '';
        let listMakanan = '';
        let listMinuman = '';
        let listReview = '';

        const data = await RestaurantDbSource.detailRestaurant(url.id);

        const likeButtonContainer = document.querySelector('#likeButtonContainer');
        likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        data.restaurant.categories.forEach((restaurant) => {
            listCategory += `
                ${restaurant.name}
            `;
        });
        data.restaurant.menus.foods.forEach((restaurant) => {
            listMakanan += `
                ${restaurant.name},
            `;
        });
        data.restaurant.menus.drinks.forEach((restaurant) => {
            listMinuman += `
                ${restaurant.name},
            `;
        });

        data.restaurant.customerReviews.forEach((restaurant) => {
            listReview += `
            <div class="review-card">
                <p><b>${restaurant.name}</b> - ${restaurant.date}</p>
                <p>${restaurant.review}</p>
            </div>
            `;
        });

        dataDetail += `

        <h2 class="movie__title">${data.restaurant.name}</h2>
        <img class="movie__poster lazyload" src="https://restaurant-api.dicoding.dev/images/medium/${data.restaurant.pictureId}" alt="${data.restaurant.name}" />
        
        <div class="movie__info">
            <h3>Information</h3>
                <h4>Name</h4>
                    <p>${data.restaurant.name}</p>
                <h4>Kota</h4>
                    <p>${data.restaurant.city}</p>
                <h4>Alamat</h4>
                    <p>${data.restaurant.address}</p>
                <h4>Rating</h4>
                    <p>${data.restaurant.rating}</p>
                <h4>Menu</h4>
                    <p>${listCategory}</p>
                <h4>List Makanan</h4>
                    <p>${listMakanan}</p>
                <h4>List Minuman</h4>
                    <p>${listMinuman}</p>
        </div>

        <div class="movie__overview">
            <h3>Overview</h3>
                <p>${data.restaurant.description}</p>
        </div>
        
        
        
        <div class="movie__overview">
            <h2>Review</h2>
                <p>Review Customer</p>
                    <div>${listReview}</div>
        </div>

        `;

        document.querySelector('#detail').innerHTML = dataDetail;

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            favoriteRestaurant: FavoriteRestaurantIdb,
            data: {
                id: data.restaurant.id,
                name: data.restaurant.name,
                description: data.restaurant.description,
                rating: data.restaurant.rating,
                pictureId: data.restaurant.pictureId,
                city: data.restaurant.city,
            },
        });
    },
};

export default Detail;
