import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import styles from './TelaCreateJobStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../../UserContext';

function CreateJob({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const { user } = useUser();

  const handleSaveJob = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/criarJob`, {
        idCliente: user.user.id,
        dataJob: date,
        titulo: title,
        descricao: description,
        local: location,
        preco: price
      });

      if (response.status === 200) {
        setSaveModalVisible(true);
      } else {
        Alert.alert('Erro', 'Erro ao salvar o job');
      }
    } catch (error) {
      console.error('Erro ao salvar o job', error);
      Alert.alert('Erro', 'Erro ao salvar o job');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Criar Novo Job</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Título:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Descrição:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Data:</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Localização:</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Preço:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveJob}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={saveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setSaveModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalText}>Job salvo com sucesso!</Text>
            <TouchableOpacity onPress={() => {navigation.goBack(), setSaveModalVisible(false)}} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateJob;
