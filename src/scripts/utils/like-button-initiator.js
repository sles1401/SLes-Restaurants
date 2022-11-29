/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import {
    createLikeRestaurantButtonTemplate,
    createUnlikeRestaurantButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, favoriteRestaurant, data }) {
        this._likeButtonContainer = likeButtonContainer;
        this._data = data;
        this._favoriteRestaurant = favoriteRestaurant;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._data;

        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurant.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurant.putRestaurant(this._data);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

        const likeButton = document.querySelector('#likedButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurant.deleteRestaurant(this._data.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
