import mockjs from 'mockjs';
import { simulationRequestDelayTimer } from './timer';
let mockTable = mockjs.mock({
  'list|101': [
    {
      'id|+1': 1,
      city: () => mockjs.Random.county(true),
      email: '@email',
      name: '@name',
      createTime: '@datetime',
    },
  ],
});
export default {
  'GET /api/getTable': (req, res) => {
    simulationRequestDelayTimer(() =>
      res.send({
        result: true,
        list: mockTable.list,
      }),
    );
  },
  'POST /api/delTableRowById': (req, res) => {
    const {
      body: { id },
    } = req;

    simulationRequestDelayTimer(() => {
      if (id) {
        const filter = mockTable.list.filter((fItem) => fItem.id !== id);
        if (filter.length > 0) {
          mockTable.list = filter;
          res.send({ result: true });
        } else {
          res.send({ result: false });
        }
      }
    });
  },
  'POST /api/updateTableRowById': (req, res) => {
    const {
      body: { id, name, email, city },
    } = req;
    if (id) {
      const row = mockTable.list.findIndex((item) => item.id === id);
      if (row !== -1) {
        mockTable.list[row].name = name;
        mockTable.list[row].email = email;
        mockTable.list[row].city = city;
        res.send({ result: true });
      }
    }
  },
};
