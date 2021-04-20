let userInfo = {
  name: 'admin',
  tel: '17348666666',
  address: ['浙江省', '嘉兴市', '南湖区'],
};
export default {
  'POST /api/login': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 模拟pending时间
    const timer = setTimeout(() => {
      const {
        body: { username, password },
      } = req;
      if (username === 'admin' && password === 'admin') {
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
      clearTimeout(timer);
    }, 1000);
  },
  'POST /api/exitLogin': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const timer = setTimeout(() => {
      const {
        body: { username },
      } = req;
      if (username === 'admin') {
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
      clearTimeout(timer);
    }, 1000);
  },
  'GET /api/getUser': userInfo,
  'POST /api/setUser': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const timer = setTimeout(() => {
      const { body } = req;
      if (body.name) {
        for (let key in userInfo) {
          if (body.hasOwnProperty(key)) {
            userInfo[key] = body[key];
          }
        }
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
      clearTimeout(timer);
    }, 1000);
  },
};
