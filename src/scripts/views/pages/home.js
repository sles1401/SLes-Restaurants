/* eslint-disable import/no-cycle */
import listRestaurant from '../../data/restaurant-source';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'regenerator-runtime'; /* for async await transpile */
import '../../../styles/main.css';
import '../../../styles/responsive.css';

const Home = {
    async render() {
        return `
     <section class="content">
     <div class="latest">
        <h1 class="latest__label">Explore Restaurant</h1>
            <div class="posts">
                <div id="list"></div>
            </div>
     </div>
     </section>
     `;
    },

    async afterRender() {
        const listRestaurants = await listRestaurant.listRestaurant();
        let dataList = '';

        if (listRestaurants.length < 1) {
            dataList += `<style>
             .movie-item__not_found {
                 text-transform: uppercase;
             }
             </style><div class = "movie-item__not__found">Tidak ada restaurant untuk ditampilkan</div>`;
        } else {
            listRestaurants.restaurants.forEach((restaurant) => {
                dataList += `
       <style>
                 
                 /*
                  * content
                  */
 
                 .content {
                    padding: 32px;
                 }
                 
                 /*
                  * post item
                  */
                 
                 .post-item {
                     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                     width: 100%;
                     border-radius: 5px;
                     overflow: hidden;
 
                 }
                 .post-item__content {
                         padding: 16px;
                 }
                 .post-item__thumbnail {
                         width: 100%;
                 }
                 .label_thumbnail {
                     position : relative;
                     z-index : 2;
                     display: inline-block;
                 }
 
                 .post-item__date {
                     font-size: 10px;
                     text-transform: uppercase;
                     color: #999;
                 }
 
                 .post-item__date__author {
                     color: red;
                     text-decoration: none;
                 }
 
                 .post-item__title {
                     font-weight: 500;
                     font-size: 18px;
                     margin-top: 16px;
                     transition: 0.3s opacity;
                 }
 
                 .post-item__title:hover {
                     opacity: 0.5;
                 }
 
                 .post-item__title a {
                     text-decoration: none;
                     color: inherit;
                     display: flex;
                 }
 
                 .post-item__description {
                     margin-top: 16px;
                     font-size: 14px;
                     line-height: 1.5em;
                     text-align: justify;
                 }
                 
             </style>
             
             <article class="post-item">
             <img class="post-item__thumbnail lazyload" data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="Gambar Restoran">
             <div class="post-item__content">
                 <p class="post-item__date">${restaurant.city}    ||     <b> ${restaurant.rating} </b>
                 </p>
                 <h1 class="post-item__title"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h1>
                 <p class="post-item__description">${restaurant.description}...</p>
                 <button type="button" class="buttonMore" id="${restaurant.id}">Read More...</button>
             </div>
             </article>`;
            });
            // eslint-disable-next-line padded-blocks
        }
        document.querySelector('#list').innerHTML = dataList;
    },
};

export default Home;
