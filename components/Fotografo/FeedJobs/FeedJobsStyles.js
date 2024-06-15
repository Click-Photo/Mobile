import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    marginLeft: 50,
    marginTop: 30

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
  contentContainer:{
    flex: 1,
    alignItems: 'center',
  },
  feedContainer: {
    padding: 20,
  },
  feedItem: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "#DCDCDC",
    borderRadius: 10,
    width: 321,
    height: 302,
    position: 'relative'
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
    display: 'flex',
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 120
  },
  feedItemButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  containerBtnSee:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', 
    position: 'absolute',
    bottom: -95,
    padding: 15
  },
  priceJob:{
    color: '#000',
    fontWeight: 'bold', 
    fontSize: 26
  },

  descJob:{
    marginTop: 10,
    padding: 15
  }, 
  descJobText: {
    color: '#0B0B0B'
  },

  headerJob: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E1E1E1',
    height: 70,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 15
  },
  dateJob: {
    fontWeight: 'bold'
  },
  titleJob:{
    fontSize: 20, 
    fontWeight: 'bold'
  },
  iconContainer:{
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
   selectDropdownButton: {
      backgroundColor: '#141414',
      color: '#868686',
      fontSize: 14,
      height: 37,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    selectDropdownButtonText: {
      color: '#868686',
      fontSize: 14,
    },
    selectDropdownDropdown: {
      backgroundColor: '#141414',
    },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    width: '80%',
    height: '75%',
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 5,
    borderColor: '#000',
    position: 'relative'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 12
  },
  modalDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 20
  },
  modalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#C1C1C1',
    borderRadius: 50,
    padding: 10,
    height: 50,
    width: 50,
    elevation: 2,
    borderWidth: 3,
    borderColor: '#000',
    position: 'absolute',
    top: -20,
    right: -20
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeaderContaianer:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12
  },
  modalDateTitle:{
    fontSize: 12
  },
  localContainer: {
    width: "100%",
    marginTop: 20
  },  
  localTitle:{
    fontSize: 12
  },
  localText:{
    fontSize: 15,
    fontWeight: "bold"
  },
  precoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    height: 132,
    width: "100vw",
    zIndex: 99,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  precoTitleWrapper:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  propostasBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 174,
    height: 43,
    borderRadius: 20,
  },
  propostasBtnText:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  likeText: {
    fontSize: 12,
    fontWeight: "bold"
  },
  likeButton: {
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  localtionJob: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10, 
    marginLeft: 10
  },
  localtionText:{
    fontSize: 15,
    fontWeight: "bold"
  },
  localtionProposal:{
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 10
  },
  perfilJobModal:{
    display: "flex",
    gap: 8,
    marginTop: 10, 
    width: "100%"
  },
  perfilnText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  profileButtonText: {
    fontWeight: "bold",
    marginTop: 10
  }
});

export default styles;
