import React,  { useState ,useEffect} from 'react';
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { auth } from '../../firebase';
import { signup,updateProfileUser,useAuth } from '../../firebase';
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({navigation}) {

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const currentUser=useAuth();
 
  // const handleSubmit = ({email,password,confirmpassword}) => {

  //   setLoading==true
  //   if(password!==confirmpassword){
  //     alert("Password do not match")
  //     return setError("Password do not match")
  //   }


  //   auth.createUserWithEmailAndPassword(email,password)
  //   .then((user) => {auth.currentUser
  //     if(user)
  //       user.updateProfile({
  //         displayName: "PalSharma"
  //       })
  //   })
  //   .then(userCredentials => {
  //     const user =userCredentials.user;
  //     console.log(user.email);
  //   })
  //   .catch(error => alert(error.message))
     
  //   navigation.navigate("Login")
  //   setLoading==false

  // }

  async function handleSignup({email,password,confirmpassword,name}) {
    setLoading(true);
    if(password!==confirmpassword){
      alert("Password do not match")
      return setError("Password do not match")
    }
    try {
      await signup(email,password);
      
      await updateProfileUser(currentUser,name);
      console.log(currentUser)
      navigation.navigate("Login")
    }
    
    catch (error) {
      alert("Error!" + error);
    }
    setLoading(false);
  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "", confirmpassword: "" }}
        onSubmit={handleSignup}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
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
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmpassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register"/>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;