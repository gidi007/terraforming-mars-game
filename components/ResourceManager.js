// components/ResourceManager.js
import { useDispatch } from 'react-redux';
import { updateOxygen, increaseTemperature, addOcean } from '../redux/slices/gameSlice';

export default function ResourceManager({ playerId }) {
  const dispatch = useDispatch();

  const handleOxygen = () => dispatch(updateOxygen(5));
  const handleTemperature = () => dispatch(increaseTemperature(2));
  const handleOcean = () => dispatch(addOcean());

  return (
    <div className="resource-manager">
      <button onClick={handleOxygen}>Increase Oxygen</button>
      <button onClick={handleTemperature}>Increase Temperature</button>
      <button onClick={handleOcean}>Add Ocean</button>
    </div>
  );
}
