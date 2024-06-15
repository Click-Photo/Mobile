import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './FotografoPageStyles';
import { screenWidth } from './FotografoPageStyles';
import { Ionicons } from '@expo/vector-icons';

const TelaFotografo = ({ navigation }) => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Fotos');


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

const Fotos = () => {
  const images = [
    require('../../../assets/image3.png'),
    require('../../../assets/image2.png'),
    require('../../../assets/image5.png'),
    require('../../../assets/image4.png'),
  ];
  const imageWidth = screenWidth / 2;  
  const columns = [[], []];  

  images.forEach((image, index) => {
    columns[index % 2].push(
      <Image
        key={index}
        source={image}
        style={styles.imagePortfolio}
      />
    );
  });

  return (
    <View style={{ flexDirection: 'row', justifyContent: "space-between", gap: 8}}>
      <View>{columns[0]}</View>
      <View>{columns[1]}</View>
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
                    <Text style={styles.modalContentText}>Aline Fernandes da Silva</Text>

                    <Text style={styles.modalText}>EMAIL:</Text>
                    <Text style={styles.modalContentText}>aline.fernandes@gmail.com</Text>

                    <Text style={styles.modalText}>TELEFONE:</Text>
                    <Text style={styles.modalContentText}>(11) 99999-999</Text>

                    <Text style={styles.modalText}>CEP:</Text>
                    <Text style={styles.modalContentText}>09990-000</Text>

                    <Text style={styles.modalText}>CPF:</Text>
                    <Text style={styles.modalContentText}>444.444.444-00</Text>
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
                            defaultValue="Aline Fernandes" 
                          />
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.inputLabel}>EMAIL:</Text>
                          <TextInput
                            style={styles.input}
                            defaultValue="aline.fernandes@gmail.com" 
                          />
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.inputLabel}>TELEFONE:</Text>
                          <TextInput
                            style={styles.input}
                            defaultValue="(11) 99999-999" 
                          />
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.inputLabel}>CEP:</Text>
                          <TextInput
                            style={styles.input}
                            defaultValue="09990-000" 
                          />
                        </View>
                    </View>

                    <View style={styles.modalEdit}>
                      <TouchableOpacity style={styles.modalEditButton} 
                        onPress={() => {
                          setInfoModalVisible(false);
                          setEditModalVisible(true);
                        }}>

                        <Text style={styles.modalEditText}>SALVAR</Text>
                      </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </Modal>
        </View>
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
    </View>
  );
};

export default TelaFotografo;
