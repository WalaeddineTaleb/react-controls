import * as React from 'react';
import UpNavTab from './UpNavTab';
import UpPanel from '../../Containers/Panel';
import { getRootContainer } from '../../../Common/stories';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components/Containers/UpNavTab',
  decorators: [withKnobs, getRootContainer('UpNavTab')],
  component: UpNavTab,
};

export const GeneralUse = () => (
  <UpNavTab
    tabs={[
      {
        content: <UpPanel type="info" disableAutoIntentIcon={false} message="Information sur ..." />,
        head: 'Tab 1',
      },
      {
        content: <UpPanel type="warning" disableAutoIntentIcon={false} message="Attention sur ..." />,
        head: 'Tab 2',
      },
      {
        content: <UpPanel type="danger" disableAutoIntentIcon={false} message="Erreur sur ..." />,
        head: 'Tab 3',
      },
    ]}
  />
);

export const SelectedTabOnLoad = () => (
  <UpNavTab
    tabs={[
      {
        content: <UpPanel type="info" disableAutoIntentIcon={false} message="Information sur ..." />,
        head: 'Tab 1',
      },
      {
        content: <UpPanel type="warning" disableAutoIntentIcon={false} message="Attention sur ..." />,
        head: 'Tab 2',
      },
      {
        content: <UpPanel type="danger" disableAutoIntentIcon={false} message="Erreur sur ..." />,
        head: 'Tab 3',
      },
    ]}
    selectedTabOnLoad={2}
  />
);

export const OnShowLoadType = () => (
  <UpNavTab
    tabs={[
      {
        content: <UpPanel type="info" disableAutoIntentIcon={false} message="Information sur ..." />,
        head: 'Tab 1',
      },
      {
        content: <UpPanel type="warning" disableAutoIntentIcon={false} message="Attention sur ..." />,
        head: 'Tab 2',
      },
      {
        content: <UpPanel type="danger" disableAutoIntentIcon={false} message="Erreur sur ..." />,
        head: 'Tab 3',
      },
    ]}
    loadType={'onShow'}
  />
);

export const CallBackUpNavTab = () => (
  <UpNavTab
    tabs={[
      {
        content: <UpPanel type="info" disableAutoIntentIcon={false} message="Information sur ..." />,
        head: 'Tab 1',
      },
      {
        content: <UpPanel type="warning" disableAutoIntentIcon={false} message="Attention sur ..." />,
        head: 'Tab 2',
      },
      {
        content: <UpPanel type="danger" disableAutoIntentIcon={false} message="Erreur sur ..." />,
        head: 'Tab 3',
      },
    ]}
    onSelectedTabChanged={(selectTabKey, tab) => console.log(`You are in tab ${selectTabKey}`)}
  />
);

CallBackUpNavTab.storyName = 'Callback To Execute On Tab Changing';

export const WithLingTitle = () => (
  <UpNavTab
    tabs={[
      {
        content: <UpPanel type="info" disableAutoIntentIcon={false} message="Information sur ..." />,
        head: 'Contrôle et ajustement des titres en anomalies par remises ',
      },
      {
        content: <UpPanel type="warning" disableAutoIntentIcon={false} message="Attention sur ..." />,
        head: "Contrôle et ajustement des titres en anomalies par type d'anomalie",
      },
      {
        content: <UpPanel type="danger" disableAutoIntentIcon={false} message="Erreur sur ..." />,
        head: 'Contrôle et ajustement des remises',
      },
    ]}
    onSelectedTabChanged={(selectTabKey, tab) => console.log(`You are in tab ${selectTabKey}`)}
  />
);
