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
    h4: {
        fontSize: 18,
        fontFamily: "FontBold",
        color: Theme.main,
    },
    h5: {
        fontSize: 16,
        fontFamily: "FontBold",
        color: Theme.main,
    },
    h6: {
        fontSize: 14,
        fontFamily: "FontBold",
        color: Theme.main,
    },
    p: {
        fontSize: 14,
        fontFamily: "FontRegular",
        color: Theme.grey400,
    },
    i: {
        fontSize: 12,
        fontFamily: "FontRegular",
        color: Theme.grey400,
        fontStyle:'italic'
    },
    small: {
        fontSize: 12,
        fontFamily: "FontRegular",
    },
    a: {
        textDecorationLine: 'underline',
    },
    label: {
        fontSize: 14,
        fontFamily: "FontBold",
    },
}

export default Typography;