import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Linking, ScrollView, FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ClientePageStyles';
import { screenWidth } from './ClientePageStyles';
import { Ionicons } from '@expo/vector-icons';
import IconTwo from 'react-native-vector-icons/MaterialIcons';

const TelaFotografo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [activeTab, setActiveTab] = useState('Jobs');

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobData, setJobData] = useState([
      { id: 1, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'check', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Aceito', liked: false },
      { id: 2, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'clock-o', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pendente', liked: false },
      { id: 3, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'times', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Negado', liked: false },
      { id: 4, date: '20 DEZ. 2024', titleJob: 'TITULO POSTAGEM', icon: 'money', descJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', preco: 2500, status: 'Pago', liked: false }
    ]);

  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Olá!&phone=+5511000000000');
  };

  const sendEmail = () => {
      Linking.openURL('mailto:foto@gmail.com?subject=Assunto&body=Corpo do email');
  };


  const renderStarIcons = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const starIcons = [];

    for (let i = 0; i < filledStars; i++) {
      starIcons.push(<Icon key={i} name="star" size={20} color="#F8B84E" />);
    }
    if (halfStar) {
      starIcons.push(<Icon key="half" name="star-half" size={20} color="#F8B84E" />);
    }
    const remainingStars = 5 - filledStars - (halfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<Icon key={`empty-${i}`} name="star" size={20} color="gray" />);
    }
    return starIcons;
  };

  const averageRating = 4.5;
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
  
const Jobs = () => {
  return(
    <View style={styles.contentContainer}>

        <FlatList
          data={jobData}
          renderItem={renderFeedItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[styles.feedContainer, { paddingBottom: 100 }]}
        />
      </View>
  )

};

const Sobre = () => {
    return (
        <View style={styles.sobreContainer}>
            <Text style={styles.sobreHeader}>ENDEREÇO</Text>
            <Text style={styles.sobreContent}>Av. Pinheiro, 2802</Text>

            <Text style={styles.sobreHeader}>QUANTIDADE DE JOBS FEITOS</Text>
            <Text style={styles.sobreContent}>32</Text>

            <Text style={styles.sobreHeader}>SOBRE MIM</Text>
            <Text style={styles.sobreContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </View>
    );
};

const ContactModal = () => {
    return (
        <Modal
            visible={modalContact}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalContact(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainerContact}>
                    <TouchableOpacity onPress={() => setModalContact(false)} style={styles.modalCloseButtonContact}>
                       <Text style={styles.modalCloseButtonTextContact}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitleContact}>CONTATO</Text>
                    <View style={styles.contactInfoContact}>
                        <Text style={styles.contactLabelContact}>WHATS: (11) 00000-0000</Text>
                        <TouchableOpacity style={styles.contactButtonContact} onPress={openWhatsApp}>
                            <Text style={styles.contactButtonTextContact}>MANDAR MENSAGEM</Text>
                        </TouchableOpacity>
                        <Text style={styles.contactLabelContact}>E-MAIL: foto@gmail.com</Text>
                        <TouchableOpacity style={styles.contactButtonContact} onPress={sendEmail}>
                            <Text style={styles.contactButtonTextContact}>MANDAR E-MAIL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
       <ScrollView style={{ flex: 1 }}>

          <View style={styles.contentContainer}>
            <Image source={require("../../../assets/photo1.png")} style={styles.profilePic} />
            <Text style={styles.title}>Aline Fernandes</Text>

            <View style={styles.infoClient}>
                <View style={styles.statsItem}>
                    <Text style={styles.statsTextTitle}>100</Text>
                    <Text style={styles.statsText}>Fotos</Text>
                </View>
                
                <View style={styles.separator}></View>

                <View style={styles.statsItem}>
                    <Text style={styles.statsTextSecond}>{averageRating} (32)</Text>
                    <View style={styles.statsItemSecond}>
                      {renderStarIcons(averageRating)}
                    </View>
                </View>
            </View>

             <TouchableOpacity style={styles.contactButtonModal} onPress={() => setModalContact(true)}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>CONTATO</Text>
            </TouchableOpacity>

            <View style={styles.tabSelector}>
                <TouchableOpacity onPress={() => setActiveTab('Jobs')}>
                    <Text style={activeTab === 'Jobs' ? styles.activeTab : styles.inactiveTab}>Jobs</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('Sobre')}>
                    <Text style={activeTab === 'Sobre' ? styles.activeTab : styles.inactiveTab}>Sobre</Text>
                </TouchableOpacity>
            </View>
            
            {activeTab === 'Jobs' ? <Jobs /> : <Sobre />}
            
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

                      <Text style={styles.localtionProposal}>(20) PROPOSTAS</Text>
                    </View>

                    <View style={styles.perfilJobModal}>
                      <Text style={styles.perfilnText}>ALINE SANTOS</Text>
                      <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.profileButtonText}>VER PERFIL</Text>
                      </TouchableOpacity>
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
                        <Text style={styles.propostasBtnText}>FAZER PROPOSTA</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                </View>
              </Modal>
            )}
          
      </ScrollView>

      <ContactModal />
    </View>
  );
};

export default TelaFotografo;
