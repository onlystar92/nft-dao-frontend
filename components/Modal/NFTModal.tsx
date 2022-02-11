import Button from 'components/Button/Button'
import Modal from './Modal'
import styles from './Modal.module.css'

interface INftModal {
  nfts: any
  onConfirm: Function
  onClose: Function
  closeOnEscape?: boolean
}

export default function NFTModal({
  nfts,
  onConfirm,
  onClose,
  closeOnEscape,
}: INftModal) {
  const handleSubmit = () => {
    onConfirm([])
  }

  return (
    <Modal className={styles.nftModalWrap} show={!!nfts} onRequestClose={onClose} closeOnEscape={closeOnEscape}>
      <div className={`flex-center ${styles.nftName}`}>
        Select Meme’s NFT
      </div>
      <div className={styles.nftListWrap}>
        {(nfts || []).map((nft) => (
          <div className={styles.nftItem}>
            <img src={nft} alt="nft" />
          </div>
        ))}
      </div>
      <div className={`${styles.nftConfirmBtnWrap} flex-center justify-between`}>
        <div className={styles.totalSelectedNft}>Select all 24</div>
        <Button onClick={handleSubmit}>Confirm</Button>
      </div>
    </Modal>
  )
}
