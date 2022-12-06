import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Signin page</h1>
      <button onClick={logGoogleUser}>sigin with google popup</button>
    </div>
  );
};

export default SignIn;
