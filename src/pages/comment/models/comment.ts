import { postComment, getComment } from '../services';

export default {
    namespace: 'comment',
    state: {
        data: [],
        loading: false,
        total: 0
    },
    effects: {
        *commit({ payload }: any, { call }: any) {
            yield call(postComment, payload);
        },
        *getList({ payload }: any, { call, put }: any) {
            const res = yield call(getComment, payload);
            yield put({ type: "saveData", payload: res });
        }
    },
    reducers: {
        setLoading: (state: any) => {
            return {
                ...state,
                loading: true
            }
        },
        saveData: (state: any, { payload: { data, total } }: any) => {
            return {
                ...state,
                loading: false,
                data,
                total
            }
        }
    },
};