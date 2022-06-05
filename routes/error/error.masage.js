module.exports = (res, status, error) => {
    if (error) {
        throw new Error(`Happend error ${error}!`);
    }
    if (status === 400) return res.status(status).json({ massage: `Warning sintacsis error!` });
    if (status === 401) return res.status(status).json({ massage: `Warning you are not autorisation!` });
    if (status === 404) return res.status(status).json({ massage: `Warning request element not find!` });
    if (status === 500) return res.status(status).json({ massage: `Server error, try again later` });
    if (status === 504) return res.status(status).json({ massage: `Data base error, try again later` });
    if (status === 700) return res.status(status).json({ massage: `Finde plase error` });
    return res.status(500).json({ massage: `what happends? bug ))` });
};
