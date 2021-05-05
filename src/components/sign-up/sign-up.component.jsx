import './sign-up.styles.scss'

import react from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth } from '../../firebase/firebase.utils';
import { createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends react.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (<div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with you email and password</span>
            <form action="" className="sign-up-form" onSubmit={this.handleSubmit}>
                <FormInput type="text" name="displayName" value={displayName} onChange={this.handleChange} label="Display Name" required></FormInput>
                <FormInput type="email" name="email" value={email} onChange={this.handleChange} label="Email" required></FormInput>
                <FormInput type="password" name="password" value={password} onChange={this.handleChange} label="Password" required></FormInput>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} label="Confirm Password" required></FormInput>
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        // auth.createUserWithEmailAndPassword()
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert('passwords donot match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const userRef = await createUserProfileDocument({ ...user, displayName })
            console.log('this is the user', user)
        } catch (error) {
            console.log('there was an error saving the user', error)
        }
        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

}

export default SignUp;