import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }

    static async listRestaurant() {
        const response = await fetch(API_ENDPOINT.RESTAURANT);
        const responseJson = await response.json();
        return responseJson;
    }
}

export default RestaurantDbSource;
