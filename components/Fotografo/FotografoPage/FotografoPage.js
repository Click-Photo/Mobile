import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './FotografoPageStyles';
import { screenWidth } from './FotografoPageStyles';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../UserContext';
import axios from 'axios';
import { API_URL_MOBILE } from '@env';

const TelaFotografo = ({ navigation }) => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Fotos');
  const [portfolioFotos, setPortfolioFotos] = useState([]);

  const { user, updateUser } = useUser();

  const [nome, setNome] = useState(user.user.nome);
  const [email, setEmail] = useState(user.user.email);
  const [telefone, setTelefone] = useState(user.user.telefone);
  const [CEP, setCEP] = useState(user.user.CEP);
  const [CPF, setCPF] = useState(user.user.CPF);
  const [senha, setSenha] = useState('');
  const [averageRating, setAverageRating] = useState(5);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);

  useEffect(() => {
    fetchAverageRating();
    fetchPortfolioFotos();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/mediaAvaliacoesFotografo/${user.user.id}`);
      if (response.status === 200) {
        const { mediaNota, totalAvaliacoes } = response.data;
        const rating = mediaNota !== 'Sem avaliações' ? parseFloat(mediaNota) : 5;
        setAverageRating(rating);
        setTotalAvaliacoes(totalAvaliacoes);
      } else {
        setAverageRating(5);
      }
    } catch (error) {
      console.error('Erro ao buscar a média da nota do fotógrafo', error);
      setAverageRating(5);
    }
  };

  const fetchPortfolioFotos = async () => {
    try {
      const response = await axios.get(`${API_URL_MOBILE}/click/listarFotosFotografo/${user.user.id}`);
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
    return (
      <View style={{ flexDirection: 'row', justifyContent: "space-between", gap: 8 }}>
        <View>
          {portfolioFotos.filter((_, index) => index % 2 === 0).map(foto => (
            <Image
              key={foto.id}
              source={{ uri: foto.fotoUrl }}
              style={[styles.imagePortfolio, { width: 150, height: 250}]}
            />
          ))}
        </View>
        <View>
          {portfolioFotos.filter((_, index) => index % 2 !== 0).map(foto => (
            <Image
              key={foto.id}
              source={{ uri: foto.fotoUrl }}
              style={[styles.imagePortfolio, { width: 150, height: 250}]}
            />
          ))}
        </View>
      </View>
    );
  };

  const Sobre = () => {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnContainer} onPress={() => setInfoModalVisible(true)}>
          <View style={styles.btnIcon}>
            <Icon name="user" size={20} color="#555555" />
            <Text style={styles.titleBtn}>INFO</Text>
          </View>
          <View style={styles.btnIcon}>
            <Text style={styles.btnText}>ver +</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('TelaJobsFotografo')}>
          <View style={styles.btnIcon}>
            <Icon name="briefcase" size={20} color="#555555" />
            <Text style={styles.titleBtn}>JOBS</Text>
          </View>
          <View style={styles.btnIcon}>
            <Text style={styles.btnText}>ver +</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("TelaJobsInteresse")}>
          <View style={styles.btnIcon}>
            <Icon name="thumbs-up" size={20} color="#555555" />
            <Text style={styles.titleBtn}>INTERESSE</Text>
          </View>
          <View style={styles.btnIcon}>
            <Text style={styles.btnText}>ver +</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer}
          onPress={() => navigation.navigate('TelaAvaliacaoCliente')}>
          <View style={styles.btnIcon}>
            <Icon name="star" size={20} color="#555555" />
            <Text style={styles.titleBtn}>AVALIAR</Text>
          </View>
          <View style={styles.btnIcon}>
            <Text style={styles.btnText}>ver +</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  };

  const handleUpdateFotografo = async () => {
    try {
      const response = await axios.post(`${API_URL_MOBILE}/click/alterarFotografo/${user.user.id}`, {
        nome,
        telefone,
        senha,
        CEP
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Dados do fotógrafo atualizados com sucesso.');
        updateUser({ nome, telefone, CEP });
        setEditModalVisible(false);
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do fotógrafo', error);
      Alert.alert('Erro', 'Erro ao atualizar dados do fotógrafo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('Login'); }} style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color="white" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
        {user.user.profileImage ? (
          <Image source={{ uri: user.user.profileImage }} style={styles.profilePic} />
        ) : (
          <Icon name="user" size={100} color="gray" style={styles.profileIcon} />
        )}
          <Text style={styles.title}>{user.user.nome}</Text>

          <View style={styles.infoClient}>
            <View style={styles.statsItem}>
              <Text style={styles.statsTextTitle}>{portfolioFotos.length}</Text>
              <Text style={styles.statsText}>Fotos</Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.statsItem}>
              <Text style={styles.statsTextSecond}>{averageRating} {totalAvaliacoes > 0 ? "(" + totalAvaliacoes + ")" : ""}</Text>
              <View style={styles.statsItemSecond}>
                {renderStarIcons(averageRating)}
              </View>
            </View>
          </View>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setInfoModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>

            <View styles={styles.modalContentText}>
              <Text style={styles.modalInfoTitle}>INFORMAÇÕES</Text>

              <Text style={styles.modalText}>NOME:</Text>
              <Text style={styles.modalContentText}>{nome}</Text>

              <Text style={styles.modalText}>EMAIL:</Text>
              <Text style={styles.modalContentText}>{email}</Text>

              <Text style={styles.modalText}>TELEFONE:</Text>
              <Text style={styles.modalContentText}>{telefone}</Text>

              <Text style={styles.modalText}>ENDEREÇO:</Text>
              <Text style={styles.modalContentText}>{CEP}</Text>

              <Text style={styles.modalText}>CPF:</Text>
              <Text style={styles.modalContentText}>{CPF}</Text>
            </View>

            <View style={styles.modalEdit}>
              <TouchableOpacity style={styles.modalEditButton}
                onPress={() => {
                  setInfoModalVisible(false);
                  setEditModalVisible(true);
                }}>

                <Text style={styles.modalEditText}>EDITAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>EDITAR INFORMAÇÕES</Text>

            <View style={styles.wrapperInput}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>NOME:</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>EMAIL:</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>TELEFONE:</Text>
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={setTelefone}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>ENDEREÇO:</Text>
                <TextInput
                  style={styles.input}
                  value={CEP}
                  onChangeText={setCEP}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>SENHA:</Text>
                <TextInput
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.modalEdit}>
              <TouchableOpacity style={styles.modalEditButton} onPress={handleUpdateFotografo}>
                <Text style={styles.modalEditText}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TelaFotografo;
