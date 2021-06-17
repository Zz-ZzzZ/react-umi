export type MenuType = boolean;

export default {
  namespace: 'isShowDetailMenu',
  state: true,
  reducers: {
    toggle: (state: MenuType) => !state,
  },
};
