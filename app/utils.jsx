export const getDateLists = (start, end=null)=>{

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

export const getDayVerbose = (dayNumber)=>{

        switch (dayNumber){
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