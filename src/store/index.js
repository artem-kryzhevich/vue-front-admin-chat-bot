import { createStore } from 'vuex'
import main from "@/store/modules/main";
import roles from "@/store/modules/roles";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    }
  },
  modules: {
    main,
    roles,
  },
})
