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
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    borderColor: "#000",
    borderWidth: 3
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
  modalInfoTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  modalText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  },
  modalContentText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10
  },
  modalEdit:{
    backgroundColor: "#fff", 
    width: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center"
  },
  modalEditButton: {
    backgroundColor: 'black',
    padding: 15,
    width: '90%',
    alignItems: 'center',
    borderRadius: 20
  },
  modalEditText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 30
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
    modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 18
  },
  wrapperInput: {
    paddingHorizontal: 35,
    width: "100%"
  }
});

export default styles;
