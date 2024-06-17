import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Svg, { Path, ClipPath, Rect } from 'react-native-svg';
import styles from './CadastroStyles';
import { API_URL_MOBILE } from '@env';
import axios from 'axios';

function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('cliente');

  const toggleRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleRegister = async () => {
    if (!nome || !email || !cpf || !telefone || !cep || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    const url = role === 'fotografo' ? `${API_URL_MOBILE}/click/cadastroFotografo` : `${API_URL_MOBILE}/click/cadastroCliente`;
    const userData = { nome, email, CPF: cpf, telefone, CEP: cep, senha };

    try {
      const response = await axios.post(url, userData);
      if (response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso, por favor faça login.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Erro no cadastro", response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      alert("Erro no cadastro", errorMessage);
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
          placeholder="Nome"
          placeholderTextColor="#898989"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={{ fontSize: 20, color: "#898989", marginRight: 8}}>@</TextInput>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#898989"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Svg width={35} height={23} viewBox="0 0 45 33" fill="none">
          <Path
            d="M33.6013 6H10.3274C9.04248 6 8 7.04248 8 8.32739V25.3949C8 26.6798 9.04248 27.7223 10.3274 27.7223H33.6013C34.8862 27.7223 35.9286 26.6798 35.9286 25.3949V8.32739C35.9286 7.04248 34.8862 6 33.6013 6ZM33.6013 25.3949H10.3274V8.32739H33.6013V25.3949ZM18.0853 16.8611C19.7969 16.8611 21.1885 15.4696 21.1885 13.758C21.1885 12.0464 19.7969 10.6548 18.0853 10.6548C16.3737 10.6548 14.9822 12.0464 14.9822 13.758C14.9822 15.4696 16.3737 16.8611 18.0853 16.8611ZM13.7409 23.0675H22.4298C23.031 23.0675 23.5159 22.6505 23.5159 22.1365V21.2056C23.5159 19.6637 22.0564 18.4127 20.2576 18.4127C19.7339 18.4127 19.3509 18.8006 18.0853 18.8006C16.781 18.8006 16.4659 18.4127 15.9131 18.4127C14.1142 18.4127 12.6548 19.6637 12.6548 21.2056V22.1365C12.6548 22.6505 13.1396 23.0675 13.7409 23.0675ZM25.4554 19.9643H30.886C31.0993 19.9643 31.2739 19.7898 31.2739 19.5764V18.8006C31.2739 18.5873 31.0993 18.4127 30.886 18.4127H25.4554C25.2421 18.4127 25.0675 18.5873 25.0675 18.8006V19.5764C25.0675 19.7898 25.2421 19.9643 25.4554 19.9643ZM25.4554 16.8611H30.886C31.0993 16.8611 31.2739 16.6866 31.2739 16.4732V15.6974C31.2739 15.4841 31.0993 15.3095 30.886 15.3095H25.4554C25.2421 15.3095 25.0675 15.4841 25.0675 15.6974V16.4732C25.0675 16.6866 25.2421 16.8611 25.4554 16.8611ZM25.4554 13.758H30.886C31.0993 13.758 31.2739 13.5834 31.2739 13.3701V12.5943C31.2739 12.3809 31.0993 12.2064 30.886 12.2064H25.4554C25.2421 12.2064 25.0675 12.3809 25.0675 12.5943V13.3701C25.0675 13.5834 25.2421 13.758 25.4554 13.758Z"
            fill="white"
            fillOpacity={0.5}
          />
        </Svg>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#898989"
          value={cpf}
          onChangeText={setCpf}
        />
      </View>
      <View style={styles.inputContainer}>
        <Svg width={32} height={27} viewBox="0 0 42 37" fill="none">
          <Path
            d="M33.3156 24.9592L28.0655 22.7092C27.8412 22.6136 27.5919 22.5935 27.3552 22.6518C27.1185 22.7102 26.9071 22.8438 26.7529 23.0326L24.4279 25.8733C20.779 24.1529 17.8424 21.2163 16.122 17.5674L18.9627 15.2424C19.1519 15.0885 19.2858 14.8771 19.3442 14.6403C19.4025 14.4034 19.3821 14.154 19.2861 13.9298L17.0361 8.67974C16.9306 8.43806 16.7442 8.24073 16.5089 8.12178C16.2735 8.00283 16.0041 7.96973 15.747 8.02817L10.8719 9.15319C10.624 9.21043 10.4028 9.35001 10.2445 9.54914C10.0861 9.74827 9.99994 9.9952 10 10.2496C10 22.2733 19.7455 32 31.7504 32C32.0049 32.0002 32.2519 31.914 32.4511 31.7557C32.6504 31.5973 32.79 31.3761 32.8473 31.1281L33.9723 26.253C34.0304 25.9946 33.9965 25.7241 33.8767 25.488C33.7568 25.2518 33.5584 25.0649 33.3156 24.9592Z"
            fill="white"
            fillOpacity="0.5"
          />
        </Svg>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#898989"
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>
      <View style={styles.inputContainer}>
        <Svg width={30} height={34} viewBox="0 0 46 34" fill="none">
            <Path
              d="M11 14C11 10.8174 12.2643 7.76515 14.5147 5.51472C16.7652 3.26428 19.8174 2 23 2C26.1826 2 29.2348 3.26428 31.4853 5.51472C33.7357 7.76515 35 10.8174 35 14C35 22 23 34 23 34C23 34 11 22 11 14ZM18 14C18 15.3261 18.5268 16.5979 19.4645 17.5355C20.4021 18.4732 21.6739 19 23 19C24.3261 19 25.5979 18.4732 26.5355 17.5355C27.4732 16.5979 28 15.3261 28 14C28 12.6739 27.4732 11.4021 26.5355 10.4645C25.5979 9.52678 24.3261 9 23 9C21.6739 9 20.4021 9.52678 19.4645 10.4645C18.5268 11.4021 18 12.6739 18 14Z"
              fill="white"
              fillOpacity={0.5}
            />
          </Svg>
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#898989"
          value={cep}
          onChangeText={setCep}
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

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.buttonSwicth, role === 'cliente' ? styles.active : styles.inactive]}
          onPress={() => toggleRole('cliente')}
        >
          <Text style={[role === 'cliente' ? styles.activeBtn : styles.inactiveBtn]}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonSwicth, role === 'fotografo' ? styles.active : styles.inactive]}
          onPress={() => toggleRole('fotografo')}
        >
          <Text style={[role === 'fotografo' ? styles.activeBtn : styles.inactiveBtn]}>Fotógrafo</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.linkContainer, {marginBottom: 20}]}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Fazer Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRegister()}
      >
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Cadastro;
