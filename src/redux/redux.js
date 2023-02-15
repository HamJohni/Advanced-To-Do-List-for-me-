import {configureStore} from "@reduxjs/toolkit";
import users from "../../../network/client/src/redux/reducers/users";

const store= configureStore({
    reducer: {
        users: users
    }
})

export default store