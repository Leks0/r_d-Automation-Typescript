import { expect } from 'chai';
import { TheCatApi } from '../src/service/the-cat-api.service';
import { config } from '../src/config';
import { ImageDto } from '../src/models/image.dto';
//import { VoteDto } from '../src/models/vote.dto';
//import { FavoriteDto } from '../src/models/favorite.dto';

/**
 * Логіка перевірки інтеграції:
 * 1. Отримую існуюче зображення;
 * 2. Голосую за існуюче зображення - 200 + voteId;
 * 3. Голосую за неіснуюче зображення - 400 + !voteId
 * 4. Додаю існуюче зображення до вибраного - 200 + favouriteId;
 * 5. Додаю існуюче зображення до вибраного - 400 + !favouriteId;
 * 6. Перевіряю, що зображення додане до вибраного;
 */

describe('TheCatAPI Integration Tests', function () {
    this.timeout(config.test.timeout);

    const api = new TheCatApi(config.api.baseUrl, config.api.apiKey);
    let image: ImageDto;
    let favoriteId: number;
    let voteId: number;
    let nonExistedImagefavoriteId: number;
    const subId = `test-${new Date().toISOString().replace(/[-:.TZ]/g, '')}`;
    const nonExistingImageId = `unknownIdThatNotExisting-${new Date().toISOString().replace(/[-:.TZ]/g, '')}`;

    //1. Отримую існуюче зображення;
    it('should fetch images and select one', async () => {
        const response = await api.getMyImages();
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array').that.is.not.empty;

        image = response.data[0];
        expect(image).to.have.property('id');
    });

    //2. Не можу отримати зображення за неіснуючим ідентифікатором
    it('should fail to fetch non-existing image', async () => {
        const response = await api.getImageById(nonExistingImageId);
        expect(response.status).to.be.oneOf([400, 404]);
    });

    //3.Голосую за існуюче зображення
    it('should successful voting for existing image', async () => {
        const response = await api.voteForImage(image.id, subId, 1);
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.data).to.have.property('id');
        voteId = response.data.id;
        //console.log(voteId);
    });

    // 4. Перевіряю, що голос за існуюче зображення є в списку.
    it('should confirm vote exists in vote list', async () => {
        const response = await api.getVotes(subId);
        expect(response.status).to.equal(200);

        const vote = response.data.find((v) => v.id === voteId);
        //console.log(vote);
        expect(vote).to.exist;
        expect(vote!.image_id).to.equal(image.id);
        expect(vote!.image.id).to.equal(image.id);
        expect(vote!.image.url).to.equal(image.url);
        expect(vote!.value).to.equal(1);
    });
    it('should confirm vote exists where get definite vote', async () => {
        const response = await api.getVoteById(voteId);
        //console.log(response);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', voteId);
        expect(response.data.image_id).to.equal(image.id);
        expect(response.data.value).to.equal(1);
    });

    //5. Голосую за НЕіснуюче зображення
    it('should UNsuccessful voting for non-existing image', async () => {
        const response = await api.voteForImage(nonExistingImageId, subId, 1);

        expect(response.status).to.equal(400);
        expect(response.data).to.not.have.property('id');
    });

    // 6. Додаю існуюче зображення до вибраного
    it('should add existing image to favorites successfully', async () => {
        const response = await api.addImageToFavorites(image.id, subId);
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.data).to.have.property('id');
        favoriteId = response.data.id;
    });

    // 7. Додаю НЕіснуюче зображення до вибраного
    it('should add non-existing image to favorites UNsuccessfully', async () => {
        const response = await api.addImageToFavorites(nonExistingImageId, subId);
        if (response.data.id) {
            nonExistedImagefavoriteId = response.data.id;
        };
        //console.log(favoriteId);
        expect(response.status).to.equal(400);
        expect(response.data).to.not.have.property('id');
    });

    //8. Перевіряю, що існуюче зображення є у вибраному
    it('should confirm existing image is in favorites', async () => {
        const response = await api.getFavorites(subId);
        expect(response.status).to.equal(200);

        const favorite = response.data.find(f => f.id === favoriteId);
        //console.log(favorite?.image.id);
        expect(favorite).to.exist;
        expect(favorite!.image_id).to.equal(image.id);
        expect(favorite!.image.id).to.equal(image.id);
        expect(favorite!.image.url).to.equal(image.url);
    });

    it('should confirm non-existed image is not in favorites', async () => {
        const response = await api.getFavorites(subId);
        expect(response.status).to.equal(200);

        const favorite = response.data.find(f => f.id === nonExistedImagefavoriteId);
        expect(favorite).to.be.undefined;
    });

    // 9. Видалити імедж з вибраного
    it('should remove image from favorites successfully', async () => {
        const response = await api.removeFavorite(favoriteId);
        expect(response.status).to.equal(200);
        expect(response.data.message).to.match(/SUCCESS/i);
    });

    // 10. Перевірити, що імедж видалено з вибраного
    it('should confirm removal from favorites', async () => {
        const response = await api.getFavorites(subId);
        expect(response.status).to.equal(200);

        const favorite = response.data.find(f => f.id === favoriteId);
        expect(favorite).to.be.undefined;
    });
});
