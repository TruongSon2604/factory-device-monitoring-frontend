import ComputerIcon from '@mui/icons-material/Computer';
import CallIcon from '@mui/icons-material/Call';
import HubIcon from '@mui/icons-material/Hub';

export const DEVICES = [
  { id: 1, name: 'Main PC', ip: '192.168.1.101', status: 'Online', type: 'Máy tính', icon: ComputerIcon },
  { id: 2, name: 'VoIP Phone A', ip: '192.168.1.205', status: 'Offline', type: 'Caller', icon: CallIcon },
  { id: 3, name: 'Switch Core 1', ip: '192.168.1.1', status: 'Online', type: 'Switch', icon: HubIcon },
  { id: 4, name: 'Laptop Sales', ip: '192.168.1.105', status: 'Online', type: 'Máy tính', icon: ComputerIcon },
  { id: 5, name: 'VoIP Phone B', ip: '192.168.1.206', status: 'Online', type: 'Caller', icon: CallIcon },
  { id: 6, name: 'Server DB', ip: '192.168.1.50', status: 'Offline', type: 'Máy tính', icon: ComputerIcon },
];