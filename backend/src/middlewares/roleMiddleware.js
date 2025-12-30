const roleMiddleware = (...roles) => {
  const allowed = roles.map(r => String(r).toLowerCase());
  return (req, res, next) => {
    const role = String(req.user?.role || '').toLowerCase();
    console.log('auth user role:', req.user?.role, 'allowed:', allowed);
    if (!role) return res.status(401).json({ message: 'Unauthorized' });
    if (!allowed.includes(role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export default roleMiddleware;