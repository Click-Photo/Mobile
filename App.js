import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroScreen from './components/Cadastro/Cadastro';
import LoginScreen from './components/Login/Login';

//Paginas cliente
import TelaFeedArte from './components/Cliente/FeedArte/TelaFeedArte';
import TelaFotografo from './components/Cliente/FotogafoPage/TelaFotografo';
import TelaCliente from './components/Cliente/ClientePage/TelaCliente';
import JobsCliente from './components/Cliente/Jobs/Jobs';
import ProposalClient from './components/Cliente/Propostas/Propostas';
import AvaliacaoCliente from './components/Cliente/AvaliacaoForografo/AvaliacaoFotografo';
import TelaCreateJob from './components/Cliente/CreateJobs/TelaCreateJob';

//Paginas fotografo
import FeedJobs from './components/Fotografo/FeedJobs/FeedJobs';
import FotografoPages from './components/Fotografo/FotografoPage/FotografoPage';
import JobsFotografo from './components/Fotografo/Jobs/JobsFotografo';
import JobsInteresse from './components/Fotografo/JobsInteresse/JobsInteresse';
import ClientePageFotografo from './components/Fotografo/ClientePage/ClientePage';
import AvaliacaoFotografo from './components/Fotografo/AvaliacaoCliente/AvaliacaoCliente';

import { UserProvider } from './components/UserContext';


const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerMode: 'none' }}>
            
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Cadastro" component={CadastroScreen} />

              <Stack.Screen name="TelaAvaliacaoCliente" component={AvaliacaoFotografo} />
              <Stack.Screen name="TelaFotografoPage" component={FotografoPages} />
              <Stack.Screen name="TelaAvaliacaoFotografo" component={AvaliacaoCliente} />
              <Stack.Screen name="TelaCliente" component={TelaCliente} />

              <Stack.Screen name="TelaFeedJobs" component={FeedJobs} />
              <Stack.Screen name="TelaClienteFotografo" component={ClientePageFotografo} />
              <Stack.Screen name="TelaCreateJob" component={TelaCreateJob}/>
              
              <Stack.Screen name="TelaJobsInteresse" component={JobsInteresse} />
              <Stack.Screen name="TelaJobsFotografo" component={JobsFotografo} />

              <Stack.Screen name="TelaPropostaCliente" component={ProposalClient} />
              <Stack.Screen name="TelaFeedArte" component={TelaFeedArte} />
              <Stack.Screen name="TelaFotografo" component={TelaFotografo} />
              <Stack.Screen name="TelaJobsCliente" component={JobsCliente} />
            </Stack.Navigator>
        </NavigationContainer>
    </UserProvider>
    
  );
}

export default App;
