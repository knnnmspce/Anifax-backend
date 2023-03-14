module.exports = class UnableToLoadError extends Error{
    constructor(message){
        super(message);
        this.name = 'UnableToLoadError';
    }
};