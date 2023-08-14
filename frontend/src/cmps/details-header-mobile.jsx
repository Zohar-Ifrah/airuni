import { useNavigate } from 'react-router-dom'
import { ShareSave } from './share-save'

export function DetailsHeaderMobile({ stay, loadStay }) {
    const navigate = useNavigate()

    return (
        <section className="details-header-mobile flex align-center space-between">
            <button className="btn-back" onClick={() => navigate('/')}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                        display: 'block',
                        fill: 'none',
                        height: '16px',
                        width: '16px',
                        stroke: 'currentcolor',
                        strokeWidth: 4,
                        overflow: 'visible',
                    }}
                >
                    <path
                        fill="none"
                        d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"
                    ></path>
                </svg>
            </button>
            <ShareSave stay={stay} loadStay={loadStay} />
        </section>
    )
}
