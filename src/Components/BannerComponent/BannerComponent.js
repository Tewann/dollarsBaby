import React from 'react';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { View, Platform } from 'react-native'


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
const testingUnitID = 'ca-app-pub-3940256099942544/6300978111'

class BannerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           productionUnitId: "ca-app-pub-4868408770331668/3370784165"
       }
   }
    componentWillMount = () => {
        /**
         * Sets unitID for ads depending on the platform
         * The default one is the android
         */
        if (Platform.OS === 'ios') {
            this.setState({ productionUnitId: 'ca-app-pub-4868408770331668/3443399374'})
        } else {
            this.setState({ productionUnitId: "ca-app-pub-4868408770331668/3370784165"})
        }
    }

    render() {
        return (
            <View>
                {this.props.displaysAdBanner &&
                    <Banner
                        unitId={testingUnitID}
                        size={"FULL_BANNER"}
                        request={request.build()}
                        onAdFailedToLoad={(e) => {
                            console.log('Advert error : ' + e);
                        }}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displaysAdBanner: state.options.displaysAdBanner
    }
}

export default connect(mapStateToProps)(BannerComponent)