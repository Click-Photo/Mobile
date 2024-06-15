import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#141414',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    width: 203,
    height: 54,
    outline: 'none'
    
  },
  button: {
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    width: '100%',
    height: 44
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 10, 
    marginBottom: 20,
    float: 'left',
    width: '80%'
  },
  link: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 13,
    textDecorationLine: 'underline',
    textAlign: 'left'
  },
  image: {
    position: 'absolute',
    top: 0,
    height: 400,
    width: 400,
    left: -80,
     
  },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#DCDCDC', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  modalTitleToken: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  modalSubtitle: {
    fontSize: 13,
    marginBottom: 10,
    color: "#878787",
    textAlign: "center"
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#cfcfcf',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#0B0B0B', 
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
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

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  inputToken: {
    height: 40, 
    width: 30, 
    borderColor: '#000', 
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10, 
    color: '#000', 
  },
});

export default styles;
