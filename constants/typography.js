import Theme from "./theme";

const Typography = {
    h1: {
        fontSize: 40,
        fontFamily: "FontBold",
        // lineHeight:14,
        color: Theme.main,
    },
    h2: {
        fontSize: 30,
        fontFamily: "FontBold",
        color: Theme.main,
    },
    h3: {
        fontSize: 20,
        fontFamily: "FontBold",
        color: Theme.main,
    },
    p: {
        fontSize: 14,
        fontFamily: "FontRegular",
    },
    small: {
        fontSize: 12,
        fontFamily: "FontRegular",
    },
    a: {
        textDecorationLine: 'underline'
    },
    label: {
        fontSize: 14,
        fontFamily: "FontBold",
    },
}

export default Typography;