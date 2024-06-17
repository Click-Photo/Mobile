import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';
import styles from "./PropostasStyles";
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

const ProposalCard = ({ item, navigation, onAccept, onReject, onFinalize, jobAccepted }) => (
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
          <View style={styles.ratingContainer}>
            <View style={styles.statsItemSecond}>
              {renderStarIcons(item.rating ? item.rating : 5)}
            </View>
            <Text style={styles.ratingText}>({item.rating ? item.rating : 5})</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('TelaFotografo', { artistId: item.idFotografo, perfilPhoto: item.profileImage })}
          >
            <Text style={styles.profileButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={styles.buttonsContainer}>
      {!jobAccepted && (
        <>
          <TouchableOpacity style={styles.rejectButton} onPress={() => onReject(item.id, item.idFotografo)}>
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(item.id, item.idJobs, item.idFotografo)}>
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
        </>
      )}
      {jobAccepted && item.status === 'Aceito' && (
        <>
          <TouchableOpacity style={styles.rejectButton} onPress={() => onFinalize(item.idJobs)}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
);

const ProposalsScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [proposals, setProposals] = useState([]);
  const [jobAccepted, setJobAccepted] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/getPropostaJob/${jobId}`);
      if (response.status === 200) {
        const sortedProposals = response.data.sort((a, b) => b.status === 'Aceito' ? 1 : -1);
        setProposals(sortedProposals);
        setJobAccepted(response.data.some(proposal => proposal.status === 'Aceito'));
      } else {
        Alert.alert('Erro', 'Erro ao buscar as propostas do job');
      }
    } catch (error) {
      console.error('Erro ao buscar as propostas do job', error);
      Alert.alert('Erro', 'Erro ao buscar as propostas do job');
    }
  };

  const aceitarProposta = async (propostaId, jobId, fotografoId) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/aceitarProposta/${propostaId}`, {
        idJobs: jobId,
        idFotografo: fotografoId,
        nomeCliente: user.user.nome,
        telefoneCliente: user.user.telefone
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Proposta aceita com sucesso');
        fetchProposals();
      } else {
        Alert.alert('Erro', 'Erro ao aceitar a proposta');
      }
    } catch (error) {
      console.error('Erro ao aceitar a proposta', error);
      Alert.alert('Erro', 'Erro ao aceitar a proposta');
    }
  };

  const recusarProposta = async (propostaId, fotografoId) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/recusarProposta/${propostaId}`, {
        idFotografo: fotografoId,
        nomeCliente: user.user.nome
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Proposta recusada com sucesso');
        fetchProposals();
      } else {
        Alert.alert('Erro', 'Erro ao recusar a proposta');
      }
    } catch (error) {
      console.error('Erro ao recusar a proposta', error);
      Alert.alert('Erro', 'Erro ao recusar a proposta');
    }
  };

  const finalizarJob = async (jobId) => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/finalizarJob/${jobId}`);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Job finalizado com sucesso');
        navigation.navigate('AvaliacaoCliente', { clienteId: user.user.id });
      } else {
        Alert.alert('Erro', 'Erro ao finalizar o job');
      }
    } catch (error) {
      console.error('Erro ao finalizar o job', error);
      Alert.alert('Erro', 'Erro ao finalizar o job');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>PROPOSTAS</Text>
      <FlatList
        data={proposals}
        renderItem={({ item }) => (
          <ProposalCard 
            item={item} 
            navigation={navigation} 
            onAccept={aceitarProposta} 
            onReject={recusarProposta} 
            onFinalize={finalizarJob}
            jobAccepted={jobAccepted} 
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ProposalsScreen;
