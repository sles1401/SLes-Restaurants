/* eslint-disable quotes */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', async ({ I }) => {
    I.seeElement('#list');
    I.waitForElement('.movie-item__not__found', 30); // Waktu tunggu selama 30 detik
    I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

    I.amOnPage('/');

    I.seeElement('.post-item__title');
    const firstRest = locate('.post-item__title a').first();
    const firstRestaurant = await I.grabTextFrom(firstRest);

    I.click(firstRest);

    I.seeElement("#likeButton");
    I.click('#likeButton');

    I.amOnPage('/#/favorites');
    I.seeElement('.post-item');

    const likedRestaurant = await I.grabTextFrom('.post-item__title');

    assert.strictEqual(firstRestaurant, likedRestaurant);
});

Scenario('Unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');
    I.amOnPage('/');

    I.seeElement('.post-item__title');
    const firstRest = locate('.post-item__title a').first();
    const firstRestaurant = await I.grabTextFrom(firstRest);

    I.click(firstRest);

    I.seeElement("#likeButton");
    I.click('#likeButton');

    I.amOnPage('/#/favorites');
    I.seeElement('.post-item');

    const likedRestaurant = await I.grabTextFrom('.post-item__title');

    assert.strictEqual(firstRestaurant, likedRestaurant);

    I.amOnPage('/#/favorite');
    I.seeElement('.post-item');

    I.seeElement('.post-item__title a');
    I.click(locate('.post-item__title a').first());

    I.seeElement('#likedButton');
    I.click("#likedButton");
});

// Scenario('searching restaurants', async ({ I }) => {
//     I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

//     I.amOnPage('/');

//     I.seeElement('.post-item__title');

//     const names = [];

//     for (let i = 1; i <= 3; i++) {
//         I.click(locate('.post-item__title a').at(i));
//         I.seeElement('#likeButton');
//         I.click('#likeButton');
//         names.push(await I.grabTextFrom('.post-item__title'));
//         I.amOnPage('/');
//     }

//     I.amOnPage('/#/favorites');
//     I.seeElement('#list');

//     const searchQuery = names[1].substring(1, 3);
//     const matchingRestaurant = names.filter((name) => name.indexOf(searchQuery) !== -1);

//     I.fillField('#list', searchQuery);
//     I.pressKey('Enter');

//     const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item');
//     assert.strictEqual(matchingRestaurant.length, visibleLikedRestaurants);

//     matchingRestaurant.forEach(async (name, index) => {
//         const visibleTitle = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
//         assert.strictEqual(name, visibleTitle);
//     });
// });
