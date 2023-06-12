const minHour = (array) => {
    const min = array.reduce((m, obj) => {
        const recHour = obj.hour;
        if (!m || recHour < m){
            return recHour;
        }
        return m;
    }, null);

    return min;
};



module.exports = {
    minHour,
}