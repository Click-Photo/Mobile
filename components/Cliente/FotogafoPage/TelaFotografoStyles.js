import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    color: 'white'
  },
  header: {
    margin: 40
  },
  contentContainer:{
    flex: 1,
    alignItems: 'center',
  },
  infoClient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '50%'
  },
  statsText: {
    color: "white"
  },
  statsItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsItemSecond: {
    display: 'flex',
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsTextSecond: {
    color: '#F8B84E',
    fontSize: 13
  },
  statsTextTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: 'white'
  },
  titleBtn: {
    color: '#555555',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnText:{
    color: '#DB4949',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20
  },
  btnIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginLeft: 20
  },
  btnContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 297,
    height: 64,
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  containerPhotos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 50,
  },
  imagePortfolio:{
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20, 
    marginBottom: 12
  },
  contactButtonModal: {
    width: 286,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  profilePic: {
    width: 99,
    height: 104
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
},
contactInfo: {
    width: '100%',
    alignItems: 'center'
},
contactLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10
},
contactButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
     width: 274,
    borderRadius: 20,
    marginBottom: 20
},
contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
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

  tabSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: "50%",
    marginBottom: 20,
    marginTop: 20
  },
  activeTab: {
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: "underline"
  },
  inactiveTab: {
    color: 'grey'
  },
  aboutContainer: {
    padding: 20
  },
  aboutText: {
    fontSize: 16
  },
  sobreContainer: {
      padding: 20, 
      paddingHorizontal: 40
  },
  sobreHeader: {
      color: '#fff', 
      fontWeight: 'bold',
      fontSize: 16, 
      marginTop: 20, 
  },
  sobreContent: {
      color: '#666',
      fontSize: 14,
      marginBottom: 10, 
  },
});

export default styles;
