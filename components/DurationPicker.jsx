import React from 'react';
import { Picker } from 'react-native-ui-lib';

const DurationPicker = ()=>{
    const options = [
        {label: 'JavaScript', value: 'js'},
        {label: 'Java', value: 'java'},
        {label: 'Python', value: 'python'},
        {label: 'C++', value: 'c++', disabled: true},
        {label: 'Perl', value: 'perl'}
    ];
    return (
        <Picker
            label="Picker"
            // placeholder="Pick a value"
            // useNativePicker
            useWheelPicker
            migrateTextField
            value={""}
            onChange={nativePickerValue => console.log(nativePickerValue)}
            // rightIconSource={dropdown}
          >
            {options.map((option,i) => (
              <Picker.Item key={i} value={option.value} label={option.label} disabled={option.disabled}/>
            ))}
          </Picker>
    )
}

export default DurationPicker;