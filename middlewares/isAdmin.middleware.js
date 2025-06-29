const isAdmin = (req, res, next) => {
    if (req.staff.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
export default isAdmin;