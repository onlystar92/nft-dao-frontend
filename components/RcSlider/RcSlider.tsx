import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './RcSlider.module.css'

export default function RcSlider({ className = '', value = 0, onChange }) {
  return (
    <div className={[styles.sliderContent, className].join(' ')}>
      <input value={`${value}%`} readOnly />
      <Slider
        className={styles.rcSlider}
        defaultValue={value}
        min={0}
        max={100}
        value={value}
        onChange={(v) => onChange(v)}
      />
    </div>
  )
}
