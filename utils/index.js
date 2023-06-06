import { formatDistance } from "date-fns";
import { Linking } from "react-native";

export const openURL = (url) => {
    console.log("Opening:", url)
    if (!url) return

    let durl = url;
    let protocol = false;

    for (let i of ['http://', 'https://']) {
        if (protocol) break;

        if (url.includes(i)) protocol = true;
    }

    if (!protocol) {
        durl = `http://${url}`
    }

    // if(url.includes("https://")) durl = `http://${url}`;
    // if(!url.includes("http://") || !url.includes("https://")) durl = `http://${url}`;
    Linking.openURL(durl).catch((err) => console.error('An error occurred', err));
}

export const getTimeDate = (timeObject) => {
    if (!timeObject?.seconds) return null;
    return new Date((timeObject.seconds) * 1000);
}
export const getTimeDistance = (timeObject) => {
    if (!timeObject?.seconds) return null;
    const dt = new Date((timeObject.seconds) * 1000);

    try {
        return formatDistance(dt, new Date(), { addSuffix: true });
    } catch (err) {
        console.log(err)
    }

    return null;

}

export const setUpWithPreviousValue = (schema, data = null, seed = {}) => {

    let prev = {
        ...seed,
    }

    if (!data) return prev;

    Object.keys(schema).forEach((fieldName) => {
        // if key not in prevProfile, continue;
        if (!data[fieldName]) return

        prev[fieldName] = data[fieldName]; // set value.
    });

    return prev;

}

export const getDateLists = (start, end = null) => {

    const listDate = [];
    const startDate = start; //'2017-02-01';
    const endDate = end || new Date().toISOString();//'2017-02-10';
    const dateMove = new Date(startDate);
    let strDate = startDate;

    while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    };

    return listDate;

}

export function weeksBetween(date) {
    const d1 = new Date(date);
    const d2 = new Date();

    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

export const getDayVerbose = (dayNumber) => {

    switch (dayNumber) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }

}

export const JSONLog = (obj) => console.log(JSON.stringify(obj, null, 4))
