import React,  { useEffect } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from "yup";
import { auth ,login, useAuth} from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Screen from '../components/Screen';
import {
    Form,
    FormField,
    SubmitButton,
  } from "../components/forms";
// import AppButton from '../components/AppButton';
// import AppTextInput from '../components/AppTextInput';
// import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });

function LoginScreen({ navigation }) {
    //const [email, setEmail] = useState();
    //const [password, setPassword] = useState();
    //let [formValues, setFormValues] = useState(initialValues);
    useEffect(()=> {
        const unsubscribe=onAuthStateChanged(auth,user => {
            if(user) {
                //console.log("email : ", user.email);
                //console.log("user : ", user.displayName);
                navigation.replace("DrawerNavigator", {UserEmail : user.email , UserName : user.displayName});
            }
        })

        return unsubscribe
    },[])

    const handleLogin = ({email,password}) => {
        login(email,password)
        .then(userCredentials=>{
            const user=userCredentials.user;
            console.log("Logged in with: ", user.email)
        })
        .catch(error => alert(error.message))
  
      }
    return (
        <ScrollView>
        <KeyboardAwareScrollView>
        <Screen style={styles.container}>
            
            <Image 
                style={styles.logoImage}
                source={require('../assets/logoLogin.png')} 
            />
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Login" />
            </Form>
            
        </Screen>
        </KeyboardAwareScrollView>
        </ScrollView>
      
    );
}

const styles = StyleSheet.create({
    container:{
      padding: 15,
      flex: 1,
    },
    logoImage:{
        width: 230,
        height: 200,
        alignSelf: 'center',
        marginBottom: 2,
    }
})

export default LoginScreen;




// import React,  { useState } from 'react';
// import { StyleSheet, Image } from 'react-native';
// import AppButton from '../components/AppButton';


// import AppTextInput from '../components/AppTextInput';
// import Screen from '../components/Screen';

// function LoginScreen(props) {
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     return (
//         <Screen style={styles.container}>
//             <Image 
//                 style={styles.logoImage}
//                 source={require('../assets/logo6.png')} 
//             />
//             <AppTextInput 
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 icon="email"
//                 placeholer="Email"
//                 keyboardType="email-address"
//                 onChangeText={text => setEmail(text)}
//                 textContentType="emailAddress"
//             />
//             <AppTextInput 
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 icon="lock"
//                 onChangeText={text => setPassword(text)}
//                 placeholer="Password"
//                 secureTextEntry={true}
//                 textContentType="emailAddress"
//             />
//             <AppButton title="Login" onPress={() => console.log(email,password)}/>
//         </Screen>
//     );
// }

// const styles = StyleSheet.create({
//     container:{
//         padding: 10
//     },
//     logoImage:{
//         width: 370,
//         height: 230,
//         alignSelf: 'center',
//         //marginTop: 10,
//         marginBottom: 20,
//     }
// })

// export default LoginScreen;