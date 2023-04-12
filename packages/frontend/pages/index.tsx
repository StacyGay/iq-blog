import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
import styles from './index.module.scss';

export function Index() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.scss file.
     */
    return (
        <Layout>
            <div className={styles.page}>
                <Intro></Intro>
            </div>
        </Layout>
    );
}

export default Index;
