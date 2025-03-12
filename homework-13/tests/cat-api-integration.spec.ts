import { expect } from 'chai';
import { TheCatApi } from '../src/service/the-cat-api.service';
import { config } from '../src/config';
import { ImageDto } from '../src/models/image.dto';
import { VoteDto } from '../src/models/vote.dto';
import { FavoriteDto } from '../src/models/favorite.dto';

describe('TheCatAPI Integration Tests', function () {
    this.timeout(config.test.timeout);

    const api = new TheCatApi(config.api.baseUrl, config.api.apiKey);
    let image: ImageDto;
    let favoriteId: number;
    let voteId: number;
    const subId = `test-${new Date().toISOString().replace(/[-:.TZ]/g, '')}`;
    const nonExistingImageId = `unknownIdThatNotExisting-${new Date().toISOString().replace(/[-:.TZ]/g, '')}`;

    it('should fetch images and select one', async () => {
        const images: ImageDto[] = await api.getMyImages();
        expect(images).to.be.an('array').that.is.not.empty;
        image = images[0];
        expect(image.id).to.be.a('string');
    });

    it('should return 400 when requesting non-existing image', async () => {
        try {
            await api.getImageById(nonExistingImageId);
            throw new Error('Request should have failed, but it succeeded');
        } catch {
            expect(api.getLastResponseStatus()).to.equal(400);
        }
    });

    it('should vote for an image', async () => {
        const response = await api.voteForImage(image.id, subId, 1);
        expect(response).to.have.property('id');
        voteId = response.id;
    });

    it('should return 200 when voting for non-existing image', async () => {
        try {
            await api.voteForImage(nonExistingImageId, subId, 1);
            throw new Error('Request should have failed, but it succeeded');
        } catch {
            expect(api.getLastResponseStatus()).to.be.oneOf([200, 201]);
        }
    });

    it('should verify the vote exists', async () => {
        const votes: VoteDto[] = await api.getVotes(subId);
        const foundVote = votes.find(v => v.id === voteId);
        expect(foundVote).to.exist;
        expect(foundVote!.image_id).to.equal(image.id);
        expect(foundVote!.value).to.equal(1);
    });

    it('should add the image to favorites', async () => {
        const response = await api.addImageToFavorites(image.id, subId);
        expect(response).to.have.property('id');
        favoriteId = response.id;
    });

    it('should return 200 when adding non-existing image to favorites', async () => {
        try {
            await api.addImageToFavorites(nonExistingImageId, subId);
            throw new Error('Request should have failed, but it succeeded');
        } catch {
            expect(api.getLastResponseStatus()).to.be.oneOf([200, 201]);
        }
    });

    it('should verify the image is in favorites', async () => {
        const favorites: FavoriteDto[] = await api.getFavorites(subId);
        const foundFavorite = favorites.find(f => f.id === favoriteId);
        expect(foundFavorite).to.exist;
        expect(foundFavorite!.image_id).to.equal(image.id);
    });

    it('should remove the image from favorites', async () => {
        const response = await api.removeFavorite(favoriteId);
        expect(response).to.have.property('message').that.includes('SUCCESS');
    });

    it('should confirm the favorite was removed', async () => {
        const favorites: FavoriteDto[] = await api.getFavorites(subId);
        const foundFavorite = favorites.find(f => f.id === favoriteId);
        expect(foundFavorite).to.be.undefined;
    });
});
