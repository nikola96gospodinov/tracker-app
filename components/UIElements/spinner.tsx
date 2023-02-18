import styled from 'styled-components'

import styles from './spinner.module.scss'

const Spinner: React.FunctionComponent<{
    size?: number
    isText?: boolean
}> = ({ size = 10, isText = true }) => {
    const sizeInRem = `${String(size)}rem`

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '1.25rem'
            }}
        >
            <div
                className={styles.ldsRipple}
                style={{
                    height: sizeInRem,
                    width: sizeInRem
                }}
            >
                <RippleDiv size={size} />
                <RippleDiv size={size} />
            </div>
            {isText && <h2>Loading...</h2>}
        </div>
    )
}

export default Spinner

const RippleDiv = styled.div<{ size: number }>`
    position: absolute;
    border: ${(props) =>
            props.size > 5 ? props.size * 0.025 : props.size * 0.075}rem
        solid #653cad;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    @keyframes lds-ripple {
        0% {
            top: ${(props) => props.size * 0.45}rem;
            left: ${(props) => props.size * 0.45}rem;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: ${(props) => props.size * 0.9}rem;
            height: ${(props) => props.size * 0.9}rem;
            opacity: 0;
        }
    }
`
