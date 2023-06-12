const dateFormat = () => {
    const fecha = new Date();
    const op = {
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        timezone: 'America/Bogota'
    };
    const newDate = fecha.toLocaleString('es-CO', op);
    return newDate;
};

const hourFormat = () => {
    const fecha = new Date();
    const op = {
        hour:'2-digit',
        minute:'2-digit',
        timezone: 'America/Bogota'
    };
    const newHour = fecha.toLocaleString('es-CO', op);
    return newHour;
};

module.exports = {
    dateFormat,
    hourFormat
}