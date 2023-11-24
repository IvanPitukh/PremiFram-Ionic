import { IonButton, IonRippleEffect, IonSkeletonText, useIonRouter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IDeviceClockResponse, modalIds } from '../../types'
import { useQuery } from '@tanstack/react-query'
import ApiService from '../../api/ApiService'

const UpdateTime: React.FC = () => {
  const { t, i18n } = useTranslation()
  const navigation = useIonRouter()
  const [deviceClock, deviceClockSet] = useState<IDeviceClockResponse | null>(null)
  const { isRefetching } = useQuery(['deviceClock'], () => ApiService.getDeviceClock(), {
    onSuccess: ({ data }) => {
      deviceClockSet(data)
    },
  })

  const currentTime = () => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${hour}:${minute}:${second}`
  }

  const currentDate = () => {
    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const parseData = new Date(year, month, day)
    const longMonth = parseData.toLocaleString(i18n.language, { month: 'long' })
    return `${day} ${longMonth} ${year}`
  }

  return (
    <div className="content-container offset-content settings">
      <div className="settings__list-with-details">
        <div className="settings__list">
          <button disabled className="ion-activatable ripple-parent settings__list-item">
            <p className="settings__list-item-title">{t('timePage.submitButton')}</p>
            <span className="settings__list-item-current-time">{currentDate()}</span>
            <IonRippleEffect />
          </button>
          <button disabled className="ion-activatable ripple-parent settings__list-item">
            <p className="settings__list-item-title">{t('timePage.timeLabel')}</p>
            <span className="settings__list-item-current-time">{currentTime()}</span>
            <IonRippleEffect />
          </button>
          <IonButton id={modalIds.setTimeModal}>{t('timePage.submitButton')}</IonButton>
          <IonButton color="secondary" onClick={() => navigation.push('/app/settings', 'back', 'push')}>
            {t('timePage.backButton')}
          </IonButton>
          <button disabled className="settings__list-item settings__list-item_time">
            {!deviceClock ? (
              <IonSkeletonText animated={true} style={{ width: 150, height: 30 }}></IonSkeletonText>
            ) : (
              <>
                <span>{`${deviceClock?.day}.${deviceClock?.month}.${deviceClock?.year}`}</span>
                <span style={{ display: 'inline-block', marginLeft: 10 }}>{`${deviceClock?.hour}:${deviceClock?.minute}:${deviceClock?.second}`}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export { UpdateTime }
