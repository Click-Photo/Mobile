import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, Modal, Alert } from 'react-native';
import Svg, { Path, ClipPath, Defs, Rect } from 'react-native-svg';
import styles from './TelaFeedArteStyles';
import { useUser } from '../../UserContext';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';

const randomPersonIcons = [
  "user-circle",
  "user",
  "user-o",
  "user-circle-o"
];

const getRandomPersonIcon = () => {
  return randomPersonIcons[Math.floor(Math.random() * randomPersonIcons.length)];
};

const TelaFeedArte = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [sliderData, setSliderData] = useState([]);
  const [feedData, setFeedData] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    fetchFotografos();
    fetchPortfolio();
  }, []);

  const fetchFotografos = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/visualizarFotografo`);
      if (response.status === 200) {
        setSliderData(response.data);
      } else {
        Alert.alert('Erro', 'Erro ao buscar fotógrafos');
      }
    } catch (error) {
      console.error('Erro ao buscar fotógrafos', error);
      Alert.alert('Erro', 'Erro ao buscar fotógrafos');
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/listarTodasFotos`);
      if (response.status === 200) {
        setFeedData(response.data);
      } else {
        Alert.alert('Erro', 'Erro ao buscar portfólio');
      }
    } catch (error) {
      console.error('Erro ao buscar portfólio', error);
      Alert.alert('Erro', 'Erro ao buscar portfólio');
    }
  };

  const renderFeedItem = ({ item }) => (
    <TouchableOpacity style={styles.feedItem} onPress={() => {
      setSelectedArt(item);
      setModalVisible(true);
    }}>
      <Image source={{ uri: item.fotoUrl }} style={styles.feedItemImage} />
      
      <Text style={styles.feedItemName}>{item.descricao}</Text>
      <View style={[styles.feedItemArtist, { width: '100%', justifyContent: 'space-between' }]}>
        <View style={styles.feedItemArtist}>
          {item.perfilPhoto ? (
            <Image source={{ uri: item.perfilPhoto }} style={styles.artistImage} />
          ) : (
            <Icon name={getRandomPersonIcon()} size={25} color="gray" style={styles.artistImage} />
          )}
          <Text style={styles.artistName}>{item.fotografoNome}</Text>
        </View>
         <TouchableOpacity style={styles.feedItemButton} onPress={() => {
           setSelectedArt(item);
           setModalVisible(true);
         }}>
          <Text style={styles.feedItemButtonText}>Ver</Text>
        </TouchableOpacity>
      </View>
     
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => console.log('Menu')}>
              <Svg width={33} height={37} viewBox="0 0 93 87" fill="none">
                  <Defs>
                    <ClipPath id="clip0_49_22">
                      <Rect width={92} height={87} fill="white" transform="translate(0.5)" />
                    </ClipPath>
                  </Defs>
                  <Path
                    d="M36.5333 38.0625L54.7991 8.13812C52.135 7.57625 49.3558 7.25 46.5 7.25C37.3 7.25 28.8858 10.3131 22.2733 15.4244L36.3225 38.425L36.5333 38.0625ZM83.07 32.625C79.5433 22.0219 70.995 13.5575 60.0891 9.6425L46.0591 32.625H83.07ZM84.0666 36.25H55.355L56.4666 38.0625L74.7325 67.9688C80.9808 61.5163 84.8333 52.9431 84.8333 43.5C84.8333 41.0169 84.565 38.5881 84.0666 36.25ZM33.2175 43.5L18.2675 19.0312C12.0191 25.4837 8.16663 34.0569 8.16663 43.5C8.16663 45.9831 8.43496 48.4119 8.93329 50.75H37.645L33.2175 43.5ZM9.92996 54.375C13.4566 64.9781 22.005 73.4425 32.9108 77.3575L46.9408 54.375H9.92996ZM53.1316 54.375L38.1816 78.8619C40.865 79.4237 43.6441 79.75 46.5 79.75C55.7 79.75 64.1141 76.6869 70.7266 71.5756L56.6775 48.575L53.1316 54.375Z"
                    fill="white"
                  />
                </Svg>
            </TouchableOpacity>
            <Text style={styles.greeting}>Olá, { user.user.nome }</Text>
            
          </View>
          <TouchableOpacity onPress={() =>  navigation.navigate('TelaCliente')}>
            <Svg width={29} height={29} viewBox="0 0 29 29" fill="none">
              <Path
                d="M14.5 2C11.1859 2.00371 8.00866 3.32186 5.66526 5.66526C3.32186 8.00866 2.00371 11.1859 2 14.5C2.00555 17.8135 3.3243 20.9897 5.6673 23.3327C8.0103 25.6757 11.1865 26.9944 14.5 27C17.8152 27 20.9946 25.683 23.3388 23.3388C25.683 20.9946 27 17.8152 27 14.5C27 11.1848 25.683 8.00537 23.3388 5.66117C20.9946 3.31696 17.8152 2 14.5 2ZM22.103 21.713C21.401 20.297 20.3172 19.1054 18.974 18.2726C17.6307 17.4397 16.0815 16.9989 14.501 16.9997C12.9206 17.0005 11.3718 17.443 10.0294 18.2773C8.68705 19.1115 7.60453 20.3043 6.904 21.721C5.03491 19.7825 3.99344 17.1928 4 14.5C4 11.7152 5.10625 9.04451 7.07538 7.07538C9.04451 5.10625 11.7152 4 14.5 4C17.2848 4 19.9555 5.10625 21.9246 7.07538C23.8938 9.04451 25 11.7152 25 14.5C25.0063 17.189 23.9675 19.7753 22.103 21.713ZM14.5 7C13.61 7 12.74 7.26392 11.9999 7.75839C11.2599 8.25285 10.6831 8.95566 10.3425 9.77792C10.0019 10.6002 9.91283 11.505 10.0865 12.3779C10.2601 13.2508 10.6887 14.0526 11.318 14.682C11.9474 15.3113 12.7492 15.7399 13.6221 15.9135C14.495 16.0872 15.3998 15.9981 16.2221 15.6575C17.0443 15.3169 17.7471 14.7401 18.2416 14.0001C18.7361 13.26 19 12.39 19 11.5C19 10.9091 18.8836 10.3239 18.6575 9.77792C18.4313 9.23196 18.0998 8.73588 17.682 8.31802C17.2641 7.90016 16.768 7.56869 16.2221 7.34254C15.6761 7.1164 15.0909 7 14.5 7Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
        </View>

       <FlatList
          data={sliderData}
          horizontal
          showsHorizontalScrollIndicator={false} 
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.sliderItem}>
              {item.perfilPhoto ? (
                <Image source={{ uri: item.perfilPhoto }} style={styles.sliderItemImage} />
              ) : (
                <Icon name={getRandomPersonIcon()} size={40} color="white" style={styles.sliderItemImage} />
              )}
              <Text style={styles.sliderItemName}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          style={styles.sliderContainer}
        />

        <FlatList
          data={feedData}
          renderItem={renderFeedItem}
          keyExtractor={item => item.portfolioId.toString()}
          contentContainerStyle={[styles.feedContainer, { paddingBottom: 300 }]} 
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedArt(null);
        }}
      >
        <View style={styles.modalContainer}>
            
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedArt(null);
              }}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>
            <Image source={selectedArt ? { uri: selectedArt.fotoUrl } : null} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedArt ? selectedArt.descricao : ''}</Text>
            <View style={styles.modalArtist}>
              {selectedArt && selectedArt.perfilPhoto ? (
                <Image source={{ uri: selectedArt.perfilPhoto }} style={styles.artistImage} />
              ) : (
                <Icon name={getRandomPersonIcon()} size={25} color="gray" style={styles.artistImage} />
              )}
              <Text style={styles.artistName}>{selectedArt ? selectedArt.fotografoNome : ''}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalSeePerfilButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedArt(null);
                navigation.navigate('TelaFotografo', { artistId: selectedArt.fotografoId, perfilPhoto: selectedArt.perfilPhoto });
              }}
            >
              <Text style={styles.modalSeePerfilButtonText}>VER PERFIL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TelaFeedArte;
