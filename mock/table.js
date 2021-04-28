import mockjs from 'mockjs';
let mockTable = mockjs.mock({
  'list|101': [
    {
      id: '@id',
      city: () => mockjs.Random.county(true),
      email: '@email',
      name: '@name',
      createTime: '@datetime',
    },
  ],
});
export default {
  'GET /api/getTable': (req, res) => {
    res.send({
      result: true,
      list: mockTable.list,
    });
  },
  'POST /api/delTableRowById': (req, res) => {
    const {
      body: { id },
    } = req;

    const timer = setTimeout(() => {
      if (id) {
        const filter = mockTable.list.filter((fItem) => fItem.id !== id);
        if (filter.length > 0) {
          mockTable.list = filter;
          res.send({ result: true });
        } else {
          res.send({ result: false });
        }
        clearTimeout(timer);
      }
    }, 1000);
  },
  'POST /api/updateTableRowById': (req, res) => {
    const {
      body: { id, info },
    } = req;
    if (id) {
      const row = mockTable.list.find((item) => item.id === id);
    }
  },
};
