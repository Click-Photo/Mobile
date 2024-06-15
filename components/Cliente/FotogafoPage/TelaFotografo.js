import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, SafeAreaView, ScrollView, Linking  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './TelaFotografoStyles';
import { screenWidth } from './TelaFotografoStyles';
import { Ionicons } from '@expo/vector-icons';

const TelaFotografo = ({ navigation, route }) => {
  const { artistId, perfilPhoto } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeTab, setActiveTab] = useState('Fotos');

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
                        <Text style={styles.contactLabel}>WHATS: (11) 00000-0000</Text>
                        <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
                            <Text style={styles.contactButtonText}>MANDAR MENSAGEM</Text>
                        </TouchableOpacity>
                        <Text style={styles.contactLabel}>E-MAIL: foto@gmail.com</Text>
                        <TouchableOpacity style={styles.contactButton} onPress={sendEmail}>
                            <Text style={styles.contactButtonText}>MANDAR E-MAIL</Text>
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
            <Image source={perfilPhoto} style={styles.profilePic} />
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
