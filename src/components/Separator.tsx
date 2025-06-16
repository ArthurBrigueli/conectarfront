interface Props {
  height?: number;
  color?: string;
}

const Separator: React.FC<Props> = ({ height = 16, color = 'black' }) => {
  return (
    <div style={{ height, backgroundColor: color, width: '100%' }} />
  );
};

export default Separator;
