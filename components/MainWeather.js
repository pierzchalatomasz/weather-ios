import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

import icons from '../services/Icon';

export default class MainWeather extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        temperature: PropTypes.number,
        humidity: PropTypes.number,
        wind: PropTypes.number,
        pressure: PropTypes.number,
        icon: PropTypes.string
    }

    render() {
        const today = moment();

        return (
            <View style={{ backgroundColor: '#555', width: '100%', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: 'white', fontSize: 35, fontWeight: '100', marginTop: 20 }}>
                    {this.props.city}
                </Text>
                <Text style={{ color: 'white', fontSize: 17.5, fontWeight: '400', marginTop: 0 }}>
                    {today.format('dddd')}
                </Text>
                <Image source={icons[this.props.icon]}
                    style={{ margin: 20 }} />
                <View style={{ flexDirection: 'row', backgroundColor: '#777', padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 35, fontWeight: '100' }}>
                            {this.props.temperature}&deg;C
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textInfo}>Humidity: {this.props.humidity}%</Text>
                        <Text style={styles.textInfo}>Pressure: {this.props.pressure} hPa</Text>
                        <Text style={styles.textInfo}>Wind: {this.props.wind} m/s</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInfo: {
        color: 'white',
        textAlign: 'left',
        fontSize: 12.5
    },
});
