import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Theme from '../../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../Button';
import { formatDistance } from 'date-fns';
import { getTimeDate } from '../../app/utils';

const Info = ({showSite}) => {
  return (
    <View
        style={{            
            marginHorizontal: 10,
        }}
    >
        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Organization name</Text>

            <Text h6>
                Google inc.
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>About organization</Text>

            <Text h6 style={{marginVertical: 0}}>
                A technology company
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Address</Text>

            <Text h6 style={{marginVertical: 0}}>
                Ikeja Lagos, Nigeria.
            </Text>
        </View>

        {
            showSite && (
                <View>
                    <View
                        center
                        style={{
                            flexDirection:'row',
                            backgroundColor:Theme.lightRed,
                            maxWidth: "80%",
                            paddingHorizontal: 20,
                            paddingVertical:10,
                            borderRadius: 6,
                            marginVertical: 10,
                        }}
                    >
                        <Octicons name="link-external" size={15} color={Theme.red}/>

                        <Text style={{marginLeft: 10, color:Theme.red}}>
                            Visit website
                        </Text>
                    </View>
                    
                </View>
            )
        }

    </View>
  )
}

export const PlacementDetailInfo = ({ showHeader, job, date_applied, duration }) => {
    const role = job?.role || '...';
    const stipend = job?.stipend;
    
    let dateDistance;
    let applicationDate;


    if (date_applied){
        const dt = getTimeDate(date_applied);
        dateDistance = date_applied && formatDistance(dt, new Date(), { addSuffix: true })

        applicationDate = dt.toDateString();
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

                    <Text h5 style={{marginVertical: 5}}>
                        {role}
                    </Text>
                </View>

                <View >
                    <Text p style={{marginVertical: 5}}>
                        Stipend
                    </Text>

                    <Text h5>
                        {stipend ? `${stipend}/month` :'No stipend'}
                    </Text>
                </View>


                <View style={{marginVertical: 10}}>
                    <Text p style={{marginVertical: 5}}>
                        Location
                    </Text>

                    <Text h5>
                        {address} {city}, {country}.
                    </Text>
                </View>

                <View>
                    <Text p style={{marginVertical: 5}}>
                        Duration
                    </Text>

                    <Text h5>
                        {duration ? `${duration} months` : '...'}
                    </Text>
                </View>


                <View>
                    <Text p style={{marginVertical: 5}}>
                        Date applied
                    </Text>

                    <Text h5>
                        {applicationDate} -- {dateDistance}
                    </Text>
                </View>

            </View>
        </>
    )
}

export const ApplicationStudentInfo = ({student, showHeader}) => {
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
            <Text h6  style={{color: Theme.grey300}}>Student Information</Text>
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

            <View style={{marginVertical: 10}}>
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

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 10}}>School</Text>

                <Text h6 style={{marginVertical: 0}}>
                    {school}
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
                onPress={()=>{}}
                disable={!cv}
                icon={<Octicons name="link-external" size={15} color={Theme.red}/>}
                textStyle={{marginLeft: 10, color:Theme.red}}
            />

        </View>
    </>
  )
}

export const InternInfo = ({showCV}) => {
  return (
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

        {showCV && (<CustomButton
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
                onPress={()=>{}}
                disable={!cv}
                icon={<Octicons name="link-external" size={15} color={Theme.red}/>}
                textStyle={{marginLeft: 10, color:Theme.red}}
            />)}

    </View>
  )
}

export default Info