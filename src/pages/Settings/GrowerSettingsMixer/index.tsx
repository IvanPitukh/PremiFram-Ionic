import { IonButton, IonContent, IonIcon, IonPage, IonRippleEffect, IonSkeletonText, useIonRouter, useIonToast } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ApiService, { IGetTargetResponse } from '../../../api/ApiService'
import CustomNavbar from '../../../components/CustomNavbar'
import { UIStore } from '../../../pullstate'
import { modalIds } from '../../../types'
import { GrowerSettingsPhLevel } from './GrowerSettingsPhLevel'
import { GrowerSettingsTDSLevel } from './GrowerSettingsTDSLevel'

const GrowerSettingsMixerPage: React.FC = () => {
  const { t } = useTranslation()
  const { isDeveloper, growerSettingsMixerPh, growerSettingsMixerTDS } = UIStore.useState((state) => state)
  const [presentToast] = useIonToast()
  const navigation = useIonRouter()
  const [refetchDeviceRequest, refetchDeviceRequestSet] = useState(0)
  const [target, targetSet] = useState<IGetTargetResponse | null>(null)
  const { refetch, isRefetching } = useQuery(['dosingTarget'], () => ApiService.getDosingTargets(), {
    onSuccess: ({ data }) => {
      targetSet(data)
    },
  })

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await ApiService.setDosingTargets({
        ph: Number(growerSettingsMixerPh) * 10,
        tds: Number(growerSettingsMixerTDS),
      })
      if (isDeveloper) {
        alert(JSON.stringify(response, undefined, 2))
      }
      UIStore.update((state) => {
        state.pullstateUpd = Date.now()
      })
      await presentToast({
        message: t('mixerSettingsPage.toastSuccessServer'),
        duration: 2000,
        cssClass: 'custom-toast',
      })
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2))
      }
      await presentToast({
        message: t('mixerSettingsPage.toastErrorServer'),
        duration: 2000,
        cssClass: 'custom-toast custom-toast_danger',
      })
    } finally {
      refetchDeviceRequestSet(Date.now())
    }
  }

  useEffect(() => {
    refetch()
  }, [refetchDeviceRequest])

  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app/settings" size="small" title="Mixer settings" />
        <div className="content-container offset-content settings">
          <div className="settings__list-with-details">
            <form onSubmit={onSubmit} className="settings__list">
              <button id={`${modalIds.growerSettingsMixerPhModal}`} type="button" className="ion-activatable ripple-parent settings__list-item">
                <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-ph2-black.svg`} />
                <p className="settings__list-item-title">
                  <Trans i18nKey="mixerSettingsPage.phLevel">{t('mixerSettingsPage.phLevel')}</Trans>
                </p>
                <p style={{ textAlign: 'center', flex: '1 1 auto' }} className="settings__list-input settings__list-input_small">
                  {growerSettingsMixerPh}
                </p>
                <IonRippleEffect />
              </button>
              <button id={`${modalIds.growerSettingsMixerTDSModal}`} type="button" className="ion-activatable ripple-parent settings__list-item">
                <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-tds2-black.svg`} />
                <p className="settings__list-item-title">
                  <Trans i18nKey="mixerSettingsPage.tdsLevel">{t('mixerSettingsPage.tdsLevel')}</Trans>
                </p>
                <p style={{ textAlign: 'center', flex: '1 1 auto' }} className="settings__list-input settings__list-input_small">
                  {growerSettingsMixerTDS}
                </p>
                <IonRippleEffect />
              </button>
              <IonButton type="submit">{t('mixerSettingsPage.submitButton')}</IonButton>
              <IonButton color="secondary" onClick={() => navigation.push('/app/settings/grower', 'back', 'push')}>
                {t('mixerSettingsPage.backButton')}
              </IonButton>
              <button disabled className="settings__list-item settings__list-item_dosing">
                {!target || isRefetching ? (
                  <IonSkeletonText animated={true} style={{ width: 100, height: 30 }}></IonSkeletonText>
                ) : (
                  <>
                    <span>
                      {t('mixerSettingsPage.phLevel')}: {`${(target.ph) / 10}`}
                    </span>
                  </>
                )}
              </button>
              <button disabled className="settings__list-item settings__list-item_dosing">
                {!target || isRefetching ? (
                  <IonSkeletonText animated={true} style={{ width: 100, height: 30 }}></IonSkeletonText>
                ) : (
                  <>
                    <span>
                      {t('mixerSettingsPage.tdsLevel')}: {`${target.tds}`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </IonContent>
      <GrowerSettingsPhLevel modalId={`${modalIds.growerSettingsMixerPhModal}`} />
      <GrowerSettingsTDSLevel modalId={`${modalIds.growerSettingsMixerTDSModal}`} />
    </IonPage>
  )
}

export { GrowerSettingsMixerPage }
