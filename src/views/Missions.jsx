import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMissions } from '../redux/missions/missionsSlice';
import Layout from './Layout';
import MissionsTable from '../components/MissionsTable';
import '../assets/styles/Missions.css';

const Missions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMissions());
  }, []);

  return (
    <Layout>
      <section id="missions">
        <div className="container">
          <MissionsTable />
        </div>
      </section>
    </Layout>
  );
};

export default Missions;