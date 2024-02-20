import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LeaveRocket, addReservedRocket } from '../redux/rockets/rocketsSlice';

const RocketItem = ({ rocket }) => {
  const dispatch = useDispatch();
  const handleClickAddReserve = () => {
    dispatch(addReservedRocket(rocket.id));
  };

  const handleClickCancelReserve = () => {
    dispatch(LeaveRocket(rocket.id));
  };

  return (
    <div className="rocket-item">
      <div className="rocket-image">
        <img src={rocket.image} alt={rocket.name} />
      </div>
      <div className="rocket-details">
        <h2 className="title">{rocket.name}</h2>
        <p className="description">
          {rocket.reserved && (
            <span className="badge badge-blue">Reserved</span>
          )}{' '}
          {rocket.description}
        </p>
        <div className="reserve">
          {rocket.reserved ? (
            <button
              type="button"
              className="btn btn-gray"
              onClick={handleClickCancelReserve}
            >
              Cancel Reservation
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-blue"
              onClick={handleClickAddReserve}
            >
              Reserve Rocket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

RocketItem.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    reserved: PropTypes.bool
  }).isRequired
};

export default RocketItem;
