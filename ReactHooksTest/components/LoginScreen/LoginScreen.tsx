import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, TextInput, Text, TouchableHighlight, SafeAreaView, Button } from 'react-native';

export interface ScreenProps {
    title?:string;
}



export const LoginScreen = (props:ScreenProps) => {

    const [userName, setUserName] = useState<string | null>(props.title);

    const [loginName, setLoginName] = useState<string | null>(null);
    
    const [longEnoughUserName, setLongEnoughUserName] = useState(false);
    const [loginButtonTitle, setLoginButtonTitle] = useState('Login');
    const textInputRef = useRef<TextInput>(null);

    const onLoginTextChange = (text:string) => {
        setUserName(text);
    }

    const loginButtonAction = () => {
        if(loginName) {
            onLogoutPress()
        }
        else {
            onLoginPress()
        }
    }

    const onLoginPress = () => {
        setLoginName(userName);
        textInputRef.current?.clear();
    }

    const onLogoutPress = () => {
        setLoginName(null)
        setUserName(null)
        textInputRef.current?.clear();
        textInputRef.current?.focus();
    }

    const greetingText = () => {
        if (loginName) {
            return (
            
                <Text style={{
                    fontSize:16,
                    color:'cadetblue',
                }}>
                    Hello, {loginName} !
                </Text>
            );
        }
        else {
            return null
        }
        
    }

    useEffect(() => {
        if (userName) {
            let isValid = userName.length > 4;
            setLongEnoughUserName(isValid);
            setLoginButtonTitle(loginName ? 'Logout' : 'Login');
        }
        else {
            setLoginButtonTitle('Login');
            setLongEnoughUserName(false);
        }

         
        // return () => {
            //do cleanup here (componentWillUnmount)
        // };
    }, [userName, loginName]);

    return (
        <SafeAreaView style = {{flex:1, alignItems:'center'}}>
            <Text 
                style = {{fontFamily:'Verdana', fontSize:20, fontWeight:'bold', alignSelf:'center', marginVertical:10,}}>
                {(props.title || 'Login Screen')}
            </Text>

            <TextInput  
                ref = {textInputRef}
                placeholder='enter login'
                onChangeText={onLoginTextChange}
                maxLength= {34}
                style={{
                        minHeight:30,
                        borderWidth:1,
                        borderRadius:6,
                        paddingHorizontal:20,
                        paddingVertical:4,
                        marginHorizontal:20,
                        fontSize:20,
                        
                        }} >

            </TextInput>

            {greetingText()}

            <Button
                title = {loginButtonTitle}
                disabled = {!longEnoughUserName}
                onPress =  {loginButtonAction} />

        </SafeAreaView>
        
    );
}