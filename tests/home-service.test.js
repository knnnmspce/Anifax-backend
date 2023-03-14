const { showTitles } = require('../service/home-service');
const { retrieveAllTitles } = require('../daos/anime-dao');
const UnableToLoadError = require('../errors/loading-error');

jest.mock('../daos/anime-dao', () => {
    return{
        retrieveAllTitles: jest.fn()
    }
});

describe('Testing home-service functionality', () => {
    test('A resolved promise returns all the items from the database', async () => {
        retrieveAllTitles.mockReturnValueOnce(Promise.resolve({
            Items: [
                {
                    title: 'Shakugana no Shonen',
                    trailer: 'youtube.com/snstrailer',
                    rating: '4/10',
                    description: 'a shonen anime'
                },
                {
                    title: 'Death Note',
                    trailer: 'youtube.com/deathnotetrailer',
                    rating: '9/10',
                    description: 'a thriller anime'
                }
            ]
        }));

        const titles = await showTitles();
        expect(titles).toStrictEqual(
            [
                {
                    title: 'Shakugana no Shonen',
                    trailer: 'youtube.com/snstrailer',
                    rating: '4/10',
                    description: 'a shonen anime'
                },
                {
                    title: 'Death Note',
                    trailer: 'youtube.com/deathnotetrailer',
                    rating: '9/10',
                    description: 'a thriller anime'
                }
            ]
        );
    });

    test('A rejected promise return UnableToLoadError', async () => {
        retrieveAllTitles.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0 }));

        await expect(showTitles()).rejects.toThrow(UnableToLoadError);
    });
})