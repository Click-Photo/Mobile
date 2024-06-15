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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 10, 
    marginBottom: 20,
    float: 'left',
    width: '80%'
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
  link: {
    marginTop: 10,
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
});

export default styles;
