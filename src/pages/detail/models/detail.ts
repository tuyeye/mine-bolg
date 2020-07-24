import { queryDetail } from '../services';

export default {
    namespace: 'blogDetail',
    state: {
        loading: true,
        data: {},
        notFound: false,
        lostConnect: false
    },
    effects: {
        *fetch({ payload }: any, { call, put }: any) {

            const res = yield call(queryDetail, payload);
            if (!res) yield put({ type: "lostConnect" });
            else {
                if (res.code !== 0) yield put({ type: "notFound" });
                else yield put({ type: "saveData", payload: res.data });
            }
        }
    },
    reducers: {
        notFound: (state: any) => {
            return {
                ...state,
                notFound: true
            }
        },
        saveData: (state: any, { payload }: any) => {
            return {
                ...state,
                loading: false,
                lostConnect: false,
                data:payload
            }
        }
    },
};