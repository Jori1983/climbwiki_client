import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        user: {
            name: 'nobody',
            id: -1,
            gradeTyp: 'UIAA',
        },
        addClimb: {
            name: '',
            comment: '',
            grade: '',
            gradeType: '',
            creator: '',
            creatorId: -1
        }

    }
});