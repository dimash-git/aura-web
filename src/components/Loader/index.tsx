import './styles.css'

export enum LoaderColor {
  White = 'white',
  Black = 'black',
}

type LoaderProps = {
  color?: LoaderColor
}

function Loader({ color = LoaderColor.Black }: LoaderProps): JSX.Element {
  const colorClass = color === LoaderColor.White ? 'loader__white' : 'loader__black'
  return (
    <div className='loader-container'>
      <div className={`loader ${colorClass}`}><span></span></div>
    </div>
  )
}

export default Loader
