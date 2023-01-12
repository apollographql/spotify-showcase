import { Laptop2, MonitorSpeaker, Smartphone, LucideProps } from 'lucide-react';

interface Device {
  type: string;
}

interface DeviceIconProps extends LucideProps {
  device: Device | null | undefined;
}

const DefaultIcon = MonitorSpeaker;

const DeviceIcon = ({ device, ...props }: DeviceIconProps) => {
  if (!device) {
    return <DefaultIcon {...props} />;
  }

  switch (device.type) {
    case 'Computer':
      return <Laptop2 {...props} />;
    case 'Smartphone':
      return <Smartphone {...props} />;
    default:
      return <DefaultIcon {...props} />;
  }
};

export default DeviceIcon;
