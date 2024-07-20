import Parse from "parse";

//get info for songs
export const getAllSongs = async () => {
    const Song = Parse.Object.extend("Song");
    const query = new Parse.Query(Song);
    return query.find().then((results) => {
        return results;
    });
};
