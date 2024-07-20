import Parse from "parse";

//get info for genres
export const getAllGenres = async () => {
    const Genre = Parse.Object.extend("Genre");
    const query = new Parse.Query(Genre);
    return query.find().then((results) => {
        return results;
    });
};
