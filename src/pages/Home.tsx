import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PokemonList from '../components/PokemonList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PokeApi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">PokeApi</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PokemonList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
