import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/auth'
import { useApi, useApiCall, Assets, DailyForecasts } from '@/api'
import { saveFile, buildFilename } from './utils'
import Loader, { LoaderColor } from '../Loader'
import './styles.css'

type Forecasts = DailyForecasts.Forecast[]
type PersonalAssets = Assets.Asset[]
interface WallpaperData {
  assets: PersonalAssets
  forecasts: Forecasts
}

function WallpaperPage(): JSX.Element {
  const api = useApi()
  const { t } = useTranslation()
  const { user, token } = useAuth()
  const category = user?.profile.sign?.sign || ''
  const loadData = useCallback(() => {
    return Promise.all([
      api.getAssets({ category }),
      api.getDailyForecasts({ token }),
    ])
    .then(([{ assets }, { user_daily_forecast }]) => ({
      assets,
      forecasts: user_daily_forecast.forecasts,
    }))
  }, [api, category, token])
  const { data, isPending } = useApiCall<WallpaperData>(loadData)
  const forecasts = data ? data.forecasts : []
  const asset = data ? data.assets.at(0) : null

  const handleClick = () => asset && saveFile(asset.url, buildFilename(category))

  return (
    <section className='wallpaper-page'>
      <div className='wallpaper-image'>
        {asset ? <img src={asset.url} alt={category} /> : null}
        {asset ? <div className='btn-download' onClick={handleClick} /> : null}
        {isPending ? <Loader color={LoaderColor.White}/> : null}
      </div>
      <div className='wallpaper-content'>
        {isPending ? null : (
          <>
            <h1 className='wallpaper-title'>{t('analysis_background')}</h1>
            {forecasts.map((forecast) => (
              <div key={forecast.category_name} className='wallpaper-forecast'>
                <h2 className='wallpaper-subtitle'>{forecast.category}</h2>
                <p className='wallpaper-text'>{forecast.body}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default WallpaperPage
