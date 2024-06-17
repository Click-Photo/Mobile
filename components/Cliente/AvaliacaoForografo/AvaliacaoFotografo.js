import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import styles from "./AvaliacaoFotografoStyles";
import { useUser } from '../../UserContext';

const renderStarIcons = (rating) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const starIcons = [];

  for (let i = 0; i < filledStars; i++) {
    starIcons.push(<Icon key={i} name="star" size={15} color="#000" />);
  }
  if (halfStar) {
    starIcons.push(<Icon key="half" name="star-half" size={15} color="#000" />);
  }

  const remainingStars = 5 - filledStars - (halfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    starIcons.push(<Icon key={`empty-${i}`} name="star" size={15} color="gray" />);
  }

  return starIcons;
};

const ProposalCard = ({ item, onSubmitRating }) => {
  const [rating, setRating] = useState(item.rating || 0); // Estado para controlar a avaliação de cada item
  
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const renderRatingButtons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)} style={styles.ratingButton}>
          <Icon name={i <= rating ? 'star' : 'star-o'} size={33} color={i <= rating ? 'black' : 'gray'} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.containerDate}>
        <View style={styles.wrapperDate}>
          <Text style={styles.dateTitle}>DATA DO JOB</Text>
          <Text style={styles.date}>{new Date(item.dataJob).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.amount}>R$ {item.preco}</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileContainerWrapper}>
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="user" size={40} color="gray" style={styles.profileIcon} />
          )}
          <View style={styles.wrapperTitlePhoto}>
            <Text style={styles.photographerName}>{item.nomeFotografo}</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileButtonText}>Ver Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {renderRatingButtons()}
      </View>

      <TouchableOpacity
        style={styles.modalSeePerfilButton}
        onPress={() => onSubmitRating(item.jobId, rating)}
      >
        <Text style={styles.modalSeePerfilButtonText}>ENVIAR AVALIACAO</Text>
      </TouchableOpacity>
    </View>
  );
};

const AvaliacoesScreen = ({ route, navigation }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const fetchAvaliacoes = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/avaliacoesPendentesCliente/${user.user.id}`);
      if (response.status === 200) {
        setAvaliacoes(response.data);
      } else {
        Alert.alert('Erro', 'Erro ao buscar avaliações pendentes');
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações pendentes', error);
      Alert.alert('Erro', 'Erro ao buscar avaliações pendentes');
    }
  };

  const enviarAvaliacao = async (jobId, rating) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/avaliarFotografo/${jobId}`, {
        notaFotografo: rating
      });
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Avaliação enviada com sucesso');
        fetchAvaliacoes();
      } else {
        Alert.alert('Erro', 'Erro ao enviar avaliação');
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação', error);
      Alert.alert('Erro', 'Erro ao enviar avaliação');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>AVALIAÇÕES</Text>
      <FlatList
        data={avaliacoes}
        renderItem={({ item }) => (
          <ProposalCard 
            item={item} 
            onSubmitRating={enviarAvaliacao} 
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AvaliacoesScreen;
