import * as React from 'react';
import * as styles from './TabPanel.module.scss';

interface TabPanelProps {
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    className={styles.tabPanel}
  >
    {value === index ? children : null}
  </div>
);

export default TabPanel;
