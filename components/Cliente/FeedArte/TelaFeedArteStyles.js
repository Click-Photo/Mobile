import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B0B0B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30
    
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 15,
    marginLeft: 10,
    color: "#fff",
  },
  sliderContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
    height: 120
  },
  sliderItem: {
    marginRight: 10,
    width: 80,
    alignItems: 'center',
    color: "#fff",
  },
  sliderItemImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  sliderItemName: {
    marginTop: 5,
    textAlign: 'center',
    color: "#fff",
    fontSize: 10
  },
  feedContainer: {
    padding: 20,
  },
  feedItem: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  feedItemImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedItemArtist: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color: "#fff",
  },
  artistImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  artistName: {
    fontSize: 14,
  },
  feedItemButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    width: 90
  },
  feedItemButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
   modalSeePerfilButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  modalSeePerfilButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#C1C1C1',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 44,
    height: 44,
    position: 'absolute',
    top: -40,
    right: -20,
    zIndex: 99,

  },
  modalCloseButtonText: {
    color: '#00',
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalArtist: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default styles;
