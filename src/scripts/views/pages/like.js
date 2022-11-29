/* eslint-disable import/no-cycle */

import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Like = {
    async render() {
        return `
    <section class="content">
    <div class="latest">
        <h1 class="latest__label">Your Liked Restaurant</h1>
        <div class="movie">
            <div id="list"></div>
        </div>
    </div>
    </section>
    `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
        let dataList = '';

        if (restaurants.length < 1) {
            dataList += `<style>
            .movie-item__not_found {
                text-transform: uppercase;
            }
            </style><div class = "movie-item__not__found">Tidak ada restaurant untuk ditampilkan</div>`;
        } else {
            restaurants.forEach((data) => {
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
            
                <div class="post-item">
                    <img class="post-item__thumbnail lazyload" src="https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}" alt="${data.name}" title="${data.name}">
                    <div class="post-item__date">${data.city}     ||     <b> ${data.rating} </b></div>
                        <h1 class="post-item__title"><a href="/#/detail/${data.id}">${data.name}</a></h1>
                        <div >${data.description.slice(0, 150)}...</div>
                    </div>
                </div>
                `;
            });
            // eslint-disable-next-line padded-blocks
        }
        document.querySelector('#list').innerHTML = dataList;
    },
};

export default Like;
