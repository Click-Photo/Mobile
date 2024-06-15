import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import IconTwo from 'react-native-vector-icons/MaterialIcons';

import styles from './JobsInteresseStyles';

function Jobs({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([
      { id: 1, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'check', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Aceito', liked: false },
      { id: 2, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'clock-o', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pendente', liked: false },
      { id: 3, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'times', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Negado', liked: false },
      { id: 4, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'money', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pago', liked: false }
    ]);

  const toggleLike = (id) => {
    setJobData(currentJobs => 
      currentJobs.map(job => 
        job.id === id ? {...job, liked: !job.liked} : job
      )
    );
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

 const renderFeedItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.feedItem} onPress={() => {
        setSelectedJob(item);
        setModalVisible(true);
      }}>
        <View style={styles.headerJob}>
          <View style={styles.infoJob}>
            <Text style={styles.dateJob}>{item.date}</Text>
            <Text style={styles.titleJob}>{item.titleJob}</Text>
          </View>

          <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.likeButton}>
              <Icon name={item.liked ? "thumbs-up" : "thumbs-o-up"} size={20} color="black" />
              <Text style={styles.likeText}>Interesse</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.localtionJob}>
          <IconTwo name="location-on" size={20} color="#000" />
          <Text style={styles.localtionText}>AV. SANTOS GIUSTI 178</Text>
          <Text style={styles.localtionProposal}>(20) PROPOSTAS</Text>
        </View>

        <View style={styles.descJob}>
          <Text style={styles.descJobText}>
            {item.descJob}
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
        <Text style={styles.title}>JOBS DE INTERESSE</Text>
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
                  <Text style={styles.dateJob}>{selectedJob.date}</Text>
                  <Text style={styles.modalTitle}>{selectedJob.titleJob}</Text>
                </View>
                <Text style={styles.modalDate}>{selectedJob.status}</Text>
              </View>

              <Text style={styles.modalDescription}>{selectedJob.descJob}</Text>
              <View style={styles.localContainer}>
                <Text style={styles.localTitle}>LOCAL</Text>
                <Text style={styles.localText}>AV. PINHEIRO 2000</Text>
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
