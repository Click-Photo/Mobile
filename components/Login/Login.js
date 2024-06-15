import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import Svg, { Path, ClipPath, Rect } from 'react-native-svg';
import styles from './LoginStyles';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleToken, setModalVisibleToken] = useState(false);
  const [userNumbers, setUserNumbers] = useState(Array(6).fill(''));

  const inputRefs = useRef([]);

  const handleForgotPassword = () => {
    setModalVisible(true);
  };

  const handleSendToken = () => {
    setModalVisible(false);
    setModalVisibleToken(true);
  };

  const handleInputTextChange = (text, index) => {
    const newNumbers = [...userNumbers];

    if (/^[0-9a-zA-Z]*$/.test(text)) {
      newNumbers[index] = text.toUpperCase(); 
      setUserNumbers(newNumbers);

      if (text.length === 1 && index < userNumbers.length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (text === '') {
      newNumbers[index] = ''; 
      setUserNumbers(newNumbers);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/rectangle.png')}
        style={styles.image}
      />
      <View style={{ marginTop: 40 }}>
        <Svg width={63} height={67} viewBox="0 0 93 87" fill="none">
          <ClipPath id="clip0_49_22">
            <Rect width={92} height={87} fill="white" transform="translate(0.5)" />
          </ClipPath>
          <Path
            d="M36.5333 38.0625L54.7991 8.13812C52.135 7.57625 49.3558 7.25 46.5 7.25C37.3 7.25 28.8858 10.3131 22.2733 15.4244L36.3225 38.425L36.5333 38.0625ZM83.07 32.625C79.5433 22.0219 70.995 13.5575 60.0891 9.6425L46.0591 32.625H83.07ZM84.0666 36.25H55.355L56.4666 38.0625L74.7325 67.9688C80.9808 61.5163 84.8333 52.9431 84.8333 43.5C84.8333 41.0169 84.565 38.5881 84.0666 36.25ZM33.2175 43.5L18.2675 19.0312C12.0191 25.4837 8.16663 34.0569 8.16663 43.5C8.16663 45.9831 8.43496 48.4119 8.93329 50.75H37.645L33.2175 43.5ZM9.92996 54.375C13.4566 64.9781 22.005 73.4425 32.9108 77.3575L46.9408 54.375H9.92996ZM53.1316 54.375L38.1816 78.8619C40.865 79.4237 43.6441 79.75 46.5 79.75C55.7 79.75 64.1141 76.6869 70.7266 71.5756L56.6775 48.575L53.1316 54.375Z"
            fill="white"
          />
        </Svg>
        <Text
          style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 50 }}
        >
          CLICK!
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Svg width={28} height={26} viewBox="0 0 28 26" fill="none">
          <Path
            d="M14 13C16.7846 13 19.0625 10.8062 19.0625 8.125C19.0625 5.4438 16.7846 3.25 14 3.25C11.2154 3.25 8.9375 5.4438 8.9375 8.125C8.9375 10.8062 11.2154 13 14 13ZM14 15.4375C10.6462 15.4375 3.875 17.0829 3.875 20.3125V22.75H24.125V20.3125C24.125 17.0829 17.3538 15.4375 14 15.4375Z"
            fill="#898989"
          />
        </Svg>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#898989"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Svg width={34} height={32} viewBox="0 0 34 32" fill="none">
          <Path
            d="M22 12V10C22 7.2 19.8 5 17 5C14.2 5 12 7.2 12 10V12C10.3 12 9 13.3 9 15V22C9 23.7 10.3 25 12 25H22C23.7 25 25 23.7 25 22V15C25 13.3 23.7 12 22 12ZM14 10C14 8.3 15.3 7 17 7C18.7 7 20 8.3 20 10V12H14V10ZM18.1 18.5L18 18.6V20C18 20.6 17.6 21 17 21C16.4 21 16 20.6 16 20V18.6C15.4 18 15.3 17.1 15.9 16.5C16.5 15.9 17.4 15.8 18 16.4C18.6 16.9 18.7 17.9 18.1 18.5Z"
            fill="white"
          />
        </Svg>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#898989"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.linkContainer, { marginTop: -10 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TelaFeedArte')}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Recuperação de senha</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite seu email"
              placeholderTextColor="#898989"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSendToken}
            >
              <Text style={styles.modalButtonText}>Enviar Token</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleToken}
        onRequestClose={() => {
          setModalVisibleToken(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisibleToken(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitleToken}>Digite o token</Text>
            <Text style={styles.modalSubtitle}>Um token foi enviado para seu email</Text>
            <View style={styles.inputRow}>
              {userNumbers.map((number, index) => (
                <TextInput
                  key={index}
                  style={styles.inputToken}
                  keyboardType="default"
                  onChangeText={text => handleInputTextChange(text, index)}
                  value={number}
                  ref={ref => inputRefs.current[index] = ref}
                  maxLength={1}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisibleToken(false)}
            >
              <Text style={styles.modalButtonText}>Verificar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LoginScreen;
