const initialState = {
  sidebarOpen: false,
};

export const state = () => ({
  initialState,
  sidebarOpen: initialState.sidebarOpen,
});

export const mutations = {
  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
  clearState(state) {
    Object.assign(state, initialState);
  },
};

export const actions = {
  resetState(context) {
    context.commit('clearState');
  },
};
