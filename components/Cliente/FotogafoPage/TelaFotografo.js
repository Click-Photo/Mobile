import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import styles from './TelaFotografoStyles';

const TelaFotografo = ({ navigation, route }) => {
  const { artistId, perfilPhoto } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Fotos');
  const [fotografo, setFotografo] = useState(null);
  const [mediaNota, setMediaNota] = useState(5);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [portfolioFotos, setPortfolioFotos] = useState([]);

  useEffect(() => {
    fetchFotografo();
    fetchMediaAvaliacoes();
    fetchFotosPortfolio();
  }, []);

  const fetchFotografo = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/getEspecifFotografo/${artistId}`);
      if (response.status === 200) {
        setFotografo(response.data[0]);
      } else {
        Alert.alert('Erro', 'Erro ao buscar informações do fotógrafo');
      }
    } catch (error) {
      console.error('Erro ao buscar informações do fotógrafo', error);
      Alert.alert('Erro', 'Erro ao buscar informações do fotógrafo');
    }
  };

  const fetchMediaAvaliacoes = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/mediaAvaliacoesFotografo/${artistId}`);
      if (response.status === 200) {
        setMediaNota(response.data.mediaNota);
        setTotalAvaliacoes(response.data.totalAvaliacoes);
      } else {
        Alert.alert('Erro', 'Erro ao buscar avaliações do fotógrafo');
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações do fotógrafo', error);
      Alert.alert('Erro', 'Erro ao buscar avaliações do fotógrafo');
    }
  };

  const fetchFotosPortfolio = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/listarFotosFotografo/${artistId}`);
      if (response.status === 200) {
        setPortfolioFotos(response.data);
      } else {
        Alert.alert('Erro', 'Erro ao buscar fotos do portfólio');
      }
    } catch (error) {
      console.error('Erro ao buscar fotos do portfólio', error);
      Alert.alert('Erro', 'Erro ao buscar fotos do portfólio');
    }
  };

  const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=Olá!&phone=${fotografo?.telefone}`);
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${fotografo?.email}?subject=Assunto&body=Corpo do email`);
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

  const Fotos = () => {
    if (portfolioFotos.length === 0) {
      return <Text style={styles.noFotosText}>Nenhuma foto disponível.</Text>;
    }

    const testUrl = "https://res.cloudinary.com/dwu4ve7bp/image/upload/v1718585854/bt105glsxnzr4decna8m.jpg";

    const columns = [[], []];
    portfolioFotos.forEach((foto, index) => {
      columns[index % 2].push(
       
        <Image
          key={foto.id}
          source={{ uri: foto.fotoUrl }}
          style={[styles.imagePortfolio, { width: 250, height: 250}]}
        />


      );
    });

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View>{columns[0]}</View>
        <View>{columns[1]}</View>
      </View>
    );
  };

  const Sobre = () => {
    return (
      <View style={styles.sobreContainer}>
        <Text style={styles.sobreHeader}>ENDEREÇO</Text>
        <Text style={styles.sobreContent}>{fotografo?.CEP}</Text>

        <Text style={styles.sobreHeader}>QUANTIDADE DE JOBS FEITOS</Text>
        <Text style={styles.sobreContent}>{fotografo.jobsFeitos ? fotografo.jobsFeitos : 0}</Text>

        <Text style={styles.sobreHeader}>SOBRE MIM</Text>
        <Text style={styles.sobreContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </View>
    );
  };

  const ContactModal = () => {
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>CONTATO</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WHATS: {fotografo?.telefone}</Text>
              <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
                <Text style={styles.contactButtonText}>MANDAR MENSAGEM</Text>
              </TouchableOpacity>
              <Text style={styles.contactLabel}>E-MAIL: {fotografo?.email}</Text>
              <TouchableOpacity style={styles.contactButton} onPress={sendEmail}>
                <Text style={styles.contactButtonText}>MANDAR E-MAIL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (!fotografo) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          {perfilPhoto ? (
            <Image source={{ uri: perfilPhoto }} style={styles.profilePic} />
          ) : (
            <Icon name="user" size={100} color="gray" style={styles.profileIcon} />
          )}
          <Text style={styles.title}>{fotografo.nome}</Text>

          <View style={styles.infoClient}>
            <View style={styles.statsItem}>
              <Text style={styles.statsTextTitle}>4</Text>
              <Text style={styles.statsText}>Fotos</Text>
            </View>
            
            <View style={styles.separator}></View>

            <View style={styles.statsItem}>
              <Text style={styles.statsTextSecond}>{mediaNota !== "Sem avaliações" ? mediaNota : 5} {totalAvaliacoes ? `(${totalAvaliacoes})` : ""}</Text>
              <View style={styles.statsItemSecond}>
                {renderStarIcons(mediaNota !== "Sem avaliações" ? mediaNota : 5)}
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButtonModal} onPress={() => setModalVisible(true)}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>CONTATO</Text>
          </TouchableOpacity>

          <View style={styles.tabSelector}>
            <TouchableOpacity onPress={() => setActiveTab('Fotos')}>
              <Text style={activeTab === 'Fotos' ? styles.activeTab : styles.inactiveTab}>Fotos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('Sobre')}>
              <Text style={activeTab === 'Sobre' ? styles.activeTab : styles.inactiveTab}>Sobre</Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'Fotos' ? <Fotos /> : <Sobre />}
        </View>
      </ScrollView>
      <ContactModal />
    </View>
  );
};

export default TelaFotografo;
