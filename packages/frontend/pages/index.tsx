import { Header } from '../components/header';
import { Intro } from '../components/intro';
import styles from './index.module.scss';

export function Index() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.scss file.
     */
    return (
        <div className={styles.page}>
            <Header></Header>
            <Intro></Intro>
        </div>
    );
}

export default Index;
