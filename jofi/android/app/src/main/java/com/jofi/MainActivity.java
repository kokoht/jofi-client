package com.jofi;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1

import org.devio.rn.splashscreen.SplashScreen; // here


public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        // return "jofi";
    }
    @Override
    protected String getMainComponentName() {
        return "jofi";
    }
}


// import com.facebook.react.ReactActivity;
//
// public class MainActivity extends ReactActivity {
//
//     /**
//      * Returns the name of the main component registered from JavaScript.
//      * This is used to schedule rendering of the component.
//      */
//     @Override
//     protected String getMainComponentName() {
//         return "jofi";
//     }
// }
