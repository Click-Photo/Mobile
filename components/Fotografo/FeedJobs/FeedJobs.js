import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path, ClipPath, Defs, Rect } from 'react-native-svg';
import { useUser } from '../../UserContext';
import { API_URL_MOBILE } from '@env';

import styles from './FeedJobsStyles';

function Jobs({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([]);
  
  const { user } = useUser();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/visualizarJobs`);
      setJobData(response.data);
    } catch (error) {
      console.error("Erro ao coletar informações sobre os jobs", error);
    }
  };

  const handleCreateProposta = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/criarProposta/${selectedJob.id}`, {
        idFotografo: user.user.id,  
        idCliente: selectedJob.idCliente
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Proposta realizada com sucesso.');
        setModalVisible(false);
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error("Erro ao criar proposta", error);
      Alert.alert('Erro', 'Erro ao criar a proposta.');
    }
  };

  const handleMarkInterest = async (jobId) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/marcarInteresse/${jobId}`, {
        idFotografo: user.user.id
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Interesse marcado com sucesso.');
        toggleLike(jobId);
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error("Erro ao marcar interesse", error);
      Alert.alert('Erro', 'Erro ao marcar interesse.');
    }
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const toggleLike = (id) => {
    setJobData(currentJobs => 
      currentJobs.map(job => 
        job.id === id ? {...job, liked: !job.liked} : job
      )
    );
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderFeedItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.feedItem} onPress={() => {
        console.log("Selected Job:", item); 
        setSelectedJob(item);
        setModalVisible(true);
      }}>
        <View style={styles.headerJob}>
          <View style={styles.infoJob}>
            <Text style={styles.dateJob}>{new Date(item.dataJob).toLocaleDateString()}</Text>
            <Text style={styles.titleJob}>{item.titulo}</Text>
          </View>

          <TouchableOpacity onPress={() => handleMarkInterest(item.id)} style={styles.likeButton}>
            <Icon name={item.liked ? "thumbs-up" : "thumbs-o-up"} size={20} color="black" />
            <Text style={styles.likeText}>Interesse</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.localtionJob}>
          <IconTwo name="location-on" size={20} color="#000" />
          <Text style={styles.localtionText}>{item.local}</Text>
        </View>

        <View style={styles.descJob}>
          <Text style={styles.descJobText}>
            {truncateText(item.descricao, 100)}
          </Text>
        </View>

        <View style={[styles.feedItemArtist, { width: '100%', justifyContent: 'space-between' }]}>
          <View style={styles.containerBtnSee}>
            <Text style={styles.priceJob}>R$ {item.preco}</Text>
            <TouchableOpacity style={styles.feedItemButton} onPress={() => {
              console.log("Selected Job:", item); // Log para verificar o item selecionado
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
          <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => console.log('Menu')}>
            <Image
              source={require('../../../assets/icon-click.png')}
              style={{width: 33, height: 37}}
            />
            </TouchableOpacity>
            <Text style={styles.greeting}>Olá, { user.user.nome }</Text>
            
          </View>
          <TouchableOpacity onPress={() =>  navigation.navigate('TelaFotografoPage')}>
            <Svg width={29} height={29} viewBox="0 0 29 29" fill="none">
              <Path
                d="M14.5 2C11.1859 2.00371 8.00866 3.32186 5.66526 5.66526C3.32186 8.00866 2.00371 11.1859 2 14.5C2.00555 17.8135 3.3243 20.9897 5.6673 23.3327C8.0103 25.6757 11.1865 26.9944 14.5 27C17.8152 27 20.9946 25.683 23.3388 23.3388C25.683 20.9946 27 17.8152 27 14.5C27 11.1848 25.683 8.00537 23.3388 5.66117C20.9946 3.31696 17.8152 2 14.5 2ZM22.103 21.713C21.401 20.297 20.3172 19.1054 18.974 18.2726C17.6307 17.4397 16.0815 16.9989 14.501 16.9997C12.9206 17.0005 11.3718 17.443 10.0294 18.2773C8.68705 19.1115 7.60453 20.3043 6.904 21.721C5.03491 19.7825 3.99344 17.1928 4 14.5C4 11.7152 5.10625 9.04451 7.07538 7.07538C9.04451 5.10625 11.7152 4 14.5 4C17.2848 4 19.9555 5.10625 21.9246 7.07538C23.8938 9.04451 25 11.7152 25 14.5C25.0063 17.189 23.9675 19.7753 22.103 21.713ZM14.5 7C13.61 7 12.74 7.26392 11.9999 7.75839C11.2599 8.25285 10.6831 8.95566 10.3425 9.77792C10.0019 10.6002 9.91283 11.505 10.0865 12.3779C10.2601 13.2508 10.6887 14.0526 11.318 14.682C11.9474 15.3113 12.7492 15.7399 13.6221 15.9135C14.495 16.0872 15.3998 15.9981 16.2221 15.6575C17.0443 15.3169 17.7471 14.7401 18.2416 14.0001C18.7361 13.26 19 12.39 19 11.5C19 10.9091 18.8836 10.3239 18.6575 9.77792C18.4313 9.23196 18.0998 8.73588 17.682 8.31802C17.2641 7.90016 16.768 7.56869 16.2221 7.34254C15.6761 7.1164 15.0909 7 14.5 7Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        
      <Text style={styles.title}>JOBS</Text>

      <View style={styles.contentContainer}>

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

                {/* <Text style={styles.localtionProposal}>{selectedJob.status}</Text> */}
              </View>

               <View style={styles.perfilJobModal}>
                <TouchableOpacity style={styles.profileButton} onPress={() => {navigation.navigate("TelaClienteFotografo", { idCliente: selectedJob.idCliente }), setModalVisible(false)}}>
                  <Text style={styles.perfilnText}>{selectedJob.nomeCliente}</Text>
                  <Text style={styles.profileButtonText}>VER PERFIL</Text>
                </TouchableOpacity>
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
                  onPress={() => {handleCreateProposta(), setModalVisible(false)}}
                >
                  <Text style={styles.propostasBtnText}>FAZER PROPOSTA</Text>
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
