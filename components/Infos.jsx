import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Theme from '../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from './Button';
import { getTimeDate, getTimeDistance,JSONLog, openURL } from '../app/utils';

export const CompanyInfo = ({company}) => {

    return (
        <View
            style={{
                paddingVertical: 10,
                marginHorizontal: 30,
            }}
        >
            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Organization name</Text>

                <Text h6>
                    {company.name}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>About organization</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {company.about}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Address</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {company.address} {company.city}, {company.country}.
                </Text>
            </View>

            <CustomButton
                style={{
                    flexDirection:'row',
                    backgroundColor:Theme.lightRed,                
                    maxWidth: "80%",
                    paddingHorizontal: 20,
                    paddingVertical:10,
                    borderRadius: 6,
                    marginVertical: 10,
                }}
                text={"View website"}
                onPress={()=>openURL(company.website)}
                disable={!company.website}
                icon={<Octicons name="link-external" size={15} color={Theme.red}/>}
                textStyle={{marginLeft: 10, color:Theme.red}}
            />

        </View>
    )
}

export const PlacementDetailInfo = ({ showHeader, job, date_applied, job_started, duration, mini }) => {
    const role = job?.role || '...';
    const stipend = job?.stipend;
    
    let dateDistance;
    let applicationDate;
    let placementDate;


    if (date_applied){
        const dt = getTimeDate(date_applied);
        dateDistance = date_applied && getTimeDistance(dt, new Date(), { addSuffix: true })

        applicationDate = dt?.toDateString();
    }
    if (job_started){
        const dt = getTimeDate(job_started);
        dateDistance = job_started && getTimeDistance(dt, new Date(), { addSuffix: true })

        placementDate = dt?.toDateString();
    }
    
    const address = job?.location?.address || "...";
    const city = job?.location?.city || "...";
    const country = job?.location?.country || "...";

    return (
        <>
            {showHeader && 
                (
                    <View style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:1, borderColor:Theme.grey300}}>
                        <Text h6  style={{color: Theme.grey300}}>Placements details</Text>
                    </View>
                )
            }


            <View
                style={{
                    paddingVertical: 10,
                    marginHorizontal: 30,
                }}
            >
                <View style={{marginVertical: 10}}>
                    <Text p>Job role</Text>

                    <Text h6 style={{marginVertical: 5}}>
                        {role}
                    </Text>
                </View>

                <View >
                    <Text p style={{marginVertical: 5}}>
                        Stipend
                    </Text>

                    <Text h6>
                        {stipend ? `${stipend}/month` :'No stipend'}
                    </Text>
                </View>


                <View style={{marginVertical: 10}}>
                    <Text p style={{marginVertical: 5}}>
                        Location
                    </Text>

                    <Text h6>
                        {address} {city}, {country}.
                    </Text>
                </View>

                {!mini &&(
                <>
                    <View style={{marginVertical: 10}}>
                        <Text p style={{marginVertical: 5}}>
                            Duration
                        </Text>

                        <Text h6>
                            {duration ? `${duration} months` : '...'}
                        </Text>
                    </View>


                    <View>
                        <Text p style={{marginVertical: 5}}>
                            Date applied
                        </Text>

                        <Text h6>
                            {applicationDate} -- {dateDistance}
                        </Text>
                    </View>

                    {
                        placementDate && <View style={{marginVertical: 10}}>
                            <Text p style={{marginVertical: 5}}>
                                Placement started
                            </Text>

                            <Text h6>
                                {placementDate}
                            </Text>
                        </View>
                    }
                    
                </>
                )}

            </View>
        </>
    )
}

export const StudentInfo = ({student, isIntern, showHeader}) => {
    const phone = student?.phoneNumber || "...";
    const city = student?.city || "...";
    const address = student?.address;
    const country = student?.country || "...";
    const department = student?.departmentData?.name || "...";
    const school = student?.schoolData?.name || "...";
    const cv = student?.cv;

  return (
    <>
        {showHeader && (<View style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:1, borderColor:Theme.grey300}}>
            <Text h6  style={{color: Theme.grey300}}>{isIntern ? "Your" : "Student"} Information</Text>
        </View>)}
        <View
            style={{
                marginHorizontal: 30,
            }}
        >
            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Phone number</Text>

                <Text h6>
                    {phone}
                </Text>
            </View>

            <View>
                <Text p style={{marginVertical: 10}}>Address</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {address ? `${address},` : null} {city}, {country}.
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Department</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {department}
                </Text>
            </View>

            <View>
                <Text p style={{marginVertical: 10}}>School</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {school}
                </Text>
            </View>

            <CustomButton
                style={{
                    flexDirection:'row',
                    backgroundColor:Theme.lightRed,
                    maxWidth: "80%",
                    paddingHorizontal: 20,
                    paddingVertical:10,
                    borderRadius: 6,
                    marginVertical: 10,
                }}
                text={"View CV"}
                onPress={()=>openURL(cv)}
                disable={!cv}
                icon={<Octicons name="link-external" size={15} color={Theme.red}/>}
                textStyle={{marginLeft: 10, color:Theme.red}}
            />

        </View>
    </>
  )
}

export const InternInfo = ({cv,showHeader}) => {
  return (
    <>
        {showHeader && (<View style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:1, borderColor:Theme.grey300}}>
            <Text h6  style={{color: Theme.grey300}}>Student Information</Text>
        </View>)}
    
        <View
            style={{
                paddingVertical: 10,
                marginHorizontal: 30,
            }}
        >
            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Phone number</Text>

                <Text h6>
                    +234 8000000000
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Address</Text>

                <Text h6 style={{marginVertical: 0}}>
                    Ota, Lagos.
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>Department</Text>

                <Text h6 style={{marginVertical: 0}}>
                    Cyber security
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>School</Text>

                <Text h6 style={{marginVertical: 0}}>
                    Federal University of Technology Akure
                </Text>
            </View>

            <CustomButton
                style={{
                    flexDirection:'row',
                    backgroundColor:Theme.lightRed,
                    // opacity: cv ? 0.6 : 1,
                    maxWidth: "80%",
                    paddingHorizontal: 20,
                    paddingVertical:10,
                    borderRadius: 6,
                    marginVertical: 10,
                }}
                text={"View CV"}
                onPress={()=>openURL(cv)}
                disable={!cv}
                icon={<Octicons name="link-external" size={15} color={Theme.red}/>}
                textStyle={{marginLeft: 10, color:Theme.red}}
            />

        </View>
</>
    
  )
}