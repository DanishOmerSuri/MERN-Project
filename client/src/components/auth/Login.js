import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '50%',
    margin: 'auto'
  }
}));

const Login = ({ login, isAuthenticated }) => {
  const inputProps = {
    autoFocus: true
  };
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect If Looged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='text-center'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Sign Into Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <TextField
              inputProps={inputProps}
              id='standard-dense'
              label='Email'
              className={clsx(classes.textField)}
              margin='dense'
              type='email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
            {/* <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          /> */}
          </div>
          <div className='form-group'>
            <TextField
              id='standard-dense'
              label='Password'
              className={clsx(classes.textField)}
              margin='dense'
              type='password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
            {/* <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          /> */}
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
