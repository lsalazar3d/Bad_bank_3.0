
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC18YKJUiuBp4rOXX1vpv_GYWKEQYInAuE",
  authDomain: "badbankdatastore.firebaseapp.com",
  projectId: "badbankdatastore",
  storageBucket: "badbankdatastore.appspot.com",
  messagingSenderId: "97427754989",
  appId: "1:97427754989:web:eeaef25cbea40d16a921e4"
};


const app = initializeApp(firebaseConfig);



function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setShow={setShow} setStatus={setStatus} /> :
        <CreateMsg setShow={setShow} />}
    />
  );
}


function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  //const { setStatus } = useContext(UserContext);

  async function handle() {
    try {

            // Function to sign in with Google
            function signInWithGoogle() {
              // Create a Google Auth provider
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
              // Sign in with Google using a popup
              firebase.auth().signInWithPopup(googleAuthProvider)
                  .then((result) => {
                      // This gives you a Google Access Token
                      const credential = result.credential;
                      // This gives you the signed-in user info
                      const user = result.user;
                      console.log("Google Sign-In Successful", user);
                  })
                  .catch((error) => {
                      // Handle Errors here
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.error("Google Sign-In Error", errorCode, errorMessage);
                  });
          }
          
      // Create user in Firebase Authentication
      const userCredential = await firebase
       .auth()
       .createUserWithEmailAndPassword(email, password);

        const userData = {
          name: name,
          email: email,
          password: password,
          balance: 0,
        };
      // Get a reference to the "users" collection in Firestore

      const db = getFirestore(app);
      const usersCollection = collection(db, 'users');

    await addDoc(usersCollection, userData);

           // Add user data to Firestore
      await usersCollection.add(userData);

      props.setStatus('');
      props.setShow(false);
      console.log('User created successfully');
    } catch (error) {
      props.setStatus(error.message);
      console.error('Error creating user:', error.message);
    }
  }

  return (
    <>
      Name<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />

      Email address<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}