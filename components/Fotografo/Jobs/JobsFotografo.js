import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import styles from './JobsFotografoStyles';
import { useUser } from '../../UserContext';

function Jobs({ navigation }) {
  const { user } = useUser();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/getJobsFotografo/${user.user.id}`);
      if (response.status === 200) {
        setJobData(response.data.jobs);
      } else {
        Alert.alert('Erro', 'Erro ao buscar jobs do fotógrafo');
      }
    } catch (error) {
      console.error('Erro ao buscar jobs do fotógrafo', error);
      Alert.alert('Erro', 'Erro ao buscar jobs do fotógrafo');
    }
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const renderFeedItem = ({ item }) => {
    let bgIcon;

    switch (item.status) {
      case 'Aceito':
        bgIcon = "#0B7E40";
        break;
      case 'Pendente':
        bgIcon = '#5F5F5F';
        break;
      case 'Negado':
        bgIcon = "#7E0B20";
        break;
      case 'Pago':
        bgIcon = "#225CB4";
        break;
      default:
        bgIcon = "#7E0B20";
    }

    return (
      <TouchableOpacity style={styles.feedItem} onPress={() => {
        setSelectedJob(item);
        setModalVisible(true);
      }}>
        <View style={styles.headerJob}>
          <View style={styles.infoJob}>
            <Text style={styles.dateJob}>{new Date(item.dataJob).toLocaleDateString()}</Text>
            <Text style={styles.titleJob}>{item.titulo}</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: bgIcon }]}>
            <Icon name="check" color='white' size={20} />
          </View>
        </View>

        <View style={styles.descJob}>
          <Text style={styles.descJobText}>
            {item.descricao}
          </Text>
        </View>

        <View style={[styles.feedItemArtist, { width: '100%', justifyContent: 'space-between' }]}>
          <View style={styles.containerBtnSee}>
            <Text style={styles.priceJob}>R$ {item.preco}</Text>
            <TouchableOpacity style={styles.feedItemButton} onPress={() => {
              setSelectedJob(item);
              setModalVisible(true);
            }}>
              <Text style={styles.feedItemButtonText}>VER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("TelaFotografoPage")} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>JOBS</Text>
        <SelectDropdown
          data={['Pago', 'Cancelado', 'Aguardando', 'Aceito']}
          onSelect={(selectedItem, index) => handleStatusSelection(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          buttonStyle={styles.selectDropdownButton}
          buttonTextStyle={styles.selectDropdownButtonText}
          dropdownStyle={styles.selectDropdownDropdown}
        />
        <FlatList
          data={jobData}
          renderItem={renderFeedItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[styles.feedContainer, { paddingBottom: 100 }]}
        />
      </View>

      {selectedJob && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={styles.modalHeaderContaianer}>
                <View>
                  <Text style={styles.modalDateTitle}>DATA DO JOB</Text>
                  <Text style={styles.dateJob}>{new Date(selectedJob.dataJob).toLocaleDateString()}</Text>
                  <Text style={styles.modalTitle}>{selectedJob.titulo}</Text>
                </View>
                <Text style={styles.modalDate}>{selectedJob.status}</Text>
              </View>

              <Text style={styles.modalDescription}>{selectedJob.descricao}</Text>
              <View style={styles.localContainer}>
                <Text style={styles.localTitle}>LOCAL</Text>
                <Text style={styles.localText}>{selectedJob.local}</Text>
              </View>

              <View style={styles.precoContainer}>
                <View style={styles.precoTitleWrapper}>
                  <Text style={styles.modalPrice}>Preço: </Text>
                  <Text style={styles.modalPrice}>R$ {selectedJob.preco}</Text>
                </View>

                <TouchableOpacity
                  style={styles.propostasBtn}
                  onPress={() => {navigation.navigate('TelaPropostaCliente'), setModalVisible(false)}}
                >
                  <Text style={styles.propostasBtnText}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default Jobs;
