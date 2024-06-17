import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import { useUser } from '../../UserContext';

import styles from './JobsStyles';

function Jobs({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPropostas, setTotalPropostas] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/getAllJobsCliente/${user.user.id}`);
      console.log(response.data); // Adicione um log para verificar a resposta
      if (response.status === 200 && Array.isArray(response.data.jobs)) {
        const jobs = response.data.jobs.map(job => ({
          ...job,
          totalPropostas: 0,
        }));

        const propostasResponse = await axios.post(`${API_URL_MOBILE}/click/visualizarPropostaCliente/${user.user.id}`);
        if (propostasResponse.status === 200) {
          const totalPropostasPorJob = propostasResponse.data;
          jobs.forEach(job => {
            const contagem = totalPropostasPorJob.find(tp => tp.idJobs === job.id);
            if (contagem) {
              job.totalPropostas = contagem.totalPropostas;
            }
          });
        }
        setJobData(jobs);
        setTotalJobs(response.data.totalJobs);
      } else {
        setJobData([]);
        setTotalJobs(0);
        Alert.alert('Erro', 'Erro ao buscar os jobs do cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar os jobs do cliente', error);
      setJobData([]);
      setTotalJobs(0);
      Alert.alert('Erro', 'Erro ao buscar os jobs do cliente');
    }
  };

  const fetchPropostas = async (jobId) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/visualizarPropostaCliente/${user.user.id}`);
      if (response.status === 200) {
        const totalPropostasPorJob = response.data;
        const jobPropostas = totalPropostasPorJob.find(tp => tp.idJobs === jobId);
        setTotalPropostas(jobPropostas ? jobPropostas.totalPropostas : 0);
      } else {
        setTotalPropostas(0);
        Alert.alert('Erro', 'Erro ao buscar as propostas do cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar as propostas do cliente', error);
      setTotalPropostas(0);
      Alert.alert('Erro', 'Erro ao buscar as propostas do cliente');
    }
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const renderFeedItem = ({ item }) => {
    let bgIcon;
    let icon;

    switch (item.status) {
      case 'Aceito':
        bgIcon = "#0B7E40";
        icon = "check";
        break;
      case 'Pendente':
        bgIcon = '#5F5F5F';
        icon = "clock-o";
        break;
      case 'Finalizado':
        bgIcon = "#225CB4";
        icon = "money";
        break;
      default:
        bgIcon = "#7E0B20";
        icon = "times";
        break;
    }

    return (
      <TouchableOpacity style={styles.feedItem} onPress={() => {
        setSelectedJob(item);
        setModalVisible(true);
        fetchPropostas(item.id);
      }}>
        <View style={styles.headerJob}>
          <View style={styles.infoJob}>
            <Text style={styles.dateJob}>{new Date(item.dataJob).toLocaleDateString()}</Text>
            <Text style={styles.titleJob}>{item.titulo}</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: bgIcon }]}>
            <Icon name={icon} color='white' size={20} />
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
              fetchPropostas(item.id); 
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
        <TouchableOpacity onPress={() => navigation.navigate("TelaCliente")} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>JOBS ({totalJobs})</Text> 
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
                  onPress={() => {navigation.navigate('TelaPropostaCliente', { jobId: selectedJob.id }); setModalVisible(false);}}
                >
                  <Text style={styles.propostasBtnText}>({totalPropostas ? totalPropostas : 0}) PROPOSTAS</Text>
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
