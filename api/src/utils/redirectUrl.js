/**
 * Redirection URL
 * @param {*} req
 * @param {*} res
 */
const redirectUrl = (req, res)=>{
    res.redirect('/api/customer');
}

module.exports = {
    redirectUrl,
}