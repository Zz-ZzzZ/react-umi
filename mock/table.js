import mockjs from 'mockjs';
let mockTable = mockjs.mock({
  'list|100': [
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
  '/api/getTable': {
    result: true,
    list: mockTable.list,
  },
};
