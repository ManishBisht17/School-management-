module.exports = (req, res, next) => {
    const principalHeader = req.get('X-Principal');
    if (!principalHeader) {
      return res.status(401).json({ error: 'Missing X-Principal header' });
    }
    
    try {
      req.principal = JSON.parse(principalHeader);
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid X-Principal format' });
    }
  };