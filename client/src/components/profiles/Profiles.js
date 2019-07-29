import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getprofiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getprofiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getprofiles();
  }, [getprofiles]);

  return (
    <Fragment>
      {profiles === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' />
            Browse And Connect With Developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No Profiles Found ....</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getprofiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getprofiles }
)(Profiles);
