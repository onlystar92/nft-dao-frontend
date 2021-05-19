import styles from 'styles/Swap.module.css'

export default function Swaps(props) {
  return (
    <>
      <section className={styles.header}>
        <div className={`limited`}>
          <div className={`bold ${styles.swapTitle}`}>Swap</div>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex flex-column`}>
          <div className="full">
            {process.env.ENABLE_SWAP === 'false' ? 'Coming soon' : ''}
          </div>
        </div>
      </section>
    </>
  )
}
