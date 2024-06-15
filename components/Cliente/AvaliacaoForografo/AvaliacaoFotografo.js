import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./AvaliacaoFotografoStyles";

const data = [
  {
    id: '1',
    date: '18 DEZ. 2024',
    amount: '2.460',
    photographerName: 'Nome Do Fotografo',
    rating: 4.5,
    profileImage: require('../../../assets/photo1.png')
  },
  {
    id: '2',
    date: '18 DEZ. 2024',
    amount: '2.460',
    photographerName: 'Nome Do Fotografo',
    rating: 4.5,
    profileImage: require('../../../assets/photo1.png')
  }
];

const ProposalCard = ({ item }) => {
  const [rating, setRating] = useState(item.rating); // Estado para controlar a avaliação de cada item
  
  const handleRating = (newRating) => {
    setRating(newRating);
    // Aqui você pode enviar a nova avaliação para o backend ou realizar outras ações necessárias
  };

  const renderStarIcons = () => {
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
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.amount}>R$ {item.amount}</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileContainerWrapper}>
          <Image source={item.profileImage} style={styles.profileImage} />
          <View style={styles.wrapperTitlePhoto}>
            <Text style={styles.photographerName}>{item.photographerName}</Text>
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
      >
        <Text style={styles.modalSeePerfilButtonText}>ENVIAR AVALIACAO</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProposalsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>AVALIAÇÕES</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProposalCard item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ProposalsScreen;
