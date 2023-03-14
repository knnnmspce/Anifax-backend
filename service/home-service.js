const { retrieveAllTitles } = require('../daos/anime-dao');
const UnableToLoadError = require('../errors/loading-error');

async function showTitles(){
    const data = await retrieveAllTitles();
    const titles = data.Items;

    if(titles.length === 0){
        throw new UnableToLoadError('There was a problem with loading the titles');
    }

    return titles
}

module.exports = {
    showTitles
};