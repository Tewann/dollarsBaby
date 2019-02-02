import React from 'react';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { View } from 'react-native'


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
//const unitID = 'ca-app-pub-3940256099942544/6300978111'

class BannerComponent extends React.Component {
    render() {
        return (
            <View>
                {this.props.displaysAdBanner &&
                    <Banner
                        unitId={this.props.unitID}
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