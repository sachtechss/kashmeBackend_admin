import LocalizedStrings from 'react-localization';

const data = {
    en: {
        loginBtn: "LOGIN",
        loginHead: "Admin Panel",
        signUp: "Sign Up",
        forgotHead: "Forgot Password ?"

    },
    zn: {
        loginBtn: "名",
        loginHead: "管理パネル",
        signUp: "名名",
        forgotHead: "名名名名名名名名"
    }
}

let langString = new LocalizedStrings(data);

export { langString };