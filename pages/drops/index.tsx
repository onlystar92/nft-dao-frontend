import styles from 'styles/Drops.module.css'
import Modal from '../../components/Mailchimp/ui/Modal/Modal';
import MailchimpForm from "../../components/Mailchimp/MailchimpForm/MailchimpForm";

export default function Drops(props) {
  return (
    <>
      <section className={styles.header}>
        <div className={`limited`}>
          <div className={`bold ${styles.dropsTitle}`}>Drops</div>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex flex-column`}>
          <div className="full">
            {process.env.ENABLE_DROPS === 'false' ? 'Coming soon' : ''}
          </div>
        </div>
      </section>
      <Modal><MailchimpForm /></Modal>
    </>
  )
}
