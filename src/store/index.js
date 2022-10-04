import { createStore } from 'vuex'
import main from "@/store/modules/main";
import roles from "@/store/modules/roles";
import { auth } from "@/store/auth.module";
import sections from "@/store/modules/sections";
import users from "@/store/modules/users";
import notify from "@/store/modules/notify";
import bot_info from "@/store/modules/bot_info";
import bot_event from "@/store/modules/bot_event";
import statistics from "@/store/modules/statistics";

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
      auth, main, roles, sections, users, notify, bot_info, bot_event, statistics
  },
})
