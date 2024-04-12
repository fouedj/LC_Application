import React from 'react';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import Text from '../Text';
interface ListIformationsModalProps {
  text: string;
}

const ListItem: React.FC<ListIformationsModalProps> = ({text}) => {
  return (
    <Box style={mainStyles.listItem}>
      <Text style={mainStyles.bullet}>•</Text>
      <Text style={mainStyles.itemText} className="text-left">
        {text}
      </Text>
    </Box>
  );
};
const ListIformationsModal: React.FC = () => {
  return (
    <Box className="flex flex-col justify-center items-center ">
      <ListItem text="Ne communiquez pas vos données personnelles (adresse mail, téléphone) dans vos messages." />
      <ListItem text="Privilégiez les échanges par mail sur la plateforme La Centrale qui vous permet de ne pas dévoiler votre adresse mail personnelle, surtout en cas de doute." />
      <ListItem text="N’envoyez pas de copie de votre carte d’identité, de votre carte grise ou de vos coordonnées bancaires à un inconnu." />
    </Box>
  );
};
export default ListIformationsModal;
