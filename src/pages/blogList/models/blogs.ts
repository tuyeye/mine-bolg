import { queryArticleList } from '../services';

export default {
    namespace: 'blogList',
    state: {
        data: [],
        loading: false,
        lostConnect: false,
        pageNum: 0,
        pageSize:5,
        total: 0
    },
    effects: {
        *fetch({ payload }: any, { call, put }: any) {
            yield put({ type: "setLoading" });
            const res = yield call(queryArticleList, payload);
            if (!res) yield put({ type: "lostConnect" });
            else yield put({ type: "saveData", payload: res });
        }
    },
    reducers: {
        setLoading: (state: any) => {
            return {
                ...state,
                loading: true
            }
        },
        lostConnect: (state: any) => {
            return {
                ...state,
                loading: false,
                lostConnect: true
            }
        },
        saveData: (state: any, { payload }: any) => {
            return {
                ...state,
                loading:false,
                lostConnect:false,
                ...payload
            }
        }
    },
};