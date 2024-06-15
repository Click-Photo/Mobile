import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import styles from './JobsStyles';

function Jobs({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobData = [
    { id: 1, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'check', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Aceito' },
    { id: 2, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'clock-o', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pendente' },
    { id: 3, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'times', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Negado' },
    { id: 4, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'money', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pago' },
  ];

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const renderFeedItem = ({ item }) => {
    let bgIcon;

    if (item.icon === 'check') {
      bgIcon = "#0B7E40";
    } else if (item.icon === 'clock-o') {
      bgIcon = '#5F5F5F';
    } else if (item.icon === 'times') {
      bgIcon = "#7E0B20";
    } else if (item.icon === 'money') {
      bgIcon = "#225CB4";
    } else {
      bgIcon = "#7E0B20";
    }

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
          <View style={[styles.iconContainer, { backgroundColor: bgIcon }]}>
            <Icon name={item.icon} color='white' size={20} />
          </View>
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
        <TouchableOpacity onPress={() => navigation.navigate("TelaCliente")} style={styles.goBackButton}>
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
                  <Text style={styles.propostasBtnText}>(20) PROPOSTAS</Text>
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
