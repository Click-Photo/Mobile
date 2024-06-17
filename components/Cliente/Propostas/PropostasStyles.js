import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    display: "flex",
  },
  backIcon: {
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
    width: "84%",
    alignSelf: "center"
  },
  dateTitle:{
    fontSize: 12,
  },
  containerDate:{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 5, 
    paddingHorizontal: 25,
  },
  date: {
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
    fontWeight:"bold"
  },
  amount: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 5,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'space-between',
    justifyContent: "center",
    marginBottom: 10,
  },

  profileContainerWrapper:{
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    gap: 20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10
  },
  photographerName: {
    fontSize: 23,
    color: '#000',
    fontWeight: "bold"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  ratingText: {
    color: '#000',
    fontSize: 16,
  },
  profileButton: {
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 15
  },
  profileButtonText: {
    color: '#000',
    fontSize: 16,
    textDecorationLine: "underline"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  rejectButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    
    marginRight: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: 139
  },
  acceptButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 15,
    width: 139,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: "bold"
  },
    statsItemSecond: {
    display: 'flex',
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 50,
    padding: 10,
    marginLeft: -20
  },
  finalizeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default styles;
