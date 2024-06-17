import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import Svg, { Path, ClipPath, Rect } from 'react-native-svg';
import styles from './LoginStyles';
import { API_URL_MOBILE } from '@env';
import axios from 'axios';
import { useUser } from '../UserContext';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleToken, setModalVisibleToken] = useState(false);
  const [userNumbers, setUserNumbers] = useState(Array(6).fill(''));

  const { login } = useUser();

  const inputRefs = useRef([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/autenticacaoCliente`, {
        email: email,
        senha: senha
      });
  
      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);
        login(response.data);
        response.data.userType === "cliente" ? 
          navigation.navigate('TelaFeedArte') : 
          navigation.navigate('TelaFeedJobs');

          setEmail("");
          setSenha("");

      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta do servidor:', error.response.data);
        alert(error.response.data.message);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
        alert('Erro na requisição, sem resposta do servidor.');
      } else {

        console.error('Erro:', error.message);
        alert('Erro ao fazer a requisição.');
      }
    }
  };

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
        <Image
          source={require('../../assets/icon-click.png')}
          style={{width: 63, height: 67}}
        />
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
        onPress={() => handleLogin()}
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
