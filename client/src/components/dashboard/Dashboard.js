import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getcurrentprofile, deleteaccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getcurrentprofile,
  deleteaccount,
  auth: { user },
  profile: { profile, loading }
  //   profile: { profile }
}) => {
  useEffect(() => {
    //alert('Dashboard');
    getcurrentprofile();
  }, [getcurrentprofile]);
  return loading && profile === null ? (
    //   return profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={e => deleteaccount()}>
              <i className='fas fa-user-minus' />
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup aprofile, please add some info</p>
          <Link to='/create-profile' className='btn btn=primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getcurrentprofile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteaccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getcurrentprofile, deleteaccount }
)(Dashboard);
