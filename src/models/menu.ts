export type MenuType = boolean;

export default {
  namespace: 'isShowDetailMenu',
  state: false,
  reducers: {
    toggle: (state: MenuType) => !state,
  },
};
