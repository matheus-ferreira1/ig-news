import styles from './styles.module.scss'

interface SubscreibeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscreibeButtonProps) {
    return (
        <button 
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}