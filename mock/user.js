export default {
  'POST /api/login': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const timer = setTimeout(() => {
      const { body } = req;
      if (body.username === 'admin' && body.password === 'admin') {
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
      clearTimeout(timer);
    }, 1000);
  },
  'GET /api/getUser': {
    username: 'admin123',
    tel: '17348666666',
    age: 23,
  },
};
