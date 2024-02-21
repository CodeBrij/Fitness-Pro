// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMAgEiZ0q96bNkcAbJRBSoK3qv7XzkS-A",
    authDomain: "syrus-official.firebaseapp.com",
    databaseURL: "https://syrus-official-default-rtdb.firebaseio.com",
    projectId: "syrus-official",
    storageBucket: "syrus-official.appspot.com",
    messagingSenderId: "596270887718",
    appId: "1:596270887718:web:82128939d429ccd98d07e7"
  };
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()



function register(){
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    fullname = document.getElementById('fullname').value
    height = document.getElementById('height').value
    weight = document.getElementById('weight').value

    bmi = weight / (height * height)
    // console.log(bmi)

    if(!validateEmail(email)){
        alert("Invalid email id format")
        return 
    }

    if(!validatePassword(password)){
        alert("Enter a valid password")
    }

    

    auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed up 
    console.log(userCredential.uid)
    // ...
    updateData(email, fullname, height, weight, bmi, userCredential.uid)
  })
  .catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });


}

function validateEmail(email){
    const exp = /^[^@]+@\w+(\.\w+)+\w$/
    if (exp.test(email) == true){
        return true
    } else {
        return false
    }
}

function validatePassword(password){
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (password < 8 || !lowerCaseRegex.test(password) || !upperCaseRegex.test(password) || !digitRegex.test(password) || !symbolRegex.test(password)){
        return false
    } else {
        return true
    }
}


function login(){
    email = document.getElementById('signinEmail').value
    password = document.getElementById('signinPassword').value


    if(!validateEmail(email)){
        alert("Invalid email id format")
        return 
    }

    if(!validatePassword(password)){
        alert("Enter a valid password")
    }

    

    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    console.log("Success", userCredential.uid)
    localStorage.setItem('userCredential', JSON.stringify(userCredential.uid));
    window.location.assign("dashboard.html")
    // ...
  })
  .catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });
}

function updateData(email, fullname, height, weight, bmi, userID){
    firebase.database().ref("user/"+ userID).set({
        email : email,
        fullname : fullname,
        height : height,
        weight : weight,
        bmi : bmi,
        rewards : 100
    })
    .then(()=>{
        alert("Data added successfully");
    })
    .catch((error)=>{
        alert(error.message);
    });

}





